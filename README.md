# Alexander D'Amore | AI Strategy Partner

Static, responsive consulting website built for GitHub Pages.

## Local preview

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Contact form connection

The custom contact page is ready to post to Google Forms through a hidden iframe. Create the new Form using the field schema in `docs/FORM_SETUP.md`, then replace the placeholder endpoint and `entry.*` identifiers in `assets/js/config.js`.

Until it is connected, the contact page gives a clear setup notice and does not pretend that a submission was received. No private contact address or credentials should be committed to this public repository.

## Deployment

GitHub Pages publishes the repository root through the included Actions workflow.
