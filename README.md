# Vitrus | AI Strategy Partner

Static, responsive consulting website built for GitHub Pages.

The interactive capability model is a lightweight inline SVG mountain range, so GitHub Pages remains a fast static deployment with no application runtime.

## Local preview

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Validate the site

```bash
npm run check
```

## Contact form connection

The custom contact page posts to the dedicated Google Form through a hidden iframe. The public endpoint and field IDs live in `assets/js/config.js`; the field schema and verification process are in `docs/FORM_SETUP.md`.

No private contact address or credentials should be committed to this public repository.

## Deployment

GitHub Pages publishes the repository root through the included Actions workflow.
