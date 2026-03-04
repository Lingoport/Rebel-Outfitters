# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rebel-Outfitters is a Star Wars-themed e-commerce SPA built with vanilla JavaScript, designed to demonstrate Lingoport's internationalization (i18n) capabilities. It intentionally contains both "bad i18n" examples and "i18n-compliant" versions for demo purposes.

## Commands

```bash
# Install dependencies
npm install

# Start development server (serves from src/ directory)
npm start
# Equivalent to: live-server src --verbose
```

There are no configured tests (`npm test` will error).

## Architecture

### SPA Routing & State (`src/app.js`)

Central file that owns all global state and the hash-based router:

- **Global state**: `shoppingCart` (Map), `orderHistory` (Array), `locale` (string, default `"en-us"`), `productList` (nested Map of droids/vehicles by ID), `featuredProducts` (Array)
- **Routes**: Hash-based (`#/`, `#/droids`, `#/droids/:id`, `#/vehicles`, `#/vehicles/:id`, `#/history`, `#/checkout`)
- On hash change, the router parses the URL via `Utils.parseRequestURL()`, selects the matching page component, calls `render()` then `after_render()`

### Component Pattern

Every view is a plain object (not a class) with two async methods:

```javascript
let MyComponent = {
    render: async () => { /* returns HTML string */ },
    after_render: async () => { /* attaches event listeners */ }
}
export default MyComponent;
```

Pages live in `src/views/pages/`, reusable components in `src/views/components/`.

### i18n Architecture

The app has two modes toggled via the hamburger menu version selector:
- **Non-i18n**: Strings hardcoded directly in component templates (intentionally bad i18n)
- **i18n Compliant**: Strings loaded via `src/services/i18n.js` from JSON files in `src/content/{locale}/strings.json`

To add a new locale:
1. Add locale key to `src/content/en-US/strings.json`
2. Add currency mapping in `src/services/i18n.js` (`currencyMap`)
3. Add locale variable and `<option>` to `src/views/components/Hamburger.js`

### Key Files

| File | Purpose |
|------|---------|
| `src/app.js` | Router, global state, bootstrapping |
| `src/index.html` | Single HTML shell with named regions (`#header_container`, `#page_container`, `#footer_container`, `.cartSlider`, `.hamSlider`) |
| `src/content/products.js` | Product data (droids & vehicles arrays) |
| `src/services/Utils.js` | `parseRequestURL()` for hash parsing, `sleep()` |
| `src/services/i18n.js` | i18n string lookup service |
| `src/css/style.scss` | SCSS source (compiled to `style.css`) |
| `lingoport/LiteProjectDefinition.xml` | Lingoport i18n project configuration |

### Styling

SCSS source at `src/css/style.scss`, compiled output at `src/css/style.css`. Key design tokens: yellow `#fff200`, dark background `#2d2d2a`, Lingoport purple `#27235e`, Lingoport green `#a6c740`. Fonts: Audiowide (titles), Montserrat (body), Space Mono (links).
