# FAA Guide — Asistent AI pentru Facultatea de Administrație și Afaceri

Agent conversational care ghidează studenții, candidații și vizitatorii prin site-ul [faa.ro](https://www.faa.ro/) și [unibuc.ro](https://unibuc.ro/).

Descarcă și citește **orarele PDF**, extrage **tematica de examen din documente Word**, caută **profesori** și accesează **orice pagină** de pe site — totul în timp real, cu vizualizare pas cu pas în browser.

---

## Arhitectura

```
┌─────────────────────────────────────────────────────────┐
│                      BROWSER                            │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Vite Frontend (port 5173)             │  │
│  │                                                   │  │
│  │  ┌─────────┐  ┌──────────┐  ┌─────────────────┐  │  │
│  │  │ Chat UI │  │ Tool     │  │ Markdown        │  │  │
│  │  │ + SSE   │  │ Steps    │  │ (marked +       │  │  │
│  │  │ Stream  │  │ Display  │  │  DOMPurify)     │  │  │
│  │  └────┬────┘  └──────────┘  └─────────────────┘  │  │
│  └───────┼───────────────────────────────────────────┘  │
│          │ SSE (Server-Sent Events)                     │
└──────────┼──────────────────────────────────────────────┘
           │
┌──────────▼──────────────────────────────────────────────┐
│                   Node.js Backend (port 3000)           │
│                                                         │
│  ┌─────────────┐    ┌──────────────────────────────┐    │
│  │  server.js   │    │         agent.js              │    │
│  │  SSE Stream  │───▶│  Claude Haiku 4.5             │    │
│  │  Sessions    │    │  Tool-use loop (max 5)        │    │
│  └─────────────┘    └──────────┬───────────────────┘    │
│                                │                         │
│  ┌─────────────────────────────▼───────────────────┐    │
│  │                   tools.js                       │    │
│  │                                                  │    │
│  │  ┌──────────────┐  ┌─────────────────────────┐   │    │
│  │  │ get_schedule  │  │ search_schedule          │   │    │
│  │  │ PDF per       │  │ Caută profesor           │   │    │
│  │  │ program+an    │  │ în toate PDF-urile       │   │    │
│  │  └──────┬───────┘  └────────┬────────────────┘   │    │
│  │         │                   │                     │    │
│  │  ┌──────▼───────┐  ┌───────▼─────────────────┐   │    │
│  │  │ fetch_page   │  │ get_drive_doc            │   │    │
│  │  │ faa.ro /     │  │ PDF + DOCX din           │   │    │
│  │  │ unibuc.ro    │  │ Google Drive             │   │    │
│  │  └──────────────┘  └─────────────────────────┘   │    │
│  │  ┌──────────────┐  ┌─────────────────────────┐   │    │
│  │  │ search_site  │  │ compare_programs         │   │    │
│  │  │ Crawl 10     │  │ Compară 2 programe       │   │    │
│  │  │ pagini cheie │  │ side-by-side             │   │    │
│  │  └──────────────┘  └─────────────────────────┘   │    │
│  └──────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────┐    ┌──────────────────────────────┐    │
│  │  drive.js    │    │       knowledge.js            │    │
│  │  List folder │    │  Site map, profesori (65),    │    │
│  │  Download    │    │  programe, orare, examene,    │    │
│  │  Cache       │    │  rute ascunse, contact        │    │
│  └─────────────┘    └──────────────────────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
           │                    │
           ▼                    ▼
   ┌──────────────┐    ┌──────────────┐
   │  Google Drive │    │   faa.ro /   │
   │  Orare PDF    │    │  unibuc.ro   │
   │  Tematica     │    │  Pagini web  │
   │  Regulamente  │    │              │
   └──────────────┘    └──────────────┘
```

---

## Instrumente (Tools)

Agentul are **6 instrumente** pe care le folosește automat:

```
                    Întrebarea utilizatorului
                              │
                              ▼
                 ┌────────────────────────┐
                 │   Ce tip de întrebare? │
                 └────────────┬───────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
  │  "Ce orar am  │  │ "Ce ore are   │  │  "Cum mă      │
  │   marți?"     │  │  prof. X?"    │  │   înscriu?"   │
  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘
          │                   │                   │
          ▼                   ▼                   ▼
  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
  │ get_schedule  │  │search_schedule│  │  fetch_page   │
  │               │  │               │  │               │
  │ Descarcă PDF  │  │ Caută în      │  │ Citește       │
  │ specific:     │  │ toate PDF-    │  │ pagina de     │
  │ CE3, sem2     │  │ urile din     │  │ pe faa.ro     │
  │               │  │ Drive         │  │               │
  │ ~2.5s         │  │ ~6s           │  │ ~0.5s         │
  └───────────────┘  └───────────────┘  └───────────────┘

          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
  │ "Pe ce materii│  │ "Voluntariat" │  │  "AA vs MK?"  │
  │  e examenul?" │  │ "Erasmus"     │  │               │
  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘
          │                   │                   │
          ▼                   ▼                   ▼
  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
  │ get_drive_doc │  │  search_site  │  │compare_programs│
  │               │  │               │  │               │
  │ Descarcă DOCX │  │ Crawl 10     │  │ Fetch ambele  │
  │ din Drive,    │  │ pagini cheie │  │ paginile de   │
  │ extrage text  │  │ de pe faa.ro │  │ program,      │
  │ (adm-zip)     │  │ în paralel   │  │ side-by-side  │
  │               │  │               │  │               │
  │ ~2.5s         │  │ ~1s           │  │ ~1s           │
  └───────────────┘  └───────────────┘  └───────────────┘
```

---

## Baza de cunoștințe

Agentul cunoaște **din start** (fără tool call):

| Categorie | Detalii |
|-----------|---------|
| **Programe licență** | 7 programe, 825 locuri, taxe, calendar admitere 2026 |
| **Programe master** | 16 programe, 4 domenii |
| **Programe doctorat** | 2 școli doctorale |
| **Programe postuniversitare** | 4 programe |
| **Profesori** | 65 cadre didactice, 3 departamente + emeriți, URL profil individual |
| **Orare** | Structura completă Google Drive: 105+ PDF-uri, abrevieri program |
| **Examene** | Calendar licență 2026, tematici per program, formulare, ghiduri |
| **Rute ascunse** | 30+ pagini care nu apar în navigarea principală |
| **Contact** | Adrese, telefoane, email, program cu publicul, cont bancar |
| **Servicii** | MOPAS, Moodle, Office 365, Erasmus, burse, cămin, tabere |

---

## Instalare

### Cerințe
- **Node.js** >= 18
- **Cheie API Anthropic** ([console.anthropic.com](https://console.anthropic.com/))

### Pași

```bash
# 1. Clonează
git clone <repo-url>
cd faa-agent

# 2. Instalează dependențe
npm install
cd frontend && npm install && cd ..

# 3. Configurează cheia API
cp .env.example .env
# Editează .env și adaugă ANTHROPIC_API_KEY=sk-ant-...

# 4. Pornește (backend + frontend)
npm run dev
# Backend: http://localhost:3000
# Frontend: http://localhost:5173
```

---

## Utilizare

### Modul web (recomandat)

```bash
npm run dev
# Deschide http://localhost:5173
```

Interfața oferă:
- **Chat** cu mesaje formatate (Markdown complet)
- **Quick actions** — butoane rapide pentru întrebări frecvente
- **Tool steps live** — vezi în timp real ce face agentul:
  - `🔍 Descarc orarul PDF CE3 — Sem. II` cu spinner
  - `✅ Descarc orarul PDF — 45 lines of data retrieved`
- **Dark mode** automat

### Modul CLI

```bash
npm start
# Interfață text interactivă în terminal
```

### Modul API

```bash
npm run serve
# POST http://localhost:3000/chat
# Body: { "message": "...", "sessionId": "..." }
# Response: SSE stream cu events
```

---

## Structura proiectului

```
faa-agent/
├── src/
│   ├── agent.js        # Agent Claude Haiku + tool-use loop + system prompt
│   ├── tools.js        # 6 instrumente: get_schedule, search_schedule,
│   │                   #   fetch_page, get_drive_doc, search_site,
│   │                   #   compare_programs
│   ├── knowledge.js    # Baza de cunoștințe: site map, profesori, orare,
│   │                   #   examene, rute ascunse, contact
│   ├── drive.js        # Google Drive: listare foldere, descărcare fișiere
│   ├── server.js       # Server HTTP cu SSE streaming
│   └── index.js        # CLI interactiv
│
├── frontend/
│   ├── src/
│   │   ├── main.js     # Chat UI cu SSE, tool steps, markdown
│   │   └── style.css   # Styling complet + dark mode
│   ├── index.html
│   └── vite.config.js  # Proxy /chat → backend
│
├── .claude/            # Scaffold-CLI infrastructure
│   ├── governance.md   # Reguli proiect, gates, securitate
│   ├── hooks/          # drift-detector, circuit-breaker, sandbox-guard
│   ├── agents/         # test-runner, security-reviewer
│   └── skills/         # pre-start-context, post-start-validation
│
├── .env                # ANTHROPIC_API_KEY (gitignored)
├── .env.example
└── package.json
```

---

## Fluxul unei conversații

```
Utilizator: "Sunt anul 3 la Cibernetică.
             Ce am marți în semestrul 2?"
                    │
                    ▼
            ┌──────────────┐
            │  Claude Haiku │
            │  analizează   │
            │  întrebarea   │
            └──────┬───────┘
                   │
                   │  Tool call: get_schedule
                   │  program=CE, year=3, semester=sem2
                   ▼
            ┌──────────────┐
            │  drive.js     │
            │  Listează     │──── Google Drive API
            │  folderul     │     embeddedfolderview
            └──────┬───────┘
                   │
                   │  Găsește: "Orar sem 2 25_26 lucru - CE3.pdf"
                   ▼
            ┌──────────────┐
            │  drive.js     │
            │  Descarcă     │──── drive.google.com/uc
            │  PDF-ul       │     ?export=download
            └──────┬───────┘
                   │
                   │  Buffer: 78KB PDF
                   ▼
            ┌──────────────┐
            │  pdfjs-dist   │
            │  Extrage text │
            │  din PDF      │
            └──────┬───────┘
                   │
                   │  Text: "Marți 08-09 PB808 Lab
                   │  Metodologia elaborării lucrării
                   │  de licență Roșu Magdalena..."
                   ▼
            ┌──────────────┐
            │  Claude Haiku │
            │  Formatează   │
            │  răspunsul    │
            └──────┬───────┘
                   │
                   ▼
            Răspuns cu orarul complet
            pentru marți, cu ore, săli
            și profesori
```

---

## Exemple de întrebări

| Întrebare | Tool folosit | Ce face |
|-----------|-------------|---------|
| Ce orar am marți? (anul 3, CE) | `get_schedule` | Descarcă CE3.pdf, extrage marți |
| Ce ore are prof. Oancea? | `search_schedule` | Caută "Oancea" în toate PDF-urile |
| Pe ce materii e examenul de licență? | `get_drive_doc` | Descarcă tematica DOCX din Drive |
| Cum mă înscriu la admitere? | `fetch_page` | Citește pagina de admitere |
| Ce taxe sunt? | `fetch_page` | Citește pagina de taxe |
| Cum mă înscriu la voluntariat? | `search_site` | Crawl 10 pagini, găsește link-ul |
| AA sau Marketing? | `compare_programs` | Fetch ambele, compară side-by-side |
| Cine e prof. Jula Marius? | `fetch_page` | Citește profilul profesorului |
| Când e sesiunea de examene? | `fetch_page` | Citește calendarul academic |
| Ce burse sunt disponibile? | `fetch_page` | Citește pagina de burse |

---

## Tehnologii

| Component | Tehnologie |
|-----------|-----------|
| Model AI | Claude Haiku 4.5 (Anthropic) |
| Backend | Node.js, ESM, zero framework |
| Frontend | Vite, vanilla JS |
| Markdown | marked v17 + DOMPurify |
| PDF parsing | pdfjs-dist (Mozilla PDF.js) |
| DOCX parsing | adm-zip (extrage word/document.xml) |
| Streaming | Server-Sent Events (SSE) |
| Securitate | DOMPurify (XSS), domain allowlist (fetch_page) |
| Infra | scaffold-cli (governance, hooks, agents) |

---

## Surse de date

```
  faa.ro                    Google Drive
  ──────                    ────────────
  Pagini web (HTML)         Orare (PDF) ─── 105+ fișiere
  ├── Programe              Tematici examen (DOCX)
  ├── Profesori (65)        Formulare (DOCX)
  ├── Admitere              Ghiduri (PDF)
  ├── Examene               Regulamente (PDF)
  ├── Servicii              Grupe studenți
  ├── Rute ascunse (30+)
  └── Contact

  unibuc.ro
  ─────────
  Calendar academic
  Burse
  Studenți internaționali
  Integritate academică
  Școala doctorală
```

---

## Dezvoltare

### Governance (scaffold-cli)

Proiectul folosește [scaffold-cli](https://github.com/anthropics/scaffold-cli) pentru infrastructură Claude Code:

```bash
# Verifică infrastructura
cd faa-agent
npx scaffold check    # 9/9 core files

# Gates (rulează automat)
node --check src/knowledge.js
node --check src/agent.js
node --check src/index.js
node --check src/server.js
```

### Adăugarea unui tool nou

1. Adaugă definiția în `TOOL_DEFINITIONS` din `src/tools.js`
2. Adaugă implementarea funcției
3. Adaugă `case` în `executeTool()`
4. Adaugă label-ul în `TOOL_LABELS` din `frontend/src/main.js`
5. Adaugă detalii de afișare în blocul `tool_call` din frontend

### Actualizarea bazei de cunoștințe

Editează `src/knowledge.js`:
- `SITE_MAP` — URL-urile paginilor
- `PROFESSORS` — directorul profesorilor
- `SCHEDULES` — structura Google Drive pentru orare
- `EXAMS` — informații examene
- `DEEP_ROUTES` — rute ascunse

---

## Licență

Proiect intern — Facultatea de Administrație și Afaceri, Universitatea din București.
