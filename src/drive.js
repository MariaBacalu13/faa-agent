// Google Drive operations: list public folder contents, download files

const folderCache = new Map();
const fileCache = new Map();

/**
 * List files in a public Google Drive folder.
 * Scrapes the embeddedfolderview page for file IDs and names.
 */
export async function listFolder(folderId) {
  if (folderCache.has(folderId)) return folderCache.get(folderId);

  const url = `https://drive.google.com/embeddedfolderview?id=${folderId}`;
  const res = await fetch(url);
  const html = await res.text();

  const files = [];
  const seen = new Set();

  // Google Drive embeddedfolderview structure:
  //   <a href="...file/d/FILE_ID/..."> ... <div class="flip-entry-title">FILENAME</div>
  for (const match of html.matchAll(
    /file\/d\/([a-zA-Z0-9_-]+)[^]*?flip-entry-title">([^<]+)/g
  )) {
    const id = match[1];
    if (!seen.has(id)) {
      seen.add(id);
      files.push({ id, name: match[2].trim() });
    }
  }

  folderCache.set(folderId, files);
  return files;
}

/**
 * Download a file from Google Drive by file ID. Returns a Buffer.
 */
export async function downloadFile(fileId) {
  if (fileCache.has(fileId)) return fileCache.get(fileId);

  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "Mozilla/5.0" } });

  if (!res.ok) throw new Error(`Failed to download ${fileId}: ${res.status}`);

  const buffer = Buffer.from(await res.arrayBuffer());
  fileCache.set(fileId, buffer);
  return buffer;
}

/**
 * Extract folder ID from a Google Drive URL.
 */
export function extractFolderId(url) {
  const match = url.match(/folders\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : url;
}
