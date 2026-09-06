# VITRUS website

The public website for [vitrus.org](https://vitrus.org), an AI strategy and implementation consultancy for established mission-driven organizations.

## Positioning

VITRUS builds governed AI systems that return capacity to nonprofits, NGOs, foundations, and associations. The site leads with a Free Intro Call and four focused solution areas:

- Grant and reporting automation
- Fundraising and partner intelligence
- Live listening and decision dashboards
- Secure organizational knowledge

## Stack

- Next.js 16 with static export
- React 19
- Motion for restrained, reduced-motion-aware animation
- GitHub Pages at `vitrus.org`
- Google Forms for inquiry intake
- Optional Plausible analytics

## Local development

Node.js 22.13 or newer is required.

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm test
```

`npm test` creates the production export and checks the rendered routes, metadata, structured data, navigation, solution content, analytics privacy boundaries, and the no-em-dash rule.

## Publishing

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` validates the site and publishes `out/` when `main` changes. The custom domain is declared in `public/CNAME`.

## Analytics

The site remains measurement-free until a provider is configured. See [ANALYTICS.md](./ANALYTICS.md) for the event taxonomy, privacy rules, approved campaign labels, and Plausible activation steps.

## Inquiry form

The branded contact page submits to an owner-controlled Google Form through a hidden iframe. The private Google Sheet is the source of truth for confirmed responses. Do not add confidential, regulated, or sensitive personal information to test submissions.
