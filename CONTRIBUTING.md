# Updating the Python Rwanda website

Everything that changes often lives in [`content/`](content). You never need to touch the code to add an event, a photo, a partner or an organizer.

| What | File |
|---|---|
| Events | `content/events/*.md` (one file per event) |
| Links (WhatsApp, email, socials), hero text, page photos | `content/site.yaml` |
| "What we do" | `content/programs.yaml` |
| Partners & sponsors | `content/partners.yaml` |
| Organizers | `content/team.yaml` |

There are two ways to edit. Both change the same files.

---

## Option A: in the browser, no Git needed (the editor)

1. Go to **https://<site>/admin** (Chrome, Edge, Firefox or Safari; phones work too).
2. Click **Sign in with GitHub**. You need a GitHub account with write access to the repository; ask a maintainer to add you.
3. Pick **Events** or **Site** (site settings, What we do, Partners & sponsors, Organizers) in the sidebar.
4. Fill in the form and **Save**. Each save is a commit to `main`, and the site rebuilds automatically (about 1–2 minutes).

**Photos:** every image field opens a picker with two sources:
- **Cloudinary** (use this for event galleries): browse or upload straight into Cloudinary and select the photos. Full-size phone photos are fine; Cloudinary resizes them for each screen.
- **Uploads** (the repository): fine for a logo, a cover or a few photos. Keep them under 5 MB.

## Option B: with a pull request

1. Create a branch.
2. Copy an existing event in `content/events/`, rename it `YYYY-MM-DD-short-name.md`, and edit it.
3. Open a pull request. The **Check** action builds the site and tells you if anything in the file is wrong, and the host posts a preview link.
4. Merge when it looks right.

### Event file reference

```markdown
---
title: Python for Real-world Data Analysis   # required
type: Workshop                               # Bootcamp | Meetup | Conference | Workshop | Webinar | Talk
start: 2026-10-22                            # required, YYYY-MM-DD
end: 2026-10-23                              # optional, multi-day events
time: "18:00"                                # optional, Kigali time, used for the countdown
date_label: November 2026                    # optional, replaces the generated date text
where: MKU Rwanda Campus                     # required: venue, or the speaker line for online events
summary: One or two sentences for cards and link previews.   # required
rsvp: https://...                            # optional, upcoming events
cover: /media/mku/1.jpg                      # optional: /media/... path or https:// URL
cover_alt: What the photo shows
cover_position: 50% 30%                      # optional crop focus
video: /media/video/clip.mp4                 # optional short muted loop
gallery:
  - https://res.cloudinary.com/<cloud>/image/upload/events/2026/mku/01.jpg
  - /media/mku/PXL_20261022_093627801.jpg
speakers:
  - name: Jane Doe
    role: Data scientist, Example Ltd
links:
  - label: Slides
    url: https://...
glyph: import pandas                         # text on the generated artwork when there is no photo
---
Write-up in Markdown. Paragraphs, **bold**, [links](https://...) all work.
```

- The **file name** becomes the URL: `2026-10-22-mku-data-analysis.md` → `/events/2026-10-22-mku-data-analysis`.
- **Upcoming vs past is automatic.** An event is "upcoming" until its `start` (or `end`) date has passed in Kigali time. The site rebuilds every night, so no one has to move events by hand.
- The first upcoming event becomes the big **Next up** panel with a countdown.

---

## Photos and videos

You can use either:

- **Files in this repo**: put them in `public/media/...` and reference them as `/media/...`. Simple, and fine for a few photos per event.
- **Cloudinary (recommended for galleries)**: pick or upload photos from the editor's Cloudinary tab, or upload in the Cloudinary dashboard (one folder per event) and paste the `https://res.cloudinary.com/...` URLs into the file. Cloudinary resizes and compresses them automatically for each screen.

Videos: keep long videos on Instagram or YouTube and add them as a link. Only short background loops (a few MB) should be stored as files.

---

## Running the site locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # also validates every file in content/
```

If a content file has a mistake, the build stops with a message like:

```
Invalid content in content/events/2026-10-22-mku.md:
✖ must be a date like 2026-10-22
  → at start
```

## One-time setup (maintainers)

1. **Host on Vercel** (free): import the GitHub repo. Every push to `main` deploys, every PR gets a preview link.
2. **Nightly rebuild**: in Vercel → Project → Settings → Git → *Deploy Hooks*, create a hook, then add its URL to GitHub → Settings → Secrets → Actions as `DEPLOY_HOOK_URL`.
3. **Site URL**: set `NEXT_PUBLIC_SITE_URL` (e.g. `https://pythonrwanda.org`) in Vercel's environment variables so link previews use the real domain.
4. **Editor (Sveltia CMS)**: lives in `public/admin/`. In `public/admin/config.yml`, set `backend.repo` to the GitHub repository.
   - *Sign in with GitHub*: deploy the free [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) on Cloudflare Workers (it walks you through creating a GitHub OAuth app), then set `backend.base_url` to the Worker URL.
   - Until then, editors can use *Sign in with Token* with a GitHub personal access token (Contents: read and write on this repo).
   - Editors need write access to the repository (GitHub → Settings → Collaborators, or an organization team).
5. **Cloudinary**: create a free account under a shared organizers' email. In Settings → API Keys, copy the cloud name and API key into the `cloudinary` block of `public/admin/config.yml` and uncomment it. The API key is public-safe; **never commit the API secret**. Add organizers as Cloudinary users so they can upload from the editor.
6. **Try the editor locally**: run `npm run dev`, open http://localhost:3000/admin in Chrome or Edge, click *Work with Local Repository* and pick this folder. Changes are written to your files, not GitHub.

> Saving from the editor rewrites YAML files, so `# comments` in `content/*.yaml` may be removed. Keep explanations here rather than in the content files.
