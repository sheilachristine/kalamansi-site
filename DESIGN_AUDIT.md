# Kalamansi Site — Design Audit

Visual/design audit of getkalamansi.com (Astro + Cloudflare Workers).
Generated 2026-07-20. No code changes made.

---

## 1. Page Inventory

| Route | Source file | Description |
|---|---|---|
| `/` | `src/pages/index.astro` | Minimal landing page — app name, tagline ("AI-powered meal logging, recipes, and nutrition insights. Coming soon to iPhone"), links to Privacy and Support. |
| `/privacy` | `src/pages/privacy.astro` | One-paragraph privacy policy stub with contact email. |
| `/support` | `src/pages/support.astro` | One-line support page with contact email. |
| `/invite/*` | `src/pages/invite/[...slug].astro` | Invite link fallback — tells users to install the app via TestFlight. Shows when the native Universal Link doesn't intercept. |
| `/kitchen/[handle]` | `src/pages/kitchen/[handle].astro` | **Kitchen page** — a user's public profile with avatar, display name, bio, recipe count, and a grid of "keeper" recipes grouped by section (Baked goods & desserts, Breakfast, Pasta, Soups, Vegetables & sides, Protein). Links each card to `/recipe/[id]`. |
| `/recipe/[id]` | `src/pages/recipe/[id].astro` | **Recipe detail page** — hero emoji, recipe title, source attribution (varies by share tier), standing note, cook notes (newest-first, expand-to-see-more), ingredient list, instructions (Tier 1 only), save CTA, source footer, and app CTA. |
| `/reset-password` | `src/pages/reset-password.astro` | JS redirect to `app.getkalamansi.com/reset-password`. No visible UI (native app intercepts via AASA). |

**Total distinct visual page types: 5** (home, privacy/support, invite, kitchen, recipe).
The privacy, support, and invite pages all share the same minimal `Layout.astro` wrapper.

---

## 2. Current Visual System

### 2.1 Design Reference (Source of Truth)

**File:** `design/colors_and_type.css`

This file documents the intended design system, with tokens imported from the native app's `constants/Colors.ts`. It defines CSS custom properties, semantic typography classes (`.k-h1`, `.k-body`, `.k-eyebrow`, etc.), and is used by the HTML mockups in `design/`.

### 2.2 Color Palette

All hex values below are drawn from the design reference and the implemented pages.

#### Surfaces
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#F0EEE9` | Page background — warm off-white "paper" |
| `--surface` | `#FFFFFF` | Cards, sheets, ingredient card bg |
| `--surface-muted` | `#F4F2EE` | Segmented controls, input fills (defined in ref, used in recipe page) |
| `--border` | `#E8E4DE` | Hairline dividers, card borders |

#### Text
| Token | Hex | Usage |
|---|---|---|
| `--fg` | `#363230` | Primary text — warm near-black |
| `--fg-muted` | `#8C8480` | Secondary — section heads, helper text, source lines |
| `--fg-faint` | `#C4BFB9` | Tertiary — placeholder, disabled, footer text |
| `--fg-on-primary` | `#FFFFFF` | Text on olive/teal fills (ref only, not yet used on site) |
| `--fg-on-teal` | `#FFFFFF` | Text on teal fills (ref only, not yet used on site) |

#### Brand
| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#6B7A2F` | Olive — source link color on recipe page |
| `--primary-press` | `#5A6727` | Darker olive for hover/press (source-footer link hover) |
| `--teal` | `#1D9E75` | Kala teal — "Original" badge text color on kitchen cards |
| `--teal-light` | `#E6F4EF` | Badge background fill |
| `--teal-press` | `#178362` | Pressed teal state (ref only, not yet used on site) |

#### Warm Card Tones
| Token | Hex | Usage |
|---|---|---|
| `--warm-card` | `#E8E3D8` | CTA sections, standing-note bg, hero-photo bg, save-cta bg |
| `--warm-chip` | `#D8D0C0` | Warm chip bg (ref only, not yet used on site) |
| `--warm-fg` | `#3A3028` | CTA heading text, CTA button bg |
| `--warm-fg-muted` | `#6A5840` | CTA subtitle text |
| `--warm-bar` | `#A08050` | Horizontal "by source" bars (ref only, not yet used on site) |

