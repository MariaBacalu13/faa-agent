import "./style.css";
import { marked } from "marked";
import DOMPurify from "dompurify";

marked.use({ gfm: true, breaks: true });

const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    "p", "br", "strong", "b", "em", "i", "a", "code", "pre",
    "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6",
    "blockquote", "hr", "table", "thead", "tbody", "tr", "th", "td",
    "del", "sup", "sub", "span",
  ],
  ALLOWED_ATTR: ["href", "target", "rel", "class"],
};

const SESSION_ID = crypto.randomUUID();

const QUICK_ACTIONS = [
  { label: "Programe de licenta", message: "Ce programe de licenta oferiti?" },
  { label: "Admitere 2026", message: "Cum ma inscriu la admitere in 2026?" },
  { label: "Programe de master", message: "Ce programe de master aveti?" },
  { label: "Contact secretariat", message: "Cum pot contacta secretariatul?" },
  { label: "Burse", message: "Ce tipuri de burse sunt disponibile?" },
  { label: "Erasmus", message: "Cum pot aplica pentru Erasmus?" },
  { label: "English programs", message: "What programs are available in English?" },
  { label: "Taxe", message: "Care sunt taxele de scolarizare?" },
];

const WELCOME_MESSAGE = `Buna! Sunt **FAA Guide**, asistentul virtual al Facultatii de Administratie si Afaceri, Universitatea din Bucuresti.

Te pot ajuta cu:
- **Programe de studiu** — licenta, master, doctorat, postuniversitar
- **Admitere** — calendar, documente necesare, taxe, locuri disponibile
- **Servicii studentesti** — burse, cazare, Erasmus, practica
- **Contact** — secretariat, departamente, adrese

Intreaba-ma orice despre FAA!`;

const TOOL_LABELS = {
  get_schedule: "Descarc orarul PDF",
  search_schedule: "Caut profesor in orare",
  fetch_page: "Citesc pagina web",
  get_drive_doc: "Citesc documentul din Drive",
  search_site: "Caut pe faa.ro",
  web_search: "Caut pe internet",
  compare_programs: "Compar programele",
};

