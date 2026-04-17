# Stage 1B: Profile & Advanced Todo Card

A responsive, accessible, stateful web component built with purely semantic HTML, CSS, and Vanilla JavaScript. Built according to the ProcurioOS theme specifications (supporting both Light and Dark modes via system preference).

## Submission Details
* **Updated Live URL:** https://samueljohn-hngtech-stage-1b.netlify.app/
* **Updated GitHub repo:** https://github.com/thesamueljohn/hng-stage-1b
* **GitHub Username:** thesamueljohn

## Features Built

### 1. Testable Profile Card
* Clean, semantic HTML structure using `<article>`, `<figure>`, and `<nav>`.
* Real-time epoch clock tracking accurately in milliseconds.
* Fully accessible: To prevent screen-reader spam from rapid DOM updates, the time tracker acts as a focusable button that announces the time into an `aria-live` region only when interacted with.
* Follows all `data-testid` requirements.

### 2. Advanced Todo Card
* **Stateful Management:** Custom vanilla JavaScript state object handling title, description, due date, status, and priority.
* **Edit Mode Transition:** Toggles between view mode and an edit form. Safely updates DOM upon saving.
* **Status Sync:** Checkbox and Dropdown are bidirectionally synced. Checking the box marks it `Done` and updates visual styles (strikethrough text).
* **Time Intelligence:** Compares due date against current time, automatically determining if the task is overdue, calculating granular time remaining (days, hours, minutes), and displaying visual badges.
* **Collapsible Regions:** Long descriptions are elegantly clamped using modern CSS with an accessible JavaScript toggle button.

## How to run locally
1. Clone the repository.
2. Navigate into the directory.
3. Serve the folder using any standard local web server. For instance:
   * Using Python: `python -m http.server 8000`
   * Using Node: `npx serve .`
   * Or simply open `index.html` via the Live Server extension in VS Code.

## File Structure
* `index.html` : Contains the semantic markup and structured components.
* `style.css` : Custom styling built with CSS variables to mirror the dark/light mode aesthetic based on system settings (`prefers-color-scheme`).
* `script.js` : Contains state management, logic bindings, time calculation, and DOM manipulation.
* `readme.md` : Documentation.