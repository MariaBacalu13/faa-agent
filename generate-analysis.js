import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
         AlignmentType, WidthType, BorderStyle, ShadingType, HeadingLevel,
         PageBreak, ExternalHyperlink } from 'docx';
import fs from 'fs';

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 22 },
        paragraph: { spacing: { line: 360 } }
      }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Calibri", color: "1F4E78" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Calibri", color: "2E5C8A" },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, font: "Calibri", color: "4472C4" },
        paragraph: { spacing: { before: 120, after: 80 }, outlineLevel: 2 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: "bullet",
            text: "•",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 720, hanging: 360 }
              }
            }
          }
        ]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // PAGINA DE TITLU
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 2000, after: 100 },
        children: [new TextRun({
          text: "ANALIZĂ COMPLETĂ",
          size: 48,
          bold: true,
          color: "1F4E78"
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({
          text: "Fișiere JavaScript - Modul FAA Guide AI",
          size: 32,
          color: "2E5C8A"
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 2000 },
        children: [new TextRun({
          text: "Universitatea din București - Facultatea de Administrație și Afaceri",
          size: 24,
          italic: true,
          color: "4472C4"
        })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [new TextRun({
          text: "2026",
          size: 24
        })]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // CUPRINS
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Cuprins")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("1. Prezentare Generală Proiect")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("2. Agent.js - Orchestrator Claude API")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("3. Drive.js - Utilități Google Drive")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("4. Index.js - CLI Interactiv")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("5. Knowledge.js - Baza de Cunoștințe")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("6. Server.js - HTTP Server cu SSE")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("7. Tools.js - Definiții și Implementări Tool-uri")]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("8. Diagrame Integratoare")]
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // SECȚIUNE 1: PREZENTARE GENERALĂ
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("1. Prezentare Generală Proiect")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "Scop și Obiective",
          bold: true,
          size: 24
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun("Proiectul FAA Guide AI este un asistent conversațional inteligent bazat pe Claude API, conceput pentru a oferi informații și asistență despre Facultatea de Administrație și Afaceri din Universitatea din București.")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "Tehnologie și Arhitectură",
          bold: true,
          size: 24
        })]
      }),
      createBulletList([
        "Runtime: Node.js",
        "AI Model: Claude (Anthropic API)",
        "Interfață: CLI (Command Line) + HTTP Server (SSE Streaming)",
        "Surse Date: Google Drive (orar, documente), FAA.ro (pagini web), Web Search",
        "Bază Cunoștințe: Structured JSON cu URL-uri, contact, programe, profesori"
      ]),
      new Paragraph({
        spacing: { before: 200, after: 200 },
        children: [new TextRun({
          text: "Cazuri de Utilizare",
          bold: true,
          size: 24
        })]
      }),
      createBulletList([
        "Răspunsuri la întrebări despre programe de studii",
        "Informații despre orar și programul cursurilor",
        "Date de contact și sedii ale facultății",
        "Profiluri și informații despre profesori",
        "Comparații între programe de studii",
        "Căutare de resurse și documente academice"
      ]),
      new Paragraph({
        spacing: { before: 200, after: 200 },
        children: [new TextRun({
          text: "Fluxul Arhitectural",
          bold: true,
          size: 24
        })]
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [new TextRun("User Input → CLI/HTTP → Agent.chatStream() → Claude API → Tool Orchestration → Response Streaming")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "Dependențe Externe Principale",
          bold: true,
          size: 24
        })]
      }),
      createDependencyTable([
        ["@anthropic-ai/sdk", "Claude API Client"],
        ["pdfjs-dist", "Extragere text din PDF"],
        ["adm-zip", "Parsare DOCX/XLSX"],
        ["node:http", "HTTP Server"],
        ["node:readline", "CLI Input/Output"],
        ["fetch API", "HTTP Requests (nativ Node.js)"]
      ]),
      new Paragraph({ children: [new PageBreak()] }),

      // SECȚIUNE 2: AGENT.JS
      createFileSection("2", "agent.js", "Orchestrator Claude API cu Tool Use",
        "Modul central care coordonează comunicarea cu Claude API și gestionează execuția tool-urilor cu multi-round reasoning. Implementează streaming events și gestionare automată a conversației.",
        [
          ["createAgent()", "Creează și returnează instanța agentului cu metodele chat și chatStream"],
          ["chatStream(messages, emit)", "Streaming conversație multi-round cu emitere de events - thinking, tool_call, tool_result, reply, done, error"],
          ["chat(messages)", "Wrapper CLI care colectează responses din chatStream și le returnează ca string"]
        ],
        [
          ["MAX_TOOL_ROUNDS", "5", "Numărul maxim de runde de tool use per conversație"],
          ["SYSTEM_PROMPT", "string", "Instrucțiuni detaliate pentru comportamentul agentului (limba română și engleză)"],
          ["messages[]", "array", "Istoric conversației cu obiecte {role, content}"]
        ],
        [
          "// Exemplu utilizare:",
          "const agent = createAgent();",
          "const messages = [",
          "  { role: 'user', content: 'Care e orarul cursurilor de Administrare Afaceri?' }",
          "];",
          "const response = await agent.chat(messages);",
          "// Response: text complet cu orar descărcat de la Google Drive"
        ],
        "agent.js → imports knowledge.js (bază cunoștințe) + tools.js (definiri și execuție)"
      ),

      // SECȚIUNE 3: DRIVE.JS
      createFileSection("3", "drive.js", "Utilități Google Drive Public",
        "Modul pentru operații cu fișiere din Google Drive public. Include caching pentru optimizare performanță și HTTP requests către Google APIs.",
        [
          ["listFolder(folderId)", "Listează fișiere din folder Google Drive cu caching"],
          ["downloadFile(fileId)", "Descarcă buffer conținut fișier de pe Google Drive cu caching"],
          ["extractFolderId(url)", "Extrage ID folder din URL Google Drive folosind regex"]
        ],
        [
          ["folderId", "string", "ID-ul unic al folderului Google Drive"],
          ["fileId", "string", "ID-ul unic al fișierului Google Drive"],
          ["url", "string", "URL Google Drive (ex: folders/{id})"]
        ],
        [
          "// Exemplu descărcare orar:",
          "const fileId = '1A2B3C4D5E6F7G8H9I';",
          "const buffer = await downloadFile(fileId);",
          "// buffer conține conținutul PDF-ului descărcat",
          "",
          "// Exemplu listare folder:",
          "const files = await listFolder('0A1B2C3D4E5F6G7H8');",
          "// Returnează: [{id: '...', name: 'orar_sem1.pdf'}, ...]"
        ],
        "drive.js → uses fetch API nativ + Buffer API (Node.js)"
      ),

      // SECȚIUNE 4: INDEX.JS
      createFileSection("4", "index.js", "CLI Interactiv - Entry Point",
        "Punctul de intrare pentru interfața command-line. Gestionează input/output interactiv, menține istoric conversație și apelează agent.chat() pentru fiecare mesaj.",
        [
          ["prompt()", "Funcție recursivă care citește input, apelează agent și afișează output"],
          ["rl.question()", "Citire asincronă din stdin cu prompt customizat"]
        ],
        [
          ["stdin/stdout", "streams", "Fluxuri standard de input/output"],
          ["messages[]", "array", "Istoric stateful al conversației"],
          ["rl (readline interface)", "object", "Interfață pentru citire input din terminal"]
        ],
        [
          "// Flux CLI:",
          "$ node index.js",
          "Banner welcome...",
          "You: Care e orarul lunii?",
          "FAA Guide: Orar pentru luna iunie...",
          "You: exit",
          "// Program terminat"
        ],
        "index.js → imports agent.js (createAgent) + node:readline (CLI)"
      ),

      // SECȚIUNE 5: KNOWLEDGE.JS
      createFileSection("5", "knowledge.js", "Baza de Cunoștințe Structurată",
        "Modul cu date structurate despre FAA: URL-uri, contact, programe de studii, orar, profesori, departamente. Fără dependențe externe - pure JavaScript objects și constante.",
        [
          ["buildProfessorUrl(dept, slug)", "Construiește URL complet profesor pe baza departament și slug"],
          ["findProfessor(query)", "Caută profesori pe nume cu string matching case-insensitive"],
          ["SITE_MAP, CONTACT, PROGRAMS, etc.", "Constante export cu date structurate"]
        ],
        [
          ["SITE_MAP", "object", "URL-uri organizate pe categorii (home, programs, portals, etc.)"],
          ["CONTACT", "object", "Adresă, email, telefoane, orar contact FAA"],
          ["PROGRAMS", "array", "Programe licență și master cu detalii (limbă, locuri, durata)"],
          ["PROFESSORS", "object", "Profesori pe departamente cu slug-uri"],
          ["SCHEDULES", "object", "Referințe la foldere Google Drive cu orar pe programe"]
        ],
        [
          "// Exemplu căutare profesor:",
          "const profUrl = buildProfessorUrl('dap', 'ion-popescu');",
          "// Returnează: https://www.faa.ro/index.php/profesori-dap/ion-popescu.html",
          "",
          "// Exemplu căutare:",
          "const results = findProfessor('Popescu');",
          "// Returnează: [{name: 'Ion Popescu', dept: 'dap', url: '...'}]"
        ],
        "knowledge.js → module pur data, fără importuri externe"
      ),

      // SECȚIUNE 6: SERVER.JS
      createFileSection("6", "server.js", "HTTP Server cu SSE Streaming",
        "Server Node.js care expune API HTTP pentru integrări web. Gestionează POST /chat cu streaming Server-Sent Events și menține sesiuni persistente cu istoric.",
        [
          ["GET /health", "Endpoint sănătate: returnează {status: 'ok', agent: 'faa-guide'}"],
          ["POST /chat", "Endpoint chat: acceptă {message, sessionId?}, returnează SSE stream"],
          ["cors(res)", "Setează headere CORS pentru orice origine și metode POST/OPTIONS"]
        ],
        [
          ["PORT", "number", "Port server (env var PORT sau 3000 default)"],
          ["message", "string", "Mesajul de la client (body POST /chat)"],
          ["sessionId", "string", "ID sesiune opțional pentru persistență (default 'default')"],
          ["sessions", "Map", "Map<sessionId → messages[]> pentru istoric conversații"]
        ],
        [
          "// Exemplu request curl:",
          "curl -X POST http://localhost:3000/chat \\",
          "  -H 'Content-Type: application/json' \\",
          "  -d '{\"message\": \"Orarul?\"}'",
          "",
          "// Răspuns SSE stream:",
          "data: {\"type\": \"thinking\", ...}",
          "data: {\"type\": \"tool_call\", ...}",
          "data: {\"type\": \"reply\", \"content\": \"...\"}"
        ],
        "server.js → imports agent.js (createAgent) + node:http (server)"
      ),

      // SECȚIUNE 7: TOOLS.JS
      createFileSection("7", "tools.js", "Definiții și Implementări Tool-uri",
        "Modul cu 7 tool-uri pentru Claude API: orar, căutare profesori, fetch pagini, descărcare documente, căutare site, web search, comparare programe. Include PDF extraction și DOCX parsing.",
        [
          ["executeTool(name, input)", "Dispatcher care apelează implementare corectă pe baza numelui"],
          ["getSchedule({program, year, semester})", "Descarcă și extrage text orar PDF"],
          ["searchSchedule({teacher, level, semester})", "Caută într-o set de PDF-uri"],
          ["fetchPage({url})", "Fetch și HTML parsing pentru faa.ro/unibuc.ro"],
          ["getDriveDoc({folder_id, filename})", "Descarcă doc Google Drive, detectează tip, extrage text"],
          ["searchSite({query})", "Crawl pagini cheie și caută query"],
          ["webSearch({query})", "DuckDuckGo search cu parsing"],
          ["comparePrograms({url1, url2})", "Fetch side-by-side pentru 2 programe"]
        ],
        [
          ["program", "string", "Cod program (AP, BA, MK, etc.)"],
          ["teacher_name", "string", "Nume profesor pt căutare"],
          ["url", "string", "URL pe faa.ro/unibuc.ro"],
          ["folder_id", "string", "ID folder Google Drive"],
          ["filename_contains", "string", "Cuvânt din nume fișier pentru search"],
          ["query", "string", "Text pentru căutare"]
        ],
        [
          "// Exemplu tool get_schedule:",
          "const result = await executeTool('get_schedule', {",
          "  program: 'AP',  // Administrare Publică",
          "  year: 1,",
          "  semester: 'sem1'",
          "});",
          "// Returnează: text orar complet din PDF",
          "",
          "// Exemplu tool search_schedule:",
          "const result = await executeTool('search_schedule', {",
          "  teacher_name: 'Popescu',",
          "  level: 'undergraduate'",
          "});",
          "// Returnează: context-uri din PDF unde apare 'Popescu'"
        ],
        "tools.js → imports drive.js, pdfjs-dist, adm-zip, knowledge.js"
      ),

      // SECȚIUNE 8: DIAGRAME INTEGRATOARE
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("8. Diagrame Integratoare")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.1 Diagrama Dependency - Importuri și Relații")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "index.js (CLI)",
          bold: true,
          family: "Courier New",
          size: 20
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "    ↓ imports",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "agent.js (Orchestrator)",
          bold: true,
          family: "Courier New",
          size: 20
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "    ├↓ imports",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "    │   knowledge.js (Bază Cunoștințe)",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "    └↓ imports",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "        tools.js (Implementări)",
          bold: true,
          family: "Courier New",
          size: 20
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "            ├↓ imports",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "            │   drive.js (Google Drive Utility)",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 300 },
        children: [new TextRun({
          text: "            └↓ imports",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 300 },
        children: [new TextRun({
          text: "                pdfjs-dist (PDF Extraction)",
          family: "Courier New"
        })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.2 Diagrama Business Flow - Conversație")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "User Input",
          bold: true,
          family: "Courier New",
          size: 20
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    ↓",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "agent.chatStream(messages, emit)",
          bold: true,
          family: "Courier New",
          size: 20
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    ↓",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "emit('thinking') — așteptare model",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    ↓",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "[Decision] Răspuns direct vs Tool needed",
          bold: true,
          family: "Courier New",
          size: 20
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    ├→ emit('reply') — răspuns final",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │    └→ emit('done')",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    └→ emit('tool_call', {name, input})",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         ↓",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         executeTool(name, input) [MAX 5 runde]",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         ↓",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         emit('tool_result', {result})",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 300 },
        children: [new TextRun({
          text: "         ↓ [Loop dacă mai sunt runde]",
          family: "Courier New"
        })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.3 Diagrama Tool Execution - Pipeline")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "executeTool() DISPATCHER",
          bold: true,
          family: "Courier New",
          size: 20
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    ├→ get_schedule",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │    └→ listFolder(Drive) → downloadFile(Drive) → extractPdfText()",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    ├→ search_schedule",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │    └→ listFolder(Drive) → downloadFile(Drive) → extractPdfText() → search text",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    ├→ fetch_page",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │    └→ fetch(URL) → HTML cleanup → text extract",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    ├→ get_drive_doc",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │    └→ downloadFile(Drive) → [PDF: pdfjs | DOCX: adm-zip] → extract text",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    ├→ search_site",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │    └→ fetch(pages[]) → HTML cleanup → search matches",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    ├→ web_search",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │    └→ fetch(DuckDuckGo) → regex parse → results",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "    └→ compare_programs",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 300 },
        children: [new TextRun({
          text: "         └→ fetch(URL1), fetch(URL2) → side-by-side compare",
          family: "Courier New"
        })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.4 Diagrama Server HTTP - Session Management")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({
          text: "HTTP Client",
          bold: true,
          family: "Courier New",
          size: 20
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    ├→ GET /health",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │    └→ {status: 'ok', agent: 'faa-guide'}",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    │",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "    └→ POST /chat {message, sessionId?}",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         ↓",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         sessions.get(sessionId) || sessions.set(sessionId, [])",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         ↓",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         messages.push({role: 'user', content: message})",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         ↓",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         agent.chatStream(messages, emit)",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         ↓",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         sendEvent(data) → SSE stream",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({
          text: "         ↓",
          family: "Courier New"
        })]
      }),
      new Paragraph({
        spacing: { after: 300 },
        children: [new TextRun({
          text: "         messages.push({role: 'assistant', content: response})",
          family: "Courier New"
        })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Concluzie")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun("Proiectul FAA Guide AI este o arhitectură modulară și bine structurată care combină puteri Claude API cu o bază de cunoștințe compilate despre o instituție academică. Modulele sunt clar separate pe responsabilități:")]
      }),
      createBulletList([
        "Orchestration: agent.js coordonează logica conversației",
        "Knowledge Base: knowledge.js oferă date structurate",
        "Tools: tools.js implementează 7 funcționalități distincte",
        "Integration: drive.js, index.js, server.js oferă interfețe diferite",
        "Streaming: ChatStream events permit procesare real-time"
      ])
    ]
  }]
});

