# Northpath Consulting website

Multi-page static site for Northpath Consulting, Inc, an AI development and consulting firm in the Atlanta, GA area. It is plain HTML, CSS, and one small JavaScript file for the mobile navigation. There is no build step, no framework, no analytics, no form backend, and no API keys. The only external dependency is Google Fonts (Inter and JetBrains Mono).

## Deploying to GitHub Pages

1. Push this repository to GitHub with `main` as the default branch.
2. In the repository, open **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or re-run the workflow from the **Actions** tab). The included
   workflow at `.github/workflows/deploy.yml` uploads the repo root and deploys it.
5. The site URL appears in the workflow summary and under **Settings > Pages**.

No other configuration is needed. `.nojekyll` is included so Pages serves the files as-is.

## The application form (Google Forms)

The Apply buttons on `careers.html` lead to `apply.html`, which links out to
the live Google Form (`https://forms.gle/SXPZX6uU8xSxwckg7`) in a new tab.

The form is linked, not embedded. It contains a resume upload, so Google forces
sign-in before the form loads, and Google's sign-in page refuses to render
inside iframes. A signed-out visitor would see a broken frame instead of the
form.

- To change the form later, update the `href` of the "Open the application
  form" button in `apply.html`.
- Responses appear in the form's Responses tab; uploaded resumes land in a
  Google Drive folder named after the form. Link a Google Sheet from the
  Responses tab for a spreadsheet view.

## The capabilities PDF

`capabilities.html` is a one-page capabilities overview with a print stylesheet
sized for US Letter. The generated PDF lives at
`assets/northpath-capabilities.pdf` and is linked from `contact.html`.

To regenerate the PDF after editing `capabilities.html`: open the page in
Chrome or Edge, print, set the destination to "Save as PDF" with default
margins and no headers or footers, and save over
`assets/northpath-capabilities.pdf`. Headless alternative:

```
msedge --headless --print-to-pdf="assets\northpath-capabilities.pdf" --no-pdf-header-footer https://<your-site>/capabilities.html
```

## Things to change

- **Email address**: `northpathconsultinginc@gmail.com` appears on
  `contact.html`, in the JSON-LD of `index.html`, in the footer of every page,
  and on `privacy.html` and `capabilities.html`. Search and replace across the
  repo to change it.
- **LinkedIn URL**: `https://www.linkedin.com/company/northpath-consultinginc`
  appears in every footer, the JSON-LD on `index.html`, and
  `capabilities.html`.
- **About text**: the About section of `index.html` has a comment
  `TODO: add team background here` marking where to add background.
- **Work entries**: keep the Selected engagements section anonymized; never
  include client, platform, or project names.
- **Canonical and social URLs**: all pages use `https://arnav183.github.io/northpath-website/`
  in canonical, Open Graph, and sitemap URLs. If you attach a custom domain
  later, search and replace that base URL across the repo (see the `NOTE:`
  comments) including `sitemap.xml` and `robots.txt`.

## Files

```
index.html                        home page (services, work, deliverables, about, process)
contact.html                      contact page (email + capabilities PDF)
careers.html                      careers page (roles + application process)
apply.html                        application page (links to the Google Form, noindex)
capabilities.html                 print-ready one-page capabilities overview
sample-task.html                  interactive walkthrough of one synthetic eval task
privacy.html                      privacy page (linked from the footer)
styles.css                        all styles; palette variables are at the top
script.js                         mobile nav toggle only
sample.js                         stepper for sample-task.html only
sitemap.xml / robots.txt          crawl configuration
assets/logo.jpg                   header logo (cropped from the original)
assets/favicon.png                favicon, tight crop of the NPC mark
assets/northpath-capabilities.pdf generated from capabilities.html
.nojekyll                         tells GitHub Pages not to run Jekyll
.github/workflows/deploy.yml      Pages deployment on push to main
```

The original uncropped logo (`39f12719-...jpg`) is not referenced by the site
and can be deleted or kept as a source file.