#### Status Colors (ref only, not yet used on site)
| Token | Hex | Usage |
|---|---|---|
| `--error` | `#A04832` | Rust — error hint text |
| `--success-fg` | `#4D5D20` | Olive-shifted green |
| `--success-bg` | `#E8F1D4` | Success background |

#### Accent (ref only, not yet used on site)
| Token | Hex | Usage |
|---|---|---|
| `--lemon` | `#F2E14A` | App icon, Kala avatar bg |
| `--lemon-soft` | `#FFF4B8` | Soft lemon variant |

#### One-off Colors (not in design system)
| Hex | Where | What |
|---|---|---|
| `#FAF8F4` | kitchen `[handle].astro:308` | Recipe card background (slightly warmer than `--surface`) |
| `#D7D0C5` | kitchen `[handle].astro:319` | Card border on hover |
| `#2A211B` | kitchen `[handle].astro:400` | CTA button hover bg (darker than `--warm-fg`) |
| `#555` | invite `[...slug].astro:23` | Paragraph text color |
| `#888` | invite `[...slug].astro:26` | Note text color |
| `#5C5650` | design `Kitchen.html` (mockup only) | Card note text color |

### 2.3 Typography

#### Fonts Loaded
| Font | Weights | Source | Where loaded |
|---|---|---|---|
| **Crimson Text** | 400, 600, 700 (+ italic 400, 600) | Google Fonts | kitchen page, recipe page (via `<link>` tag) |
| **Inter** | 400, 500, 600, 700 | Google Fonts | kitchen page, recipe page (via `<link>` tag) |
| **SpaceMono** | 400 | Local (`design/fonts/SpaceMono-Regular.ttf`) | design reference only — not loaded on any live page |
| **system-ui, sans-serif** | — | System | `Layout.astro` (home, privacy, support, invite pages) |

#### Font Usage by Page

**Kitchen page (`[handle].astro`)**
| Element | Font | Weight | Size (mobile) | Size (desktop) |
|---|---|---|---|---|
| Wordmark "kalamansi" | Inter | 400 | 13px | 13px |
| Name heading | Crimson Text | 600 | 26px | 56px |
| Bio | Inter | 400 | 12px | 16px |
| Stat number | Crimson Text | 600 | 24px | 24px |
| Stat label | Inter | 400 | 12px | 12px |
| Section label | Inter | 600 | 14px (desktop only) | 14px |
| Section toggle | Inter | 600 | 11px uppercase | — |
| Card source | Inter | 400 | 12px | 12px |
| Card dish name | Crimson Text | 600 | 22px | 22px |
| Badge "Original" | Inter | 600 | 11px uppercase | 11px uppercase |
| CTA heading | Crimson Text | 600 | 26px | 32px |
| CTA button | Inter | 600 | 15px | 15px |
| Footer | Inter | 400 | 12px | 12px |

**Recipe page (`[id].astro`)**
| Element | Font | Weight | Size (mobile) | Size (desktop) |
|---|---|---|---|---|
| Back link | Inter | 400 | 13px | 13px |
| Wordmark | Inter | 400 | 13px | 13px |
| Recipe title | Crimson Text | 600 | 32px | 36px |
| Source line | Inter | 400 | 13px | 13px |
| Meta (cook count) | Inter | 400 | 13px | 13px |
| Eyebrow labels | Inter | 600 | 11px uppercase | 11px uppercase |
| Adaptation text | Crimson Text italic | 400 | 21px | 24px |
| Standing note | Crimson Text italic | 400 | 21px | 24px |
| Cook note text | Crimson Text italic | 400 | 16px | 17px |
| Note date | Inter | 400 | 13px | 13px |
| Ingredient items | Inter | 400 | 15px | 15px |
| Instruction steps | Inter | 400 | 15px | 15px |
| Save CTA heading | Crimson Text | 600 | 20px | 20px |
| Save CTA body | Inter | 400 | 13px | 13px |
| Source footer link | Crimson Text italic | 400 | 20px | 20px |
| App CTA heading | Crimson Text | 600 | 32px | 40px |

