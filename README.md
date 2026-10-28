# Pocket Frontend

Web client for Pocket, a personal task and time-tracking app. Built with React, TypeScript, React Router, and Tailwind CSS.

## Features

- Registration with email verification
- Login and protected routes
- Task blocks with time tracking and targets
- Notes for each task
- Statistics with weekly, monthly and yearly views and charts

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- Recharts (statistics charts)

## Project Structure

```
frontend/
├── src/
│   ├── api/           # Request client and API functions
│   ├── assets/        # Images and static files
│   ├── components/    # Reusable UI (DatePicker, ProgressBar, BlockForm)
│   ├── features/      # Feature modules (auth, blocks, sidebar, statistics)
│   ├── pages/         # Route pages (Login, Register, Verify, Modal, Statistic)
│   ├── types/         # Shared TypeScript types
│   ├── utils/         # Helpers
│   └── main.tsx
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- The backend running on `http://localhost:8000`

### Installation

```bash
cd frontend
npm install
```

### Running

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

### Building

```bash
npm run build
npm run preview
```

## Routes

| Path | Page | Access |
|---|---|---|
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/verify-email` | Email verification result | Public |
| `/pocket` | Daily task blocks | Authenticated |
| `/statistics` | Statistics | Authenticated |

## Authentication

After login, the backend returns a JWT. It is stored on the client and sent with each authenticated request. Logging out removes the token and redirects to `/login`.