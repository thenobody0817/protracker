## 2025-12-28 - Single-File Interaction Patterns
**Learning:** In single-file HTML/JS apps without a framework, interactive div elements (`onclick`) are common but often miss keyboard support (`tabindex`, `role`, `keydown`).
**Action:** When refactoring "interactive divs", always add `tabindex="0"`, `role="button"`, and a `keydown` listener for Enter/Space to ensure keyboard parity.
