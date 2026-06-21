import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createRequire } from "module";
import { listFolder, downloadFile, extractFolderId } from "./drive.js";
import { SCHEDULES } from "./knowledge.js";

const require = createRequire(import.meta.url);
const AdmZip = require("adm-zip");

async function extractPdfText(buffer) {
  const doc = await getDocument({ data: new Uint8Array(buffer) }).promise;
  const pages = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => item.str).join(" "));
  }
  return pages.join("\n");
}

/** Strip Romanian diacritics for fuzzy matching */
function stripDiacritics(s) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ăâ]/gi, "a")
    .replace(/[îì]/gi, "i")
    .replace(/[șş]/gi, "s")
    .replace(/[țţ]/gi, "t")
    .toLowerCase();
}

// ── Tool definitions for Claude API ──

export const TOOL_DEFINITIONS = [
  {
    name: "get_schedule",
    description:
      "Download and return the FULL TEXT of a specific program's schedule PDF from Google Drive. " +
      "Use this when a student tells you their program and year and wants to see their schedule. " +
      "The result contains the complete timetable with all days, hours, rooms, and professors.",
    input_schema: {
      type: "object",
      properties: {
        program: {
          type: "string",
          description:
            "Program abbreviation: AA, AAF, AP, BA, CE, MK (undergrad) or AAMM, ADA, ADRU, APESA, APPUE, ARPAM, BC, BE, CA, MAP, MC, MIMB, PPECCS, SMOMV, SMSBA (master) or SDAA, SDSA (doctoral)",
        },
        year: {
          type: "integer",
          description: "Year of study (1, 2, or 3)",
        },
        semester: {
          type: "string",
          enum: ["sem1", "sem2"],
          description: "Semester. Current semester (spring 2026) is sem2.",
        },
      },
      required: ["program", "semester"],
    },
  },
  {
    name: "search_schedule",
    description:
      "Search ALL schedule PDF files for a specific teacher/professor name. " +
      "Downloads PDFs and searches their text content. Use this when someone asks " +
      "about a teacher's schedule or what classes a professor teaches.",
    input_schema: {
      type: "object",
      properties: {
        teacher_name: {
          type: "string",
          description:
            "The teacher/professor name to search for (partial match, diacritics-insensitive)",
        },
        level: {
          type: "string",
          enum: ["undergraduate", "master", "doctoral", "all"],
          description: "Which study level to search. Default: all.",
        },
        semester: {
          type: "string",
          enum: ["sem1", "sem2", "both"],
          description: "Which semester. Current (spring 2026) is sem2.",
        },
      },
      required: ["teacher_name"],
    },
  },
  {
    name: "fetch_page",
    description:
      "Fetch and extract text content from a page on faa.ro or unibuc.ro. " +
      "Use this for professor profiles, detailed program curricula, regulations, news, etc.",
    input_schema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The full URL to fetch (must be on faa.ro or unibuc.ro)",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "get_drive_doc",
    description:
      "Download and read a document (PDF or Word) from a Google Drive folder. " +
      "Use this to read exam tematica, regulations, or other documents hosted on Google Drive. " +
      "Provide the folder ID and a filename substring to match.",
    input_schema: {
      type: "object",
      properties: {
        folder_id: {
          type: "string",
          description: "Google Drive folder ID (from the URL after /folders/)",
        },
        filename_contains: {
          type: "string",
          description: "Substring to match in the filename (e.g. 'CE Tematică' or 'Regulament')",
        },
      },
      required: ["folder_id", "filename_contains"],
    },
  },
  {
    name: "search_site",
    description:
      "Search faa.ro using the site's built-in search. Use when the user asks about " +
      "something specific (a news article, event, regulation, form) and you don't know the exact URL.",
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The search query in Romanian",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "web_search",
    description:
      "Search the web using DuckDuckGo. Use this when information is NOT on faa.ro or unibuc.ro — " +
      "for example, a professor's public profile, publications, LinkedIn, news articles, " +
      "or any external information. Always add 'FAA' or 'Universitatea din București' to the query for relevance.",
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query (in Romanian or English)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "compare_programs",
    description:
      "Fetch two program pages and return their descriptions side by side so the user " +
      "can compare them. Use when a prospective student asks which program to choose.",
    input_schema: {
      type: "object",
      properties: {
        program1_url: {
          type: "string",
          description: "URL of the first program page on faa.ro",
        },
        program2_url: {
          type: "string",
          description: "URL of the second program page on faa.ro",
        },
      },
      required: ["program1_url", "program2_url"],
    },
  },
];

