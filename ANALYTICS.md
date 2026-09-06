# VITRUS measurement setup

The site ships with a privacy-conscious event layer. It records nothing outside the visitor's browser until a supported provider is configured.

## Activate Plausible

1. Add `vitrus.org` to a Plausible account.
2. Copy the personalized script URL shown in the Plausible installation screen. Current URLs look like `https://plausible.io/js/pa-XXXXX.js`.
3. Add these GitHub Actions repository variables:

   - `NEXT_PUBLIC_ANALYTICS_PROVIDER` = `plausible`
   - `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC` = the personalized script URL

4. Run the GitHub Pages workflow again.
5. Visit the site with `?analytics_debug=1` to inspect sanitized events in the browser console.

The integration disables automatic page views and sends only the page path. Query strings and exact calculator inputs are excluded.

## Core events

- `pageview`: one sanitized view for each route
- `campaign_landing`: an approved campaign reached the site
- `solution_select`: a solution page was selected
- `solution_page_engaged`: a major solution section was viewed
- `solution_page_complete`: a solution article reached 90 percent depth
- `case_study_engaged`: a case study remained visible for three seconds
- `cta_click`: an intro-call call to action was selected
- `contact_form_start`: a visitor began using the inquiry form
- `contact_form_submit`: a submission was attempted
- `contact_form_response_loaded`: the Google Forms response page loaded
- `contact_form_timeout`: the response page did not load within 15 seconds
- `roi_calculator_start`: the calculator was changed for the first time
- `roi_calculator_update`: a debounced update using broad value bands
- `roi_result_view`: an active calculator result became visible
- `roi_methodology_open`: the methodology explanation was opened
- `outbound_link_click`: a visitor selected an external domain

Google Sheet response rows remain the source of truth for confirmed inquiries. An iframe response load does not prove that Google stored a row.

## Approved campaign labels

Campaign values are allowlisted to reduce the chance that personal information reaches analytics.

- Sources: `linkedin`, `google`, `newsletter`, `partner`, `referral`, `direct`, `organic`
- Mediums: `outbound`, `social`, `email`, `referral`, `organic`
- Campaigns: `nonprofit_copenhagen`, `nonprofit_copenhagen_q4`, `nonprofit_outreach`, `mission_driven_outreach`, `solution_outreach`, `general`
- Content: `general`, `founder_outreach_v1`, `grant_automation_v1`, `partner_intelligence_v1`, `listening_dashboard_v1`, `knowledge_systems_v1`

Example:

```text
https://vitrus.org/solutions/grant-reporting-automation/?utm_source=linkedin&utm_medium=outbound&utm_campaign=nonprofit_copenhagen&utm_content=grant_automation_v1
```

Do not put names, email addresses, company identifiers, LinkedIn IDs, or other personal information into campaign parameters.

## First dashboard

Review the funnel by campaign and solution:

1. Campaign landing
2. Solution selected or engaged
3. Case study engaged or ROI result viewed
4. Intro call selected
5. Contact form started
6. Contact form submitted
7. Confirmed inquiry in the private Google Sheet

Use confirmed inquiries and qualified calls as the success measures. Treat page depth and calculator activity as diagnostic signals, not business outcomes.
