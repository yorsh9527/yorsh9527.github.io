# Design: 探索手记

## System
- Hallmark v2 Editorial theme, full site redesign.
- Homepage: Index-First, Poster hero. Draw 262954's conversational FAQ/listen anatomy is rejected because this is a written learning archive, not a music release. Preserve masthead and index footer.
- Personal brand for learning routes, project case studies, Markdown notes and a daily news digest.
- Keep all existing destinations, actual facts, data calls, controls and disclaimers. No invented personal identity, proficiency, testimonials or metrics.

## Tokens
- css/tokens.css is the source of truth.
- Warm uncoated paper, cool dark ink, existing forest-green brand accent; square corners, heavy ink rule and hairlines, no shadows.
- User override: Chinese serif headings (Noto Serif SC) with Bricolage Grotesque / Chinese sans body. Labels/navigation use the sans family, untracked and sentence case. This intentionally overrides Editorial theme sans-heading default.
- Headings are one color and one weight. No eyebrows, small caps, emoji marks or arrow suffixes on links. Merge section labels into plain descriptive headings.
- Body 16px minimum; secondary metadata 14px. Container capped at 1312px, centred. Grid tracks minmax(0,1fr).
- Green is for link hover/focus/current state. The dark-mode variant derives ink/paper roles, never filters the whole page.

## Files and roles
- Root agent: app/Main.tsx, app/layout.tsx, shared header/footer and css. Own all CSS.
- Interior pages: app/journey/page.tsx, app/projects/page.tsx, app/projects/[slug]/page.tsx, app/about/page.tsx. Preserve content and destinations, edit within existing components.
- News view: components/news/NewsView.tsx. Preserve conditional data states, source/coverage/date logic, original URLs and exact disclaimer text. Use a ruled editorial news list and quiet market table. No script changes.
- Blog listing and post layout stay functional and inherit shared system; no content conversion in this redesign.

## Controls and layout
- Use existing Link component, search, theme and mobile menu. Shared classes field-home/field-page, page-intro, section-heading, text-link are supported by root CSS.
- Interior heading title, descriptive paragraph, then ruled lists. Article prose may remain content-dense.
- Classes route-index, route-entry, entry-number, entry-content, entry-meta, route-back, editorial-label may be used; root owns styling.
- No fake photos or mock browser artwork. Real words, dates and project material carry the composition.

## Motion and verification
- State only, reduced-motion fallback; visible without scripts.
- Instant focus-visible. 44px minimum primary interactive targets.
- Preserve keyboard behavior and responsive navigation.