// ── Tool implementations ──

export async function executeTool(name, input) {
  switch (name) {
    case "get_schedule":
      return getSchedule(input);
    case "search_schedule":
      return searchSchedule(input);
    case "fetch_page":
      return fetchPage(input);
    case "get_drive_doc":
      return getDriveDoc(input);
    case "search_site":
      return searchSite(input);
    case "web_search":
      return webSearch(input);
    case "compare_programs":
      return comparePrograms(input);
    default:
      return `Unknown tool: ${name}`;
  }
}

// ── get_schedule — fetch a specific program's schedule ──

async function getSchedule({ program, year, semester }) {
  const code = program.toUpperCase();
  const yr = year || "";

  // Determine which folder to search
  let folderId;
  const isUndergrad = ["AA", "AAF", "AP", "BA", "CE", "MK"].includes(code);
  const isMaster = !isUndergrad && !["SDAA", "SDSA"].includes(code);
  const isDoctorat = ["SDAA", "SDSA"].includes(code);

  if (isUndergrad) {
    const folder =
      semester === "sem1"
        ? SCHEDULES.undergraduate.sem1.folder
        : SCHEDULES.undergraduate.sem2.folder;
    folderId = extractFolderId(folder);
  } else if (isMaster) {
    const folder =
      semester === "sem1"
        ? SCHEDULES.master.sem1.folder
        : SCHEDULES.master.sem2.folder;
    folderId = extractFolderId(folder);
  } else if (isDoctorat) {
    folderId = extractFolderId(SCHEDULES.doctoral.folder);
  } else {
    return `Unknown program code: ${code}`;
  }

  // List files and find the matching PDF
  let files;
  try {
    files = await listFolder(folderId);
  } catch (e) {
    return `Could not list schedule folder: ${e.message}`;
  }

  const pdfFiles = files.filter((f) => f.name.toLowerCase().endsWith(".pdf"));

  // Match by program code + year in filename
  // Filenames look like: "CE3.pdf" (sem1) or "Orar sem 2 25_26 lucru - CE3.pdf" (sem2)
  const needle = `${code}${yr}`.toUpperCase();
  const match = pdfFiles.find((f) => {
    const upper = f.name.toUpperCase();
    // Check for exact code+year pattern (e.g. CE3 in "CE3.pdf" or "- CE3.pdf")
    return upper.includes(needle + ".PDF") || upper.includes(needle + " ");
  });

  if (!match) {
    // Try without year number
    const codeOnly = pdfFiles.find((f) =>
      f.name.toUpperCase().includes(code)
    );
    if (!codeOnly) {
      return `No schedule PDF found for program ${code}${yr} in ${semester}. Available files: ${pdfFiles.map((f) => f.name).join(", ")}`;
    }
    // If no year match, list available files with this code
    const matches = pdfFiles.filter((f) =>
      f.name.toUpperCase().includes(code)
    );
    if (matches.length === 1) {
      // Only one match, use it
      const buffer = await downloadFile(matches[0].id);
      const text = await extractPdfText(buffer);
      const fullName = SCHEDULES.abbreviations[code] || code;
      return `📄 ${matches[0].name} (${fullName})\n\n${text}`;
    }
    return `Multiple files found for ${code}. Please specify the year (1, 2, or 3). Available: ${matches.map((f) => f.name).join(", ")}`;
  }

  // Download and extract text
  const buffer = await downloadFile(match.id);
  const text = await extractPdfText(buffer);
  const fullName = SCHEDULES.abbreviations[code] || code;
  return `📄 ${match.name} (${fullName})\n\n${text}`;
}

// ── search_schedule — search all PDFs for a teacher name ──

async function searchSchedule({
  teacher_name,
  level = "all",
  semester = "both",
}) {
  const folders = [];

  if (level === "all" || level === "undergraduate") {
    if (semester !== "sem2")
      folders.push({ label: "Licență — Sem. I", id: extractFolderId(SCHEDULES.undergraduate.sem1.folder) });
    if (semester !== "sem1")
      folders.push({ label: "Licență — Sem. II", id: extractFolderId(SCHEDULES.undergraduate.sem2.folder) });
  }
  if (level === "all" || level === "master") {
    if (semester !== "sem2")
      folders.push({ label: "Master — Sem. I", id: extractFolderId(SCHEDULES.master.sem1.folder) });
    if (semester !== "sem1")
      folders.push({ label: "Master — Sem. II", id: extractFolderId(SCHEDULES.master.sem2.folder) });
  }
  if (level === "all" || level === "doctoral") {
    folders.push({ label: "Doctorat", id: extractFolderId(SCHEDULES.doctoral.folder) });
  }

  const needle = stripDiacritics(teacher_name);
  const results = [];
  const errors = [];

  for (const { label, id } of folders) {
    let files;
    try {
      files = await listFolder(id);
    } catch (e) {
      errors.push(`Could not list folder ${label}: ${e.message}`);
      continue;
    }

    const pdfFiles = files.filter((f) => f.name.toLowerCase().endsWith(".pdf"));
    const batches = [];
    for (let i = 0; i < pdfFiles.length; i += 6) {
      batches.push(pdfFiles.slice(i, i + 6));
    }

    for (const batch of batches) {
      const batchResults = await Promise.allSettled(
        batch.map(async (file) => {
          const buffer = await downloadFile(file.id);
          const text = await extractPdfText(buffer);
          return { file, text };
        })
      );

      for (const result of batchResults) {
        if (result.status !== "fulfilled") continue;
        const { file, text } = result.value;

        if (stripDiacritics(text).includes(needle)) {
          const lines = text.split("\n");
          const matchLines = [];
          for (let i = 0; i < lines.length; i++) {
            if (stripDiacritics(lines[i]).includes(needle)) {
              const start = Math.max(0, i - 1);
              const end = Math.min(lines.length, i + 3);
              matchLines.push(
                lines.slice(start, end).filter((l) => l.trim()).join("\n")
              );
            }
          }

          const abbr = file.name.match(/(?:^|[-_ ])([A-Z]{2,})\d/);
          const program =
            abbr && SCHEDULES.abbreviations[abbr[1]]
              ? SCHEDULES.abbreviations[abbr[1]]
              : file.name;

          results.push({
            file: file.name,
            section: label,
            program,
            context: [...new Set(matchLines)].join("\n---\n"),
          });
        }
      }
    }
  }

  if (results.length === 0 && errors.length === 0) {
    return `No schedule entries found for "${teacher_name}" in ${folders.map((f) => f.label).join(", ")}.`;
  }

  let output = results
    .map((r) => `📄 ${r.file} (${r.section} — ${r.program})\n${r.context}`)
    .join("\n\n");

  if (errors.length > 0) {
    output += `\n\nWarnings:\n${errors.join("\n")}`;
  }

  return output;
}

// ── fetch_page ──

