# Development Rules & Coding Standards — CampusOS

These development rules must be strictly adhered to by all developers and AI agents contributing to **CampusOS**.

---

## 1. Core Principles

### Rule 1: Do Not Break Existing Functionality
- Before modifying or refactoring any component, verify that all existing tabs, calculations, modals, and persistence workflows continue to work without regression.
- Always verify the build with `npm run build` after making modifications.

### Rule 2: Keep the Application Beginner-Friendly
- The application is designed for college students and beginner developers.
- Keep installation, local execution, and build commands dead simple (`npm install`, `npm run dev`, `npm run build`).
- Do not introduce complicated configuration steps, required environment variables, or platform-specific dependencies unless strictly necessary and thoroughly documented.

### Rule 3: Prefer Simple & Elegant Solutions
- Write readable, maintainable, and modular JavaScript / JSX.
- Avoid over-engineering, unnecessary abstractions, or overly complex design patterns where a straightforward React hook or helper function achieves the goal cleanly.

### Rule 4: Avoid Unnecessary Dependencies
- Do not add heavy npm packages when standard JavaScript or existing dependencies (`react`, `lucide-react`, `tailwind-merge`, `canvas-confetti`) suffice.
- Keep bundle size small and load times ultra-fast.

---

## 2. API & Security Guardrails

### Rule 5: Do Not Add Paid APIs Without Explicit Approval
- CampusOS must remain 100% free and locally functional.
- Do not introduce mandatory third-party services that require paid API subscriptions, credit cards, or external cloud tokens for core features.

### Rule 6: Never Expose API Keys or Secrets
- Never commit API keys, service tokens, private certificates, or secret credentials into the source code or repository.
- If optional third-party integrations are added in the future, use client-side `.env.local` files and document them in `.env.example`.

### Rule 7: Never Hard-Code Sensitive Personal Information
- Do not hardcode personal student data or credentials. Use the local state management and user settings system.

---

## 3. UI, UX & Responsiveness

### Rule 8: Keep the UI 100% Responsive
- Every component, modal, table, card, and navigation bar must render smoothly across:
  - **Mobile:** $320\text{px} - 639\text{px}$ (Mobile bottom nav, stacked cards, full-width modals)
  - **Tablet:** $640\text{px} - 1023\text{px}$ (2-column grids, collapsible drawer)
  - **Laptop & Desktop:** $1024\text{px}+$ (3-column grids, permanent sleek sidebar)
- Always test layouts with long text, short screens, and overflow scenarios.

### Rule 9: Maintain Dark and Light Mode Parity
- Every UI element must support both Dark mode (default `#0B0F19` background) and Light mode (`#F8FAFC` background).
- Never use hardcoded light-only or dark-only text colors without appropriate `dark:` variants.

### Rule 10: Smooth Transitions & Tasteful Animations
- Use smooth micro-interactions (hover borders, scale transforms on click, toast slide-up).
- Do not overuse heavy animations that cause lag on low-end laptops or mobile devices.

---

## 4. Code Quality & Component Architecture

### Rule 11: Keep Components Modular & Reusable
- Common UI elements must reside in `src/components/common/` (`Button`, `Modal`, `Card`, `Badge`, `ProgressBar`, `EmptyState`, `Toast`).
- Feature-specific logic must reside in its respective `src/components/features/[feature]/` directory.
- Avoid 1,000+ line monolithic files; break large views into focused sub-components.

### Rule 12: Validate All User Inputs
- Prevent invalid dates, negative numbers for attendance, empty required titles, and corrupted data payloads.
- Display friendly, inline error messages rather than crashing or failing silently.

### Rule 13: Handle Empty & Error States Gracefully
- Never leave a blank, broken screen when an array is empty or search yields zero results.
- Always render a descriptive `EmptyState` component with a clear Call-to-Action button.

### Rule 14: Maintain Web Accessibility (a11y)
- Provide proper `aria-label` attributes on icon-only buttons.
- Ensure keyboard navigation support (e.g. `ESC` closes modals, `Cmd+K` / `Ctrl+K` opens global search).
- Maintain WCAG 2.1 AA compliant color contrast ratios for text and badges.

---

## 5. Naming Conventions & Project Hygiene

### Rule 15: Consistent Naming Standards
- **Component files:** PascalCase (e.g., `AttendancePage.jsx`, `AddSubjectModal.jsx`).
- **Utility & Data files:** camelCase (e.g., `calculations.js`, `demoData.js`, `roadmapsData.js`).
- **Constants:** UPPER_SNAKE_CASE (e.g., `STORAGE_KEYS`, `CAREER_ROADMAPS`).
- **Context hooks:** `useApp()`.

### Rule 16: Keep Documentation Updated
- When a feature is added, modified, or extended, update `PRD.md`, `architecture.md`, `tasks.md`, and `memory.md` accordingly.

### Rule 17: Explain Changes Clearly
- When collaborating, clearly explain the rationale behind any architectural, state, or UX adjustments.

