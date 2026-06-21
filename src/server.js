import { createServer } from "node:http";
import { createAgent } from "./agent.js";

const PORT = process.env.PORT || 3000;
const agent = createAgent();

const sessions = new Map();

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

const server = createServer(async (req, res) => {
  cors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", agent: "faa-guide" }));
    return;
  }

  if (req.method === "POST" && req.url === "/chat") {
    let body = "";
    for await (const chunk of req) body += chunk;

    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
      return;
    }

    const { message, sessionId = "default" } = parsed;
    if (!message) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing 'message' field" }));
      return;
    }

    // SSE headers
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    function sendEvent(data) {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    if (!sessions.has(sessionId)) sessions.set(sessionId, []);
    const messages = sessions.get(sessionId);
    messages.push({ role: "user", content: message });

    try {
      const reply = await agent.chatStream(messages, sendEvent);
      messages.push({ role: "assistant", content: reply });
    } catch (err) {
      sendEvent({ type: "error", text: err.message });
      sendEvent({ type: "done" });
    }

    res.end();
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`FAA Guide API running on http://localhost:${PORT}`);
  console.log(`  POST /chat  — SSE stream`);
  console.log(`  GET  /health`);
});
