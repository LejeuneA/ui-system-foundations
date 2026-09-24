# UI System Foundations

Figma-to-Code Responsive Component Library

A portfolio study exploring how a Figma UI system can be translated into reusable, responsive and developer-ready web components.

## Purpose

The project demonstrates design-system thinking across foundations, component anatomy, semantic states, responsive behavior, accessibility and developer handoff. It is an independent portfolio study and does not contain employer or proprietary product material.

## Technologies

- HTML
- Tailwind CSS
- Vanilla JavaScript
- Font Awesome Free
- Local Manrope font files

No JavaScript framework or UI framework is used.

## Local setup

```bash
npm install
npm run build
```

Open `index.html` directly, or serve the directory with any static web server:

```bash
npx serve .
```

For Tailwind development:

```bash
npm run watch
```

## Project structure

```text
/
|-- index.html
|-- components/
|   |-- accordion.html
|   |-- action-buttons.html
|   |-- alerts-callouts.html
|   |-- breadcrumbs.html
|   |-- form-controls.html
|   |-- navbar.html
|   |-- pagination.html
|   |-- profile-cards.html
|   |-- progress-bars.html
|   |-- status-filter-chips.html
|   |-- stepper.html
|   `-- tabs.html
|-- assets/
|   |-- css/tailwind.css
|   |-- fonts/
|   |-- js/components.js
|   `-- vendor/fontawesome/
|-- scripts/copy-vendor-assets.mjs
|-- src/input.css
|-- tailwind.config.cjs
`-- package.json
```

## Component documentation

`index.html` is the component gallery. Each component has a dedicated page containing live semantic HTML examples, documented variants and source-supported states. Shared presentation and component foundations are defined in `src/input.css`.

JavaScript is limited to interactions that need shared state management: tabs, dismissible alerts, filter menus, removable chips and mobile navigation. Accordions and expandable profile items use native `details` and `summary` elements.

## Responsive approach

Documentation grids, example groups and composite components reflow at content-appropriate breakpoints. Wide navigation examples use contained horizontal scrolling, while the source-supported mobile navbar and compact stepper are documented independently. Focus styles, labels and hit areas remain available at narrow widths.

## Figma-to-code methodology

The supplied Figma documentation PDFs were reviewed as a complete system before implementation. Repeated color roles, type treatment, radii, borders and control sizes became a deliberately small token layer. Each component was then implemented in dependency order and checked against related patterns to preserve shared semantics without inventing unsupported variants.

This project is not an enterprise framework, an employer project, an official company design system or a React component library.
