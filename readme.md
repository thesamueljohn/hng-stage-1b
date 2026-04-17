# Stage 1A (Frontend) — Advanced Todo Card

An interactive, stateful single-page component built with **semantic HTML, vanilla CSS, and vanilla JavaScript** — no frameworks, no build step. Extends the Stage 0 profile card with a fully‐featured Todo Card.

## Submission Details

| | |
|---|---|
| **Live URL** | https://samueljohn-hngtech-stage-1b.netlify.app/ |
| **GitHub Repo** | https://github.com/thesamueljohn/hng-stage-1b |
| **GitHub Username** | thesamueljohn |

---

## What Changed from Stage 0

Stage 0 delivered a static profile card with a live epoch clock. Stage 1A introduces a fully interactive **Todo Card** alongside the profile card:

| Capability | Stage 0 | Stage 1A |
|---|---|---|
| Profile card with epoch clock | ✅ | ✅ |
| Todo title / description display | ❌ | ✅ |
| Editable form (Edit / Save / Cancel) | ❌ | ✅ |
| Status transitions (Pending → In Progress → Done) | ❌ | ✅ |
| Checkbox ↔ status dropdown sync | ❌ | ✅ |
| Priority indicator (coloured left border) | ❌ | ✅ |
| Expand / collapse for long descriptions | ❌ | ✅ |
| Granular time remaining ("Due in 3 hours") | ❌ | ✅ |
| Overdue indicator (red badge + card accent) | ❌ | ✅ |
| Auto-updating time (every 30 s) | ❌ | ✅ |
| "Completed" replaces timer when Done | ❌ | ✅ |

---

## Features Built

### 1. Testable Profile Card (unchanged from Stage 0)
- Clean semantic structure: `<article>`, `<figure>`, `<nav>`.
- Live epoch clock updating every 50 ms.
- Accessible: announces time via `aria-live` region _only_ on button click (avoids screen-reader spam).
- All Stage 0 `data-testid` attributes retained.

### 2. Advanced Todo Card

#### Edit Mode
- Clicking **Edit** reveals a form with inputs for title, description, priority, and due date.
- **Save** commits changes to the state object and re-renders the card.
- **Cancel** closes the form without mutating state.
- On close, focus returns to the **Edit** button (keyboard-friendly).
- Pressing `Escape` also exits edit mode.
- Required testids: `test-todo-edit-form`, `test-todo-edit-title-input`, `test-todo-edit-description-input`, `test-todo-edit-priority-select`, `test-todo-edit-due-date-input`, `test-todo-save-button`, `test-todo-cancel-button`.

#### Status Transitions
- Three allowed statuses: **Pending**, **In Progress**, **Done**.
- Status dropdown (`test-todo-status-control`) and checkbox (`test-todo-checkbox`) are **bidirectionally synced**:
  - Checking the box → status becomes `Done`.
  - Setting dropdown to `Done` → checkbox becomes checked.
  - Unchecking after `Done` → reverts to `Pending`.
- Status display (`test-todo-status`) and the coloured status dot update immediately.
- `In Progress` applies a distinct blue accent to the title.

#### Priority Indicator
- A 4 px left-border accent (`test-todo-priority-indicator`) changes colour per priority:
  - **Low** — grey (`#6b7280`)
  - **Medium** — purple (`#8b5cf6`)
  - **High** — orange (`#f97316`)
- A priority badge (`test-todo-priority`) also reflects the level.

#### Expand / Collapse
- Descriptions longer than 80 characters are **clamped to 2 lines** by default (CSS `-webkit-line-clamp`).
- A toggle button (`test-todo-expand-toggle`) labelled "Show more / Show less" reveals the full text.
- The collapsible container (`test-todo-collapsible-section`) is linked via `aria-controls` and `aria-expanded` for full keyboard and screen-reader accessibility.
- Short descriptions hide the toggle automatically.

#### Smart Time Management
- Time updates every **30 seconds** (not just on load).
- Granular output:
  - `"Due in 2 days"` / `"Due in 3 hours"` / `"Due in 45 minutes"`
  - `"Overdue by 1 hour"` + red badge (`test-todo-overdue-indicator`) + red card accent
- When status is **Done**: timer stops, displays `"Completed"`, overdue badge is hidden.

---

## New Design Decisions

- **Single state object**: all mutable task data lives in one `todoState` literal, making logic predictable and testable.
- **CSS custom properties** for priority/status colours are declared at root level, keeping JS class-toggling minimal.
- **`data-userToggled` dataset flag**: tracks whether the user manually expanded the description so re-renders don't collapse it unexpectedly.
- **Dark mode via `prefers-color-scheme`**: no JS required — every colour references a CSS variable that flips automatically.

---

## Accessibility Notes

- All interactive controls are keyboard-reachable.
- Focus returns to the **Edit** button when the form closes (WCAG 2.1 "Return Focus" pattern).
- `Escape` key closes the edit form.
- Status changes are announced via `aria-live="polite"` on the overdue badge.
- `aria-expanded` on the expand toggle reflects collapsed/expanded state for screen readers.
- The epoch clock uses `aria-hidden="true"` on the rapidly-updating span to prevent screen-reader spam; announcement happens only on button click via a polite live region.

---

## Known Limitations

- **No persistence**: refreshing the page resets the task to its initial state. (A `localStorage` layer could be added in Stage 2.)
- **Focus trap** inside the edit form is not fully implemented (tabbing past the last field exits the form). This is flagged as an optional bonus in the spec.
- The `datetime-local` input appearance varies across browsers; no custom styling has been applied.

---

## File Structure

```
HNG-stage-1B/
├── index.html   — Semantic markup: profile card + todo card with all data-testid attributes
├── style.css    — CSS variables, dark/light mode, priority/status/overdue visual states
├── script.js    — State management, time logic, edit mode, status sync, expand/collapse
└── readme.md    — This file
```

## How to Run Locally

```bash
# Option A — Python
python -m http.server 8000

# Option B — Node
npx serve .

# Option C — VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```