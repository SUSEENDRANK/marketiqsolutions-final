# Marketiq — React (Vite)

Development quickstart:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Customize theme tokens in `src/index.css`:

```
:root {
  --color-bg: #0a0a0a;
  --color-text: #ffffff;
  --color-accent: #ffd100; /* change to your brand accent */
}
```

Replace the logo:

- Put your file at `src/assets/logo-placeholder.svg` or swap to `logo.svg`.
- Update import path in `src/App.jsx` if the file name changes.

Multi‑lingual support uses Google Translate API. Set your key in `.env.local` as:

```
VITE_GOOGLE_TRANSLATE_KEY=YOUR_API_KEY
```
