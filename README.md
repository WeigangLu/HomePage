# Academic Homepage (Config-Driven)

This is a single-page academic homepage modeled after a modern academic style, but fully driven by a single config file so you can update content quickly.

## Quick Start (Local Preview)

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

> Note: the page loads `data/site.json` using `fetch`, so it needs a local server (opening `index.html` directly may block file loading).

## Where to Edit

All content lives in:

- `data/site.json`

### Common edits

1) **Change name, title, affiliation, links**

Edit `hero` in `data/site.json`.

2) **Update bio and research interests**

Edit `about.intro` and `about.interests`.

3) **Add news**

Add objects to the `news` array:

```json
{
  "date": "2025-08-12",
  "content": "Our paper was accepted to AAAI 2026."
}
```

4) **Add publications**

Add items to `publications.published` or `publications.submitted`:

```json
{
  "title": "Paper Title",
  "authors": "First Author, Second Author, Weigang Lu",
  "venue": "Conference / Journal",
  "year": "2026",
  "notes": "Oral",
  "image": "images/paper-placeholder.svg",
  "url": "https://arxiv.org/abs/xxxx.xxxxx"
}
```

Place your model figure in `images/` and point `image` to it.

5) **Add honors**

Edit the `honors` lists (date first, then title):

```json
\"honors\": {
  \"zh\": [{\"date\": \"2025\", \"title\": \"奖项名称\"}],
  \"en\": [{\"date\": \"2025\", \"title\": \"Award Title\"}]
}
```

6) **Edit education and services**

- `education` list controls the education section.
- `services` list controls reviewer/service items.

Each education entry can include an `image` field (thumbnail). Place the image in `images/` and set:

```json
\"image\": \"images/your-school.png\"
```

7) **Change photo**

Replace the image at:

- `images/you.jpg`

If you use another filename, update `hero.avatar` in `data/site.json`.

## Visual Theme

You can adjust colors and typography in:

- `assets/css/style.css`

Start at the `:root` section to change the color palette.

## Deployment (GitHub Pages)

1) Create a new GitHub repo and push this folder.
2) In repo settings, enable **GitHub Pages** and set the source to the main branch.
3) Your homepage will be available at the GitHub Pages URL.

## Optional: Add a PDF CV

If you want a CV link, add a link entry in `hero.links`:

```json
{
  "label": {"en": "CV", "zh": "简历"},
  "url": "WeigangLu_CV.pdf",
  "icon": "fa-file-pdf"
}
```

Then place the PDF at the project root as `WeigangLu_CV.pdf`.

---

If you want to change or add new sections, tell me and I can extend the config schema.