**Home, Privacy, Support, Invite pages**
| Element | Font | Weight | Size |
|---|---|---|---|
| Body text | system-ui, sans-serif | 400 | browser default |
| Home h1 | system-ui, sans-serif | 700 | 48px |
| Invite h1 | system-ui, sans-serif | 700 | 36px |

### 2.4 Spacing Scale

Defined in `design/colors_and_type.css` but **not consumed via CSS variables** on the live pages. Pages use hardcoded pixel values that generally follow the 4-point rhythm:

| Design token | Value | Actually used on pages? |
|---|---|---|
| `--space-1` | 2px | No (hardcoded) |
| `--space-2` | 4px | No (hardcoded) |
| `--space-3` | 6px | No (hardcoded) |
| `--space-4` | 8px | No (hardcoded) |
| `--space-5` | 10px | No (hardcoded) |
| `--space-6` | 12px | No (hardcoded) |
| `--space-7` | 14px | No (hardcoded) |
| `--space-8` | 16px | No (hardcoded) |
| `--space-10` | 20px | Yes, via `--bleed` (alias) |
| `--space-12` | 24px | No (hardcoded) |
| `--space-16` | 32px | Yes, via `--bleed` at desktop |
| `--pad-screen-x` | 20px | No — pages use `--bleed` instead |

### 2.5 Border Radii

| Design token | Value | Used on pages? |
|---|---|---|
| `--r-sm` | 8px | No |
| `--r-md` | 10px | No |
| `--r-lg` | 12px | No |
| `--r-card` | 14px | Yes — recipe page only (via variable) |
| `--r-sheet` | 16px | No |
| `--r-card-lg` | 18px | No |
| `--r-bottom-sheet` | 16px | No |
| `--r-pill` | 999px | No — pages hardcode `999px` |

Kitchen page hardcodes `border-radius: 14px` on cards and `999px` on pills/badges instead of referencing the design tokens.

### 2.6 Shadows & Elevation

The design system defines four shadow tokens. **None are consumed via CSS variable on the live pages.** The site follows the "barely there" philosophy — surfaces use hairline borders, no box-shadows at all on the kitchen or recipe pages.

### 2.7 Responsive Breakpoints

| Breakpoint | Used by |
|---|---|
| `max-width: 759px` | Kitchen page — mobile collapsible sections |
| `min-width: 760px` | Kitchen page — desktop grid (3-col), larger avatar/name |
| `min-width: 800px` | Recipe page — desktop 2-col layout, larger fonts |

---

## 3. Component Patterns

### 3.1 Buttons

**CTA Button (pill)** — appears in kitchen CTA and recipe page (save-cta, app-cta)
- Background: `var(--warm-fg)` / `#3A3028`
- Text color: `var(--bg)` / `#F0EEE9`
- Padding: `12px 22px` (large) / `10px 18px` (small)
- Border-radius: `999px`
- Font: Inter 600, 14–15px
- Hover: bg darkens to `#2A211B` or `var(--fg)`
- Right-arrow `→` span inside
- Defined inline in each page (kitchen lines 385–400, recipe lines 411–428 and 483–500)

### 3.2 Badge

**"Original" pill badge** — kitchen card only
- Background: `var(--teal-light)` / `#E6F4EF`
- Text: `var(--teal)` / `#1D9E75`
- 11px uppercase, letter-spacing 0.6px, font-weight 600
- Padding: `2px 8px`, border-radius `999px`
- Defined: kitchen page line 337–348

### 3.3 Recipe Card

**Used on:** kitchen page only
- Background: `#FAF8F4`
- Border: `1px solid var(--border)`, radius `14px`
- Hover: border `#D7D0C5`, `translateY(-1px)`, transition `180ms ease`
- Contains: optional badge or source line, dish name (Crimson Text 600, 22px)
- No card photo on the live site (the design mockup shows emoji photo areas, but the implementation omits them)
- Defined: kitchen page lines 307–356

### 3.4 Standing Note Card

**Used on:** recipe page — displays `my_notes`
- Background: `var(--warm-card)` / `#E8E3D8`
- Radius: `var(--r-card)` / `14px`
- Padding: `24px`
- Text: Crimson Text italic, 21px → 24px desktop
- Defined: recipe page lines 275–294

