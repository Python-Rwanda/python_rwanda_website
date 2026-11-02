# Python Rwanda website

The website of [Python Rwanda](https://www.linkedin.com/company/python-rwanda/), the community of Python developers, students and researchers in Rwanda: events, programs, partners and how to get involved.

Built with [Next.js](https://nextjs.org) and content stored as plain Markdown/YAML files, so organizers can update the site from a browser without touching code.

## Updating content

Most changes (events, photos, links, partners, organizers) don't need code:

- **In the browser:** open `/admin` on the live site and sign in with GitHub (needs write access to this repository).
- **With a pull request:** edit the files in [`content/`](content).

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for both, including the event file reference and how photos work.

## Development

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build; also validates every file in `content/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run check` | All of the above, as run in CI |

Optional environment variables are listed in [`.env.example`](.env.example).

## Project structure

```
content/              Everything editors change
  events/*.md           one file per event (front matter + write-up)
  site.yaml             links, home page text, page photos
  programs.yaml         "What we do"
  partners.yaml         partners & sponsors
  team.yaml             organizers
public/
  admin/                content editor (Sveltia CMS) served at /admin
  media/                images and videos stored in the repository
src/
  app/                  pages: /, /events, /events/[slug], /about, /get-involved, /sponsors, /code-of-conduct
  components/           UI components
  lib/content.ts        loads and validates content/ at build time (zod)
.github/workflows/    CI check on every PR, nightly rebuild
```

**How it works**

- Pages are statically generated from `content/` at build time. Invalid content fails the build with a message naming the file and field.
- Events are split into upcoming and past by date (Kigali time). A nightly rebuild keeps that current without anyone moving files.
- Images can be local (`/media/...`) or [Cloudinary](https://cloudinary.com) URLs. Cloudinary images are resized by Cloudinary (see `src/components/Img.tsx`), local ones by Next.js.

## Deployment

Designed for [Vercel](https://vercel.com) (free tier); any host that runs Next.js works. One-time setup (hosting, nightly rebuild, editor sign-in, Cloudinary) is described in [CONTRIBUTING.md → One-time setup](CONTRIBUTING.md#one-time-setup-maintainers).

## License

Source code: [MIT](LICENSE). Photos, logos and written content belong to Python Rwanda and the people pictured, and are not licensed for reuse.
