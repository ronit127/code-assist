# CodeAssistor

An AI-powered code editor with Monaco Editor, Notion-inspired UI, and an OpenAI-powered analysis panel.

## Features

- Highlight code and click **Ask AI** to get:
  - Plain English explanation
  - Line-by-line breakdown (toggle)
  - Time/space complexity (Big-O)
  - Detected algorithms and patterns
  - Error/code smell diagnosis
  - Relevant Stack Overflow and documentation links
- Dark/light mode toggle (persisted to localStorage)
- Supports JavaScript, TypeScript, Python, Java, C++, Rust, Go
- Collapsible AI panel with smooth slide-in animation
- Notion-inspired minimal UI

## Project Structure

```
CodeAssistor/
├── frontend/    - React + Vite + TailwindCSS + Monaco Editor
└── backend/     - Node.js + Express + OpenAI API
```

## Setup

### Prerequisites

- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and fill in your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3001
ALLOWED_ORIGIN=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
```

## Running Locally

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# → CodeAssistor backend running on port 3001
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# → Local: http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Testing the API

```bash
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d "{\"code\": \"function add(a, b) { return a + b; }\", \"language\": \"javascript\"}"
```

## API Contract

**POST** `/api/analyze`

Request:
```json
{
  "code": "string (required, max 10000 chars)",
  "language": "string (required)",
  "question": "string (optional)"
}
```

Response:
```json
{
  "explanation": "string",
  "lineByLine": [{ "lineNumber": 1, "code": "...", "explanation": "..." }],
  "complexity": { "time": "O(n) - ...", "space": "O(1) - ..." },
  "detectedPatterns": ["Binary Search"],
  "errors": [{ "lineNumber": 3, "description": "...", "suggestion": "..." }],
  "relatedLinks": [{ "title": "...", "url": "https://...", "type": "stackoverflow|documentation" }]
}
```

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `OPENAI_API_KEY` | `backend/.env` | Your OpenAI API key |
| `PORT` | `backend/.env` | Backend port (default: 3001) |
| `ALLOWED_ORIGIN` | `backend/.env` | Frontend origin for CORS |

## Tech Stack

- **Frontend:** React 18, Vite, TailwindCSS, `@monaco-editor/react`
- **Backend:** Node.js, Express, OpenAI SDK (`gpt-4o-mini`)