### 3.5 Ingredients Card

**Used on:** recipe page sidebar
- Background: `var(--surface)` / `#FFFFFF`
- Border: `1px solid var(--border)`, radius `var(--r-card)` / `14px`
- Padding: `24px`
- Eyebrow label "What you'll need"
- List items: 15px, separated by `1px solid var(--border)` top borders
- Defined: recipe page lines 352–375

### 3.6 Save CTA Card

**Used on:** recipe page sidebar
- Background: `var(--warm-card)`, radius `var(--r-card)`
- Heading (Crimson Text 600, 20px), body (13px), pill button
- Defined: recipe page lines 392–428

### 3.7 Eyebrow Label

**Used on:** recipe page (notes, ingredients, instructions, source footer)
- Inter 600, 11px, uppercase, letter-spacing 1.5px, color `var(--fg-muted)`
- Defined: recipe page lines 251–259

### 3.8 Section Toggle (Accordion)

**Used on:** kitchen page — mobile only (`max-width: 759px`)
- Collapsed sections with chevron `⌄` that rotates 180° on open
- Label: 11px uppercase Inter 600, letter-spacing 0.8px
- Count badge next to label
- Toggled via vanilla JS `classList.toggle('open')`
- Defined: kitchen page lines 241–296 (CSS) and 521–530 (JS)

### 3.9 Hero Photo

**Used on:** recipe page
- Full-width, `aspect-ratio: 4/3` (mobile) → `16/9` (desktop, max 460px)
- Background: `#E8E3D8`
- Large emoji glyph centered at 140px → 200px, opacity 0.22, `saturate(0.7)`
- Optional "stamp" label (category / cook time) in bottom-left
- Border-radius: `16px`
- Only renders when `recipe.emoji` exists
- Defined: recipe page lines 169–200

### 3.10 Notes List with Expand

**Used on:** recipe page — older cook notes
- Newest note shown as full adaptation block
- Next 2 notes shown as date + italic text rows
- Remaining notes hidden behind a `<details>` expand ("show N more notes")
- Defined: recipe page lines 296–343

### 3.11 Source Footer

**Used on:** recipe page — conditional by tier
- Tier 2: link to original source with `↑` arrow, + disclaimer text
- Tier 3: cookbook name in Crimson Text italic
- Tier 1: attribution in Crimson Text italic
- Border-top separator, eyebrow label
- Defined: recipe page lines 430–459

### 3.12 Wordmark

**Used on:** kitchen page (top-right), recipe page (top-right nav)
- Plain text "kalamansi" in Inter 400, 13px, color `var(--fg-muted)`, letter-spacing 0.5px
- No logo image — text only

### 3.13 Avatar

**Used on:** kitchen page header
- Circle (`border-radius: 50%`), 80px mobile → 112px desktop
- Border: `1px solid var(--border)`
- Shows `<img>` if `avatar_url` exists, otherwise Crimson Text initials (28px → 38px)
- Defined: kitchen page lines 159–182

### 3.14 Layout.astro Wrapper

**Used by:** home, privacy, support, invite pages
- `system-ui, sans-serif`
- `margin: 80px auto`, `padding: 0 24px`, `line-height: 1.6`
- No color definitions, no background color
- Renders to browser-default white background

---

## 4. Design System Gaps

### 4.1 Two Completely Separate Styling Approaches

The site has a **split personality**:

- **Kitchen + Recipe pages** — fully realized custom design with the Kalamansi design system (Crimson Text + Inter, warm off-white bg, olive/teal accents, CSS custom properties).
- **Home + Privacy + Support + Invite pages** — bare-bones `system-ui` styling with zero design system tokens. White background, browser defaults, no brand fonts.

These two groups share **no CSS**. They look like completely different websites.

### 4.2 Specific Deviations from the Design Reference