// Runde Packer și salvează
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("src/ANALIZA_COMPLETE_FAA_AGENT.docx", buffer);
  console.log("✓ Document Word generat cu succes: src/ANALIZA_COMPLETE_FAA_AGENT.docx");
});

// Helper functions
function createBulletList(items) {
  return items.map(item =>
    new Paragraph({
      numbering: { reference: "bullets", level: 0 },
      children: [new TextRun(item)]
    })
  );
}

function createDependencyTable(deps) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2800, 6560],
    rows: [
      new TableRow({
        children: [
          createTableCell("Bibliotecă", true),
          createTableCell("Descriere", true)
        ]
      }),
      ...deps.map(([lib, desc]) =>
        new TableRow({
          children: [
            createTableCell(lib),
            createTableCell(desc)
          ]
        })
      )
    ]
  });
}

function createTableCell(text, header = false) {
  return new TableCell({
    borders,
    width: { size: header ? 2800 : 6560, type: WidthType.DXA },
    shading: header ? { fill: "4472C4", type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      children: [new TextRun({
        text,
        bold: header,
        color: header ? "FFFFFF" : "000000",
        size: 20
      })]
    })]
  });
}

function createFileSection(num, filename, title, description, functions, params, examples, deps) {
  return [
    new Paragraph({ children: [new PageBreak()] }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun(`${num}. ${filename} - ${title}`)]
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({
        text: "Descriere",
        bold: true,
        size: 24
      })]
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun(description)]
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({
        text: "Funcții și Metode Principale",
        bold: true,
        size: 24
      })]
    }),
    createFunctionsTable(functions),
    new Paragraph({
      spacing: { before: 200, after: 200 },
      children: [new TextRun({
        text: "Parametri și Tipuri",
        bold: true,
        size: 24
      })]
    }),
    createParamsTable(params),
    new Paragraph({
      spacing: { before: 200, after: 200 },
      children: [new TextRun({
        text: "Exemplu de Utilizare",
        bold: true,
        size: 24
      })]
    }),
    ...examples.map(line =>
      new Paragraph({
        children: [new TextRun({
          text: line,
          family: "Courier New",
          size: 18
        })]
      })
    ),
    new Paragraph({
      spacing: { before: 200, after: 200 },
      children: [new TextRun({
        text: "Diagrama Dependency",
        bold: true,
        size: 24
      })]
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({
        text: deps,
        family: "Courier New",
        size: 20
      })]
    })
  ];
}

function createFunctionsTable(functions) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3000, 6360],
    rows: [
      new TableRow({
        children: [
          createTableCell("Funcție", true),
          createTableCell("Descriere", true)
        ]
      }),
      ...functions.map(([func, desc]) =>
        new TableRow({
          children: [
            createTableCell(func),
            createTableCell(desc)
          ]
        })
      )
    ]
  });
}

function createParamsTable(params) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2200, 2200, 4960],
    rows: [
      new TableRow({
        children: [
          createTableCell("Parametru", true),
          createTableCell("Tip", true),
          createTableCell("Descriere", true)
        ]
      }),
      ...params.map(([param, type, desc]) =>
        new TableRow({
          children: [
            createTableCell(param),
            createTableCell(type),
            createTableCell(desc)
          ]
        })
      )
    ]
  });
}