async function fetchPage({ url }) {
  try {
    const parsed = new URL(url);
    if (
      !parsed.hostname.endsWith("faa.ro") &&
      !parsed.hostname.endsWith("unibuc.ro") &&
      !parsed.hostname.endsWith("faa.unibuc.ro")
    ) {
      return `Refused: only faa.ro and unibuc.ro domains are allowed. Got: ${parsed.hostname}`;
    }
  } catch {
    return `Invalid URL: ${url}`;
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "FAA-Guide-Agent/1.0" },
      redirect: "follow",
    });

    if (!res.ok) return `HTTP ${res.status} fetching ${url}`;

    const html = await res.text();

    let text = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[\s\S]*?<\/nav>/gi, "")
      .replace(/<footer[\s\S]*?<\/footer>/gi, "");

    text = text
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<\/div>/gi, "\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<\/tr>/gi, "\n")
      .replace(/<\/td>/gi, " | ")
      .replace(/<\/th>/gi, " | ")
      .replace(/<h[1-6][^>]*>/gi, "\n## ")
      .replace(/<\/h[1-6]>/gi, "\n")
      .replace(/<li[^>]*>/gi, "- ")
      .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "$2 ($1)")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/[ \t]+/g, " ")
      .replace(/\n /g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (text.length > 8000) {
      text = text.slice(0, 8000) + "\n\n[Content truncated — page too long]";
    }

    return text || "Page loaded but no text content found.";
  } catch (e) {
    return `Error fetching ${url}: ${e.message}`;
  }
}

// ── get_drive_doc — download and read a document from Google Drive ──

async function getDriveDoc({ folder_id, filename_contains }) {
  let files;
  try {
    files = await listFolder(folder_id);
  } catch (e) {
    return `Could not list Drive folder: ${e.message}`;
  }

  const needle = stripDiacritics(filename_contains);
  const match = files.find((f) => stripDiacritics(f.name).includes(needle));

  if (!match) {
    return `No file matching "${filename_contains}" in folder. Available: ${files.map((f) => f.name).join(", ")}`;
  }

  let buffer;
  try {
    buffer = await downloadFile(match.id);
  } catch (e) {
    return `Could not download ${match.name}: ${e.message}`;
  }

  // Check file type by content
  const header = buffer.slice(0, 5).toString();

  if (header === "%PDF-") {
    // PDF — extract text with pdfjs
    const text = await extractPdfText(buffer);
    return `📄 ${match.name}\n\n${text}`;
  }

  if (header.startsWith("PK")) {
    // DOCX / XLSX — ZIP-based Office format
    try {
      const zip = new AdmZip(buffer);
      const docEntry = zip.getEntry("word/document.xml");
      if (docEntry) {
        // DOCX: extract text from word/document.xml
        const xml = docEntry.getData().toString("utf-8");
        const textParts = [];
        for (const m of xml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)) {
          textParts.push(m[1]);
        }
        // Also detect paragraph breaks
        let result = "";
        let inParagraph = false;
        for (const m of xml.matchAll(/<(\/?)w:p[ />]|<w:t[^>]*>([^<]*)<\/w:t>/g)) {
          if (m[1] === "/" || (m[0].startsWith("<w:p") && !m[0].includes("<w:t"))) {
            if (inParagraph) result += "\n";
            inParagraph = false;
          }
          if (m[2] !== undefined) {
            result += m[2];
            inParagraph = true;
          }
        }
        if (result.trim()) {
          return `📄 ${match.name}\n\n${result.trim()}`;
        }
        // Fallback to simple join
        return `📄 ${match.name}\n\n${textParts.join(" ")}`;
      }
      // XLSX or other ZIP format
      const entries = zip.getEntries().map((e) => e.entryName);
      return `📄 ${match.name} — ZIP archive with: ${entries.slice(0, 10).join(", ")}. Cannot extract text from this format.`;
    } catch (e) {
      return `📄 ${match.name} — downloaded (${buffer.length} bytes) but extraction failed: ${e.message}`;
    }
  }

  return `📄 ${match.name} — unknown format (${buffer.length} bytes). First bytes: ${header}`;
}

// ── search_site — search faa.ro by crawling key pages ──

