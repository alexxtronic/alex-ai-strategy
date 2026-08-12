# Google Form setup

Updated: 2026-08-12

The Work with me page is designed to post directly into a standard Google Form without exposing credentials. The Form remains the intake source of truth and may link responses to a private Google Sheet.

## Create the Form

Create a Google Form titled **Alexander D'Amore | Work with me** with these questions in this exact order:

| Key | Question | Type | Required |
|---|---|---|---|
| `fullName` | Name | Short answer | Yes |
| `email` | Email | Short answer | Yes |
| `phone` | Phone number | Short answer | Yes |
| `company` | Company name | Short answer | No |
| `title` | Title | Short answer | No |
| `helpRequest` | What do you need help with? | Paragraph | No |
| `consentRecord` | Consent record | Short answer | Yes |

Turn off quiz mode. Do not force Google sign-in or Google-native email collection because the custom page already includes an email field.

## Link responses

In the Form's **Responses** tab, create a linked Sheet named **AI Strategy Inquiries**. Restrict it to Alex and anyone directly responsible for responding to inquiries.

## Get the endpoint and entry IDs

1. Publish the Form and copy its public responder link.
2. Open **Get pre-filled link**.
3. Put an unmistakable test value in every field and generate the link.
4. Match every `entry.*` value in the URL to the corresponding key in `assets/js/config.js`.
5. Convert the public Form URL from `/viewform` to `/formResponse` for `googleFormEndpoint`.
6. Add the original `/viewform` URL as `googleFormViewUrl`.

Never copy example or unrelated entry IDs into production.

## Verify

1. Submit one complete inquiry through the website.
2. Confirm every value lands in the intended Sheet column.
3. Confirm the optional help field may be left empty.
4. Delete the test response.
5. Test desktop and mobile again after publishing.

## Security boundary

The public Form endpoint and `entry.*` field identifiers are not credentials. Do not place Google cookies, access tokens, passwords, or service-account keys in this repository. Do not collect client secrets or sensitive regulated information through this initial inquiry form.
