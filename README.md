# CA Coast Trip Ledger

Trip expense ledger for the May 2026 California coast trip.

**Live**: https://jimzenn.github.io/ca-1-trip-ledger/

## Local development

```bash
npm install
npm run dev
```

## Build & preview

```bash
npm run build
npm run preview
```

## Deploy

Push to `main`. The GitHub Actions workflow at `.github/workflows/deploy.yml`
builds with Vite and deploys to GitHub Pages automatically.

One-time setup in the repo on GitHub: **Settings → Pages → Source: GitHub Actions**.

## Project structure

- `src/data.js` — hard-coded transactions and participants
- `src/settle.js` — totals + greedy debt simplification
- `src/App.jsx` — top-level layout, tab state, filtering, sorting
- `src/components/` — `FilterBar`, `TransactionList`, `PersonDetail`, `SettleSummary`