async function searchSite({ query }) {
  const needle = stripDiacritics(query);

  // List of pages to search through
  const pagesToSearch = [
    { label: "Student FAA", url: "https://www.faa.ro/index.php/pentru-student.html" },
    { label: "Stiri", url: "https://www.faa.ro/index.php/stiri.html" },
    { label: "Evenimente", url: "https://www.faa.ro/index.php/evenimente.html" },
    { label: "Responsabilitate Sociala", url: "https://www.faa.ro/index.php/responsabilitate-sociala.html" },
    { label: "Practica si Internship", url: "https://www.faa.ro/index.php/practica-si-internship.html" },
    { label: "CIVIS FAA", url: "https://www.faa.ro/index.php/civis-faa.html" },
    { label: "Despre Noi", url: "https://www.faa.ro/index.php/despre-noi.html" },
    { label: "Burse", url: "https://www.faa.ro/index.php/burse" },
    { label: "Erasmus", url: "https://www.faa.ro/index.php/mobilitati-erasmus.html" },
    { label: "Tabere", url: "https://www.faa.ro/index.php/tabere-studentesti" },
  ];

  const results = [];

  // Search pages in parallel (batch of 4)
  for (let i = 0; i < pagesToSearch.length; i += 4) {
    const batch = pagesToSearch.slice(i, i + 4);
    const batchResults = await Promise.allSettled(
      batch.map(async ({ label, url }) => {
        const text = await fetchPage({ url });
        if (stripDiacritics(text).includes(needle)) {
          // Extract lines with matches
          const lines = text.split("\n");
          const matchLines = [];
          for (let j = 0; j < lines.length; j++) {
            if (stripDiacritics(lines[j]).includes(needle)) {
              const start = Math.max(0, j - 1);
              const end = Math.min(lines.length, j + 3);
              matchLines.push(lines.slice(start, end).filter((l) => l.trim()).join("\n"));
            }
          }
          return { label, url, matches: [...new Set(matchLines)].join("\n---\n") };
        }
        return null;
      })
    );

    for (const r of batchResults) {
      if (r.status === "fulfilled" && r.value) results.push(r.value);
    }
  }

  if (results.length === 0) {
    return `No results found for "${query}" across ${pagesToSearch.length} faa.ro pages.`;
  }

  return results
    .map((r) => `📍 ${r.label} (${r.url})\n${r.matches}`)
    .join("\n\n");
}

// ── web_search — DuckDuckGo web search ──

async function webSearch({ query }) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      redirect: "follow",
    });

    if (!res.ok) return `Search failed: HTTP ${res.status}`;

    const html = await res.text();

    // Extract search results from DuckDuckGo HTML
    const results = [];
    const resultRegex =
      /<a[^>]*class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a[^>]*class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;

    let match;
    while ((match = resultRegex.exec(html)) && results.length < 8) {
      const href = match[1];
      const title = match[2].replace(/<[^>]+>/g, "").trim();
      const snippet = match[3].replace(/<[^>]+>/g, "").trim();

      // Decode DuckDuckGo redirect URL
      let realUrl = href;
      const uddg = href.match(/uddg=([^&]+)/);
      if (uddg) realUrl = decodeURIComponent(uddg[1]);

      if (title && snippet) {
        results.push(`${title}\n${realUrl}\n${snippet}`);
      }
    }

    if (results.length === 0) {
      // Fallback: extract any links with snippets
      const fallbackRegex =
        /<a[^>]*class="result__url"[^>]*[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a[^>]*class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;
      while ((match = fallbackRegex.exec(html)) && results.length < 5) {
        const url = match[1].replace(/<[^>]+>/g, "").trim();
        const snippet = match[2].replace(/<[^>]+>/g, "").trim();
        if (url && snippet) results.push(`${url}\n${snippet}`);
      }
    }

    if (results.length === 0) {
      return `No results found for "${query}".`;
    }

    return `Web search results for "${query}":\n\n${results.join("\n\n")}`;
  } catch (e) {
    return `Search error: ${e.message}`;
  }
}

// ── compare_programs — side-by-side program comparison ──

async function comparePrograms({ program1_url, program2_url }) {
  const [p1, p2] = await Promise.all([
    fetchPage({ url: program1_url }),
    fetchPage({ url: program2_url }),
  ]);

  return `=== PROGRAM 1 ===\nURL: ${program1_url}\n\n${p1}\n\n=== PROGRAM 2 ===\nURL: ${program2_url}\n\n${p2}`;
}
