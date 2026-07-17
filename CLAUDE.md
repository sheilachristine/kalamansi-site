# Kalamansi Site — Project Context

## Deploy Workflow

Always deploy via `npm run deploy`, never bare `wrangler deploy` or
`npx wrangler deploy`. The deploy script runs `astro build && wrangler deploy`.
Bare `wrangler deploy` skips the Astro build and silently redeploys whatever
is already in `dist/` — it reports success even when no new code was actually
built or shipped. This caused a real bug: `my_notes` code was committed and
"deployed" via bare `wrangler deploy`, but the live site kept serving a stale
build for hours with no error indicating anything was wrong.
