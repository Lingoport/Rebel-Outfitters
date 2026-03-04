# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start development server (live-reloads from src/)
npm run server

# Build WAR file for deployment
ant
```

No test suite or linter is configured.

## Architecture

**Rebel Outfitters** is a Star Wars-themed e-commerce SPA demo app built with vanilla JavaScript (no framework). Its primary purpose is showcasing Lingoport/Localyzer internationalization tooling.

### Routing and Rendering

- `src/app.js` is the entry point: it initializes global state, sets up hash-based client-side routing, and renders components into `#root`.
- Each view/component exposes `render()` (returns HTML string) and `after_render()` (attaches event listeners). Components are in `src/views/pages/` and `src/views/components/`.
- The router resolves URL hash fragments to page components and calls them in sequence.

### Global State (app.js)

All shared state lives as globals in `app.js`:
- `productList` — Map of Maps (categories → products)
- `shoppingCart` — current cart items
- `orderHistory` — array of `Order` objects (dummy data on startup)
- `locale` — active locale string (e.g. `"en-US"`)

State is persisted to `localStorage`. Locale switches trigger a full re-render via `updateLocale()`.

### Internationalization

- Locale string files: `src/content/{locale}/strings.json`
- `src/services/i18n.js` loads and exposes translated strings
- Supported locales: `en-US`, `fr-FR`, `zh-CN`, `si`, `yo`, `eo`
- `eo` (Esperanto) and variants with `_LRMLQA` suffix are pseudo-locales for Lingoport QA testing
- Lingoport project config: `lingoport/LiteProjectDefinition.xml`

### Key Files

| File | Purpose |
|------|---------|
| `src/app.js` | Router, global state, locale switching |
| `src/services/i18n.js` | i18n string lookup service |
| `src/content/{locale}/strings.json` | Translated UI strings per locale |
| `src/views/pages/` | Page-level components (Home, Browse, ProductShow, Checkout, OrderHistory) |
| `src/views/components/` | Shared UI components (Navbar, Cart, Bottombar, Hamburger) |
| `src/views/classes/Order.js` | Order data model |
| `src/css/style.css` | All styles (monolithic, ~5000 lines) |
| `build.xml` | Ant build → `RebelOutfitters.war` |