function renderMarkdown(text) {
  let html = marked.parse(text);
  html = html.replace(/<a href="/g, '<a target="_blank" rel="noopener noreferrer" href="');
  return DOMPurify.sanitize(html, PURIFY_CONFIG);
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function createApp() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <header class="header">
      <div class="header-logo">FAA</div>
      <div class="header-info">
        <h1>FAA Guide</h1>
        <p>Facultatea de Administratie si Afaceri — Universitatea din Bucuresti</p>
      </div>
    </header>

    <div class="messages" id="messages"></div>

    <div class="quick-actions" id="quick-actions">
      ${QUICK_ACTIONS.map(
        (q) => `<button class="quick-action" data-msg="${q.message}">${q.label}</button>`
      ).join("")}
    </div>

    <div class="input-area">
      <textarea id="input" placeholder="Scrie intrebarea ta..." rows="1"></textarea>
      <button class="send-btn" id="send-btn" title="Trimite">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>

    <div class="status-bar">
      <a href="https://www.faa.ro" target="_blank">faa.ro</a> &middot; Asistent virtual alimentat de Claude AI
    </div>
  `;

  const messagesEl = document.getElementById("messages");
  const inputEl = document.getElementById("input");
  const sendBtn = document.getElementById("send-btn");
  const quickActionsEl = document.getElementById("quick-actions");

  let sending = false;

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addMessage(role, content) {
    const div = document.createElement("div");
    div.className = `message ${role}`;
    const avatar = role === "user" ? "Tu" : "\u{1F393}";
    div.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-bubble">${renderMarkdown(content)}</div>
    `;
    messagesEl.appendChild(div);
    scrollToBottom();
    return div;
  }

  /**
   * Create a bot message container with a steps area (for tool calls)
   * and a reply area (for the final answer). Returns helpers to update both.
   */
  function createBotStream() {
    const wrapper = document.createElement("div");
    wrapper.className = "message bot";
    wrapper.innerHTML = `
      <div class="message-avatar">\u{1F393}</div>
      <div class="message-bubble">
        <div class="stream-steps"></div>
        <div class="stream-reply"></div>
      </div>
    `;
    messagesEl.appendChild(wrapper);

    const stepsEl = wrapper.querySelector(".stream-steps");
    const replyEl = wrapper.querySelector(".stream-reply");

    return {
      addStep(html) {
        const step = document.createElement("div");
        step.className = "tool-step";
        step.innerHTML = html;
        stepsEl.appendChild(step);
        scrollToBottom();
        return step;
      },
      updateStep(stepEl, html) {
        stepEl.innerHTML = html;
        scrollToBottom();
      },
      setReply(markdownText) {
        replyEl.innerHTML = renderMarkdown(markdownText);
        scrollToBottom();
      },
      setThinking(text) {
        // Show thinking text as a subtle step
        const existing = stepsEl.querySelector(".thinking-step");
        if (existing) {
          existing.innerHTML = `<span class="step-icon">💭</span> ${escapeHtml(text)}`;
        } else {
          const step = document.createElement("div");
          step.className = "tool-step thinking-step";
          step.innerHTML = `<span class="step-icon">💭</span> ${escapeHtml(text)}`;
          stepsEl.appendChild(step);
        }
        scrollToBottom();
      },
      remove() {
        wrapper.remove();
      },
    };
  }

  async function send(text) {
    if (sending || !text.trim()) return;
    sending = true;
    sendBtn.disabled = true;
    quickActionsEl.style.display = "none";

    addMessage("user", text);
    inputEl.value = "";
    inputEl.style.height = "auto";

    const stream = createBotStream();

    // Show initial typing state
    const typingStep = stream.addStep(
      '<div class="typing"><span></span><span></span><span></span></div>'
    );

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: SESSION_ID }),
      });

      if (!res.ok) {
        typingStep.remove();
        stream.setReply("Eroare de server. Incearca din nou.");
        sending = false;
        sendBtn.disabled = false;
        return;
      }

      // Remove typing indicator once first event arrives
      let typingRemoved = false;
      function removeTyping() {
        if (!typingRemoved) {
          typingStep.remove();
          typingRemoved = true;
        }
      }

      // Read SSE stream
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let currentToolStep = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop(); // keep incomplete line in buffer

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          let event;
          try {
            event = JSON.parse(line.slice(6));
          } catch {
            continue;
          }

          removeTyping();

          switch (event.type) {
            case "thinking":
              stream.setThinking(event.text);
              break;

            case "tool_call": {
              const label = TOOL_LABELS[event.name] || event.name;
              let detail = "";
              const inp = event.input || {};
              if (event.name === "get_schedule") {
                detail = `${inp.program || ""}${inp.year || ""} — ${inp.semester === "sem1" ? "Sem. I" : "Sem. II"}`;
              } else if (event.name === "search_schedule") {
                detail = `"${inp.teacher_name || ""}"`;
              } else if (event.name === "fetch_page") {
                detail = (inp.url || "").replace(/^https?:\/\/(www\.)?/, "").slice(0, 55);
              } else if (event.name === "get_drive_doc") {
                detail = `"${inp.filename_contains || ""}"`;
              } else if (event.name === "web_search") {
                detail = `"${inp.query || ""}"`;
              } else if (event.name === "search_site") {
                detail = `"${inp.query || ""}"`;
              } else if (event.name === "compare_programs") {
                detail = "2 programe";
              }
              currentToolStep = stream.addStep(
                `<span class="step-icon">\u{1F50D}</span> <strong>${escapeHtml(label)}</strong> <span class="step-detail">${escapeHtml(detail)}</span> <span class="step-spinner"></span>`
              );
              break;
            }

            case "tool_result":
              if (currentToolStep) {
                const label = TOOL_LABELS[event.name] || event.name;
                stream.updateStep(
                  currentToolStep,
                  `<span class="step-icon">\u2705</span> <strong>${escapeHtml(label)}</strong> <span class="step-summary">${escapeHtml(event.summary)}</span>`
                );
                currentToolStep = null;
              }
              break;

            case "reply":
              stream.setReply(event.text);
              break;

            case "error":
              stream.setReply(`Eroare: ${event.text}`);
              break;

            case "done":
              break;
          }
        }
      }

      removeTyping();
    } catch {
      stream.remove();
      addMessage("bot", "Nu ma pot conecta la server. Porniti backend-ul cu `npm run serve`.");
    }

    sending = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }

  // Welcome message
  addMessage("bot", WELCOME_MESSAGE);

  sendBtn.addEventListener("click", () => send(inputEl.value));

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(inputEl.value);
    }
  });

  inputEl.addEventListener("input", () => {
    inputEl.style.height = "auto";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + "px";
  });

  quickActionsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".quick-action");
    if (btn) send(btn.dataset.msg);
  });

  inputEl.focus();
}

createApp();
