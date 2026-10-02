# EverTale

EverTale is an interactive storytelling prototype for creating personalized birthday chapters, playful wish readings, and browser-local keepsakes.

> **Prototype status:** EverTale is a demonstration, not a production service. It does not currently provide real authentication, payments, encrypted cloud storage, compliance certification, or redeemable gift vouchers.

## What you can explore

- Create a personalized birthday chapter with Zephyr, the Wish Weaver.
- Generate a themed genie-wish response.
- Explore the Lotus Garden, Cosmic Observatory, Grimoire, and art gallery.
- Save chapters, wishes, and a local profile in the current browser.
- Run with Gemini-generated text when an API key is configured, or use built-in fallback responses without a key.

## Quick start

### Requirements

- Node.js 20 or newer
- npm

### Install and run

```bash
git clone <repository-url>
cd everTale
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app works without a Gemini key by returning local fallback story content. To enable Gemini-backed generation, set the following value in `.env`:

```dotenv
GEMINI_API_KEY=your_api_key_here
```

Do not commit `.env` or expose an API key in client-side code.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Express server with Vite development middleware. |
| `npm run lint` | Run the TypeScript compiler as a static check. |
| `npm run build` | Build the browser app and bundled production server. |
| `npm start` | Run the previously built production server. |
| `npm run preview` | Preview the Vite client build. |
| `npm run clean` | Remove generated build output. |

For a production-mode local check:

```bash
npm run build
NODE_ENV=production npm start
```

Set `PORT` to override the default port of `3000`.

## How it is organized

```text
.
├── server.ts                         # Express server and generation endpoints
├── src/
│   ├── App.tsx                       # Application state and primary navigation
│   ├── components/                   # Interactive EverTale experiences
│   ├── types.ts                      # Shared client-side data types
│   ├── utils/audio.ts                # Generated ambient audio and chimes
│   └── index.css                     # Tailwind import and global accessibility styles
├── index.html                        # Vite document entry point
├── vite.config.ts                    # Vite, React, and Tailwind configuration
└── package.json                      # Scripts and dependencies
```

The browser calls three JSON endpoints:

| Endpoint | Purpose |
| --- | --- |
| `POST /api/evertale-chapter` | Generate a birthday story chapter. |
| `POST /api/genie-wish` | Generate a themed wish response. |
| `POST /api/cosmic-reading` | Generate a cosmic-orb reading. |
| `GET /api/health` | Report server health and whether an AI key is configured. |

## Data and privacy boundaries

Please use fictional or minimal personal details while evaluating the prototype.

- **Browser storage:** saved profiles, wishes, and chapters use `localStorage` on the current device. They are not protected by a server-side account system.
- **AI requests:** when `GEMINI_API_KEY` is configured, text entered into generation forms may be sent to the configured Google Gemini service through the server.
- **No AI key:** when no key is configured, the server returns built-in fallback content.
- **Clearing data:** use the browser's site-data controls to remove locally saved EverTale content.
- **Not implemented:** photo upload and shredding, cloud vaults, encryption-at-rest guarantees, parental-consent workflows, subscriptions, payment processing, and production authentication.

These statements describe the behavior encoded in the current repository (**E2: source-inspectable and reproducible locally**). They are not a legal compliance assessment or a production security guarantee.

## Verification

Run the checks used for the current prototype:

```bash
npm run lint
npm run build
```

After starting the built server, a basic health check is available at:

```bash
curl http://localhost:3000/api/health
```

Expected shape:

```json
{"ok":true,"aiConfigured":false}
```

The `aiConfigured` value changes to `true` when `GEMINI_API_KEY` is present. This endpoint confirms configuration state only; it does not prove that an external AI request will succeed.

## Current limitations and next decisions

Before treating EverTale as a deployable family product, the project still needs independently reviewed decisions and tests for:

1. A real identity, authorization, session, and account-recovery design.
2. A documented child-data and parental-consent model.
3. Provider retention settings and an explicit data-deletion workflow.
4. Abuse controls, rate limiting, content moderation, and generation timeouts.
5. Persistent storage with tested access control, export, deletion, and recovery behavior.
6. Payment and voucher systems backed by a real transaction record.
7. Automated endpoint, component, accessibility, and browser tests.
8. Deployment monitoring, incident response, dependency updates, and backup restoration tests.

## Authorship

EverTale is part of Stephen Paul Primeaux Jr.'s creative work. Repository documentation and implementation assistance may include AI-drafted contributions; those contributions do not transfer authorship of the underlying project concept.