| Issue | Expected (per `colors_and_type.css`) | Actual | Files |
|---|---|---|---|
| **Home page has no brand styling** | `--bg: #F0EEE9`, Crimson Text headings, Inter body | `system-ui, sans-serif`, white background, no colors | `Layout.astro`, `index.astro` |
| **Privacy/Support pages unstyled** | Should match site brand | Browser defaults, white bg, system font | `privacy.astro`, `support.astro` |
| **Invite page uses non-system colors** | `var(--fg-muted)` (#8C8480), `var(--fg-faint)` (#C4BFB9) | Hardcoded `#555` and `#888` (gray, not warm) | `invite/[...slug].astro:23,26` |
| **Card bg not a design token** | `--surface` (#FFFFFF) or `--surface-muted` (#F4F2EE) | Hardcoded `#FAF8F4` (undocumented warm-white) | `kitchen/[handle].astro:308` |
| **Card hover border not a token** | No hover border token defined | Hardcoded `#D7D0C5` | `kitchen/[handle].astro:319` |
| **Button hover bg not a token** | No button-hover token defined | Hardcoded `#2A211B` | `kitchen/[handle].astro:400` |
| **Spacing tokens not consumed** | `--space-*` variables defined | All spacing is hardcoded px values | All pages |
| **Radius tokens mostly not consumed** | `--r-card`, `--r-pill`, etc. | Only `--r-card` used (recipe page). Kitchen hardcodes `14px`, `999px` | `kitchen/[handle].astro` |
| **Shadow tokens not consumed** | `--shadow-*` variables defined | No shadows used anywhere | All pages |
| **SpaceMono font not loaded** | Referenced in `--font-mono` | Never loaded on any live page | — |
| **Semantic classes not used** | `.k-h1`, `.k-body`, `.k-eyebrow`, etc. | All styling is bespoke per-page CSS | All pages |
| **Recipe card photos absent** | Design mockups show emoji-over-colored-bg card photos | Implementation shows text-only cards (no photo area) | `kitchen/[handle].astro` |
| **Title size differs from mockup** | Design mockup: 40px mobile / 64px desktop | Implementation: 32px mobile / 36px desktop | `recipe/[id].astro:226` vs `design/Recipe.html` |

### 4.3 Missing from Implementation

- **No favicon** — no `<link rel="icon">` on any page.
- **No Open Graph / social meta tags** — no `og:image`, `og:title`, `twitter:card`, etc. Shared links on social media will look plain.
- **No 404 page** — the dynamic routes return `Response(null, { status: 404 })` with no visual error page.
- **No loading states** — SSR pages, so no skeleton/loading UI, but also no "not found" design for missing recipes/profiles.
- **No filter chips** — the design mockup (`Kitchen.html`) shows a horizontal chip row for filtering recipes by section. The implementation uses collapsible section toggles (mobile) and static headers (desktop) instead.
- **No diet tags on cards** — the design mockup shows diet-tag pills on recipe cards. Not implemented.
- **No footer on recipe page** — kitchen has a footer; recipe page has none (just the app CTA).

---

## 5. Component Reuse Analysis

### Shared Across Pages

| Component/Pattern | Kitchen page | Recipe page | Home/Privacy/Support/Invite |
|---|---|---|---|
| `Layout.astro` wrapper | No | No | Yes (all 4) |
| Wordmark "kalamansi" | Yes (top-right) | Yes (nav, top-right) | No |
| CTA button (pill) | Yes (CTA section) | Yes (save-cta + app-cta) | No |
| App CTA section | Yes ("Build your own kitchen") | Yes (identical copy) | No |
| Eyebrow label style | No | Yes (multiple) | No |
| Footer | Yes | No | No |

### One-Off Components

| Component | Only in |
|---|---|
| Avatar (circle, initials fallback) | Kitchen page |
| Section toggle / accordion (mobile) | Kitchen page |
| Recipe card grid | Kitchen page |
| Badge ("Original" pill) | Kitchen page |
| Hero photo (emoji placeholder) | Recipe page |
| Standing note card | Recipe page |
| Ingredients card | Recipe page |
| Save CTA card | Recipe page |
| Cook notes list + expand | Recipe page |
| Source footer (Tier 1/2/3 variants) | Recipe page |
| Instructions ordered list | Recipe page |
| Back link (← kitchen) | Recipe page |

### Code Duplication

The following are **duplicated between pages** rather than extracted:

1. **CSS custom properties** — the full `:root` block is copy-pasted between kitchen and recipe pages (with slight differences — recipe includes `--surface-muted`, `--primary`, `--primary-press`, `--r-card`; kitchen omits these).
2. **Google Fonts `<link>` tag** — identical in both kitchen and recipe pages.
3. **CTA section** — nearly identical HTML/CSS structure in both pages, with minor padding differences.
4. **Wordmark** — same HTML pattern, slightly different CSS class names (`.top span` vs `.wm span`).
5. **`toTitleCase()` function** — identically defined in both page frontmatter blocks.
6. **`SMALL_WORDS` set** — identically defined in both page frontmatter blocks.

### Utility Code

| File | What | Used by |
|---|---|---|
| `src/lib/supabase.ts` | Supabase client init | kitchen page, recipe page |
| `src/lib/shareUtils.ts` | `getShareTier()`, `getShareTierLabel()` | recipe page only |

---

## 6. File Reference

```
kalamansi-site/
├── astro.config.mjs            # Astro config: server mode, Cloudflare adapter
├── wrangler.jsonc               # Cloudflare Workers config
├── package.json                 # Dependencies: astro, @astrojs/cloudflare, supabase-js
├── tsconfig.json
├── .env                         # Supabase URL + anon key
├── CLAUDE.md                    # Deploy notes
├── public/
│   ├── _redirects               # AASA redirect rule
│   ├── .well-known/
│   │   └── apple-app-site-association   # iOS Universal Links config
│   ├── cute-kalamansi.png       # Mascot image
│   ├── cute-kalamansi-v2.png    # Mascot v2
│   ├── cute-kalamansi-email-v3.png  # Email variant
│   └── sheila-avatar.jpg        # Avatar photo
├── src/
│   ├── layouts/
│   │   └── Layout.astro         # Minimal wrapper (system-ui, white bg)
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client
│   │   └── shareUtils.ts        # Share tier logic
│   └── pages/
│       ├── index.astro          # Home (uses Layout)
│       ├── privacy.astro        # Privacy (uses Layout)
│       ├── support.astro        # Support (uses Layout)
│       ├── reset-password.astro # JS redirect (standalone)
│       ├── invite/
│       │   └── [...slug].astro  # Invite fallback (uses Layout)
│       ├── kitchen/
│       │   └── [handle].astro   # Kitchen page (standalone, full design)
│       └── recipe/
│           └── [id].astro       # Recipe page (standalone, full design)
└── design/                      # Reference files (not in build)
    ├── colors_and_type.css      # Design system tokens (source of truth)
    ├── Kitchen.html             # Kitchen page mockup
    ├── Recipe.html              # Recipe detail mockup
    └── mobile.html              # Phone/browser frame presentation
```

---

## 7. Screenshots

Not captured — the site requires Supabase credentials and live data to render kitchen and recipe pages (SSR with database queries). The home/privacy/support pages are static but visually minimal (plain white, system font). The design mockups in `design/Kitchen.html`, `design/Recipe.html`, and `design/mobile.html` are the best visual references for the intended look and can be opened directly in a browser.

---

## 8. Summary of Key Findings

1. **The designed pages (kitchen, recipe) look polished.** They follow the warm off-white + Crimson Text + Inter + olive/teal system faithfully. The overall aesthetic is cohesive and intentional.

2. **The "utility" pages (home, privacy, support, invite) are unstyled.** They use `system-ui` on a white background with zero brand identity. They feel like placeholder pages.

3. **No shared component library.** Zero Astro components in `src/components/`. All UI is inline HTML+CSS per page. The two designed pages duplicate ~40 lines of CSS custom properties, the Google Fonts link, the CTA section, and two utility functions.

4. **Design tokens exist but aren't consumed.** The `design/colors_and_type.css` reference defines spacing, radius, shadow, and semantic typography tokens. The live pages hardcode the same values as raw pixels instead of referencing the variables. Only a handful of color and font-family tokens are actually used via `var()`.

5. **Design mockup features not yet built.** Card photos (emoji over colored backgrounds), filter chips, and diet-tag pills exist in the mockups but aren't in the live site.

6. **Missing web fundamentals.** No favicon, no social meta/OG tags, no 404 page.
