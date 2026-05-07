# FullTuneMedia — Photography Portfolio (Hamilton, ON)

## Original problem statement
"Create a website for a beginner photographer looking to follow his dreams of connecting to people and capture stunning photos never seen before of their unique builds. I also offer portrait photos for people who want to step out of their comfort zone and show off their true potential."

## User decisions (gathered Dec 2025)
- Brand: **FullTuneMedia** · Hamilton, Ontario
- Subjects: cars/automotive, motorcycles, architecture, portraits
- Form: simple contact (name, email, message)
- Vibe: dark, cinematic, moody
- Photographer will upload his own photos via admin panel

## Personas
- Visitor / potential client (browse work, send inquiry)
- Photographer (admin uploads, manages library, reads inquiries)

## Architecture
- Backend: FastAPI, MongoDB (collections: `contacts`, `photos`)
- Frontend: React + Tailwind + shadcn/ui + sonner
- Auth: shared admin token via `X-Admin-Token` header (env: `ADMIN_TOKEN`)

## Implemented (Dec 2025)
- Editorial dark UI: Playfair Display + Oswald + Manrope, accent #FF3B30, filmic grain overlay
- One-page site with sections: Hero, Portfolio (filterable tetris grid), About, Services, Contact, Footer (marquee)
- Admin route `/admin` with token gate, photo upload (base64), library (delete), inquiries inbox
- Backend endpoints: `/api/contact` (POST public, GET admin), `/api/photos` (GET public + ?category=, POST admin, DELETE admin), `/api/admin/verify`
- Placeholder gallery shown until admin uploads
- All `data-testid`s in place; backend & frontend tests 100%

## Backlog
- P1: Email notifications on new contact (Resend integration) so the photographer hears about leads instantly
- P1: Image optimization / Cloudflare or Cloudinary CDN (move off base64 to URL-based storage)
- P2: Public Instagram embed / latest grid
- P2: Pricing pages with package selection on contact form (subject auto-fills)
- P2: SEO meta + OpenGraph + sitemap.xml; Hamilton local-SEO schema
- P3: Booking calendar with availability (Cal.com or custom)

## Next tasks
1. Replace placeholder photos with photographer's own uploads via /admin
2. Decide on email-on-inquiry integration (Resend) — needs API key
3. Custom domain + production deploy
