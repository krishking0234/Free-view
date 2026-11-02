# Toolora – All-in-One Online Tools

Toolora is a polished, browser-first collection of utilities for images, text, developer workflows, and everyday calculations. This repository intentionally uses a dependency-free static architecture so it can be deployed to any static host or opened locally without a build step.

## Included in this release

### Browser-native tools

- Image compressor with batch files, format selection, quality control, progress, and individual downloads.
- Image resizer with pixel/percentage sizing, aspect-ratio locking, preview, and download.
- JPG → PNG, PNG → JPG, and WebP conversion with batch processing.
- Carved Wooden Dragon Head generator with editable wood tone, carving detail, inscription, SVG output, and PNG output.
- Word counter with words, characters, sentences, and reading-time metrics.
- Case converter and duplicate-line remover.
- UTF-8-safe Base64 encoder/decoder.
- JSON formatter, validator, and minifier.
- URL encoder/decoder.
- HEX/RGB/HSL color converter.
- UUID v4 generator.
- Percentage and aspect-ratio calculators.

### PDF tools

- Split PDF by page ranges or one page per output.
- JPG/PNG to PDF, including the existing Image to PDF entry point.
- PDF to JPG and PDF to PNG, with page selection and render scale.
- Rotate PDF pages.
- Delete PDF pages.
- Add visible text watermarks.
- Add visible typed signatures.
- PDF Compressor, Word to PDF, Excel to PDF, Protect PDF, and Unlock PDF are listed with honest unavailable states because they require specialized server-side engines or PDF encryption support.

### Product surface

- Premium responsive Toolora shell with compact sticky navigation, tools/PDF/image dropdowns, profile access, theme control, sign-in boundaries, structured footer groups, and mobile drawer navigation.
- Redesign homepage with a focused hero, 6-tool popular section, category workspaces, conditional recent tools, benefits, FAQ, and footer.
- Searchable `/tools` directory with categories and sorting.
- Sidebar-style tool navigation on `/tools` without forcing a sidebar onto public pages.
- Consistent breadcrumbs and tool page layout.
- Light/dark mode, six accent color themes, mobile navigation, local recent-tool tracking, and local profile preferences.
- Privacy, terms, about, and contact pages.
- Honest unavailable states for PDF/document tools that require a specialized conversion service.
- PDF processing pages load `pdf-lib` and `pdf.js` from CDN scripts in `index.html`; production deployments should pin, self-host, or review these dependencies before shipping.

### Calculator hub

- Dedicated `/calculators` directory with ten categories, search, category filters, popular calculators, recently used calculators, favorites, and sorting.
- Individual calculator pages with formulas, worked examples, step-by-step output, copy/share actions, and downloadable text reports.
- Safe Basic and Scientific calculators use a recursive-descent parser; user expressions are never passed to `eval()` or `Function()`.
- Financial calculators default to INR formatting. SIP and currency results are labeled estimates or user-rate conversions where applicable.
- Formula smoke tests are available at `/calculator-tests.html`.
- Dragon artwork smoke tests are available at `/dragon-head-tests.html` and can also run with `node dragon-head-tests.js`.

## Run locally

No Node.js runtime is required. Use any static file server. If Python is available:

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

On Windows PowerShell, the included dependency-free server can be started with:

```powershell
.\serve.ps1
```

Then open `http://localhost:4173`.

You can also open `index.html` directly, but a local server is recommended because browser file APIs and hash navigation behave more consistently over HTTP.

## Deploy

Upload `index.html`, `styles.css`, `app.js`, `calculators.js`, `calculator-tests.html`, `robots.txt`, and `sitemap.xml` to any static host such as Netlify, Vercel static hosting, GitHub Pages, Cloudflare Pages, or an object-storage website bucket. No environment variables are needed for the browser-native release.

## Security and privacy notes

- Image and text processing is local to the browser.
- Inputs are validated by MIME type and browser decoding before image processing.
- Toolora does not write user files to disk or send them to an API in this release.
- Local storage contains only profile name/avatar/appearance, theme, newsletter, and recently used tool preferences.
- PDF page editing, image conversion, watermarking, and visible signing run in the browser through `pdf-lib` and `pdf.js`.
- Password encryption, unlocking encrypted PDFs, and Office document rendering are explicitly marked unavailable rather than returning simulated output.
- Calculator values, history, favorites, and recent lists are stored locally in browser storage; no registration is required.
- Authentication, dashboard, and account-settings routes remain transparent boundaries until a real server-side auth provider and session store are configured. The profile editor is a browser-local customization surface and does not claim to be a secure account system.

## Extending the product

The app is organized around a single `tools` registry and renderer functions in `app.js`. To add a tool:

1. Add an entry to `tools`.
2. Add a renderer to the `renderers` map in `renderTool`.
3. Keep processing browser-native when possible, or add a clearly disclosed server/API boundary for specialized formats.
4. Add a tool-specific error state and a real download/output path.

For production PDF, Office, authentication, rate limiting, and persistent accounts, add a backend module and document the provider, retention policy, file-size limits, and required environment variables before exposing those cards as available.
