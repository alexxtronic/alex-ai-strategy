# Lithic | AI Strategy Partner

Static, responsive consulting website built for GitHub Pages.

The interactive capability model is built with React Three Fiber and committed as a browser-ready bundle, so GitHub Pages remains a static deployment.

## Local preview

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Rebuild the 3D experience

```bash
npm install
npm run build:3d
```

## Contact form connection

The custom contact page posts to the dedicated Google Form through a hidden iframe. The public endpoint and field IDs live in `assets/js/config.js`; the field schema and verification process are in `docs/FORM_SETUP.md`.

No private contact address or credentials should be committed to this public repository.

## Deployment

GitHub Pages publishes the repository root through the included Actions workflow.
