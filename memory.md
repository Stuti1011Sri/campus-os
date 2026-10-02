# Project Memory & Architecture Decisions — CampusOS

This document serves as the persistent memory and institutional knowledge base for **CampusOS**. It documents key architectural decisions, design choices, known limitations, and critical guidelines for future developers and AI agents working on this codebase.

> **SECURITY NOTICE:** Do NOT store passwords, API keys, private tokens, personal identification numbers, or secrets in this file.

---

## 1. Project Context & Purpose

- **Project Name:** CampusOS (Student-Os)
- **Tagline:** *"Your entire college life, in one place."*
- **Origin:** Built to eliminate student academic fragmentation (attendance, assignments, exams, career prep, notes, and institutional links) through a clean, privacy-first, startup-grade web application.
- **Core Philosophy:** 100% free, client-side, local-first, zero mandatory external dependencies or subscriptions.

---

## 2. Key Architectural Decisions

| Decision | Choice Made | Rationale |
| :--- | :--- | :--- |
| **Framework** | React 18 + Vite 6 | Lightning-fast development server (HMR < 50ms), compact production bundle, wide ecosystem support, and beginner friendliness. |
| **State Management** | Central React Context (`AppContext.jsx`) + Custom Hook (`useApp()`) | Avoids external state library overhead (Redux/Zustand) while maintaining clean reactivity, single-source-of-truth state, and simple debuggability. |
| **Persistence** | Synchronous `localStorage` with reactive `useEffect` hooks | Gives instant load speeds, zero backend hosting costs, 100% offline capability, and total privacy for student data. |
| **Styling** | Tailwind CSS 3.4 (utility-first) + CSS Variables & Glassmorphism | Fast styling, zero runtime CSS overhead, built-in responsive breakpoints, and straightforward Dark/Light mode support. |
| **Iconography** | `lucide-react` | Crisp, scalable, tree-shakeable SVG icon set with consistent visual stroke width across all modules. |
| **Career Roadmaps** | Predefined local dataset (`roadmapsData.js`) | Avoids reliance on paid or unstable GenAI APIs, ensures deterministic high-quality curriculum, and works completely offline. |
| **Demo Data System** | Dynamic Relative Date Generator (`demoData.js`) | Ensures that when demo data is loaded, exam countdowns, due dates, and study sessions are always relative to `new Date()`, preventing stale "past date" states in demos. |

---

## 3. Important Implementation Details

### 3.1 Mathematical Calculations (`src/utils/calculations.js`)
- **Attendance Percentage:** $\text{percentage} = \frac{\text{present}}{\text{total}} \times 100$
- **Classes Needed for Target ($T = 75\%$):** $\lceil\frac{T \cdot \text{total} - \text{present}}{1 - T}\rceil$
- **Safe Skips Buffer:** $\lfloor\frac{\text{present} - T \cdot \text{total}}{T}\rfloor$
- **Exam Days Countdown:** Normalized to midnight `setHours(0,0,0,0)` to ensure accurate integer calendar day differences across timezones.
- **Overdue Check:** Compares date strings against today's normalized date if `status !== 'Completed'`.

### 3.2 View Routing & Navigation
- The app uses an internal state-based router controlled by `currentView` (`'landing'` vs `'dashboard'`) and `activeTab` (`'dashboard'`, `'subjects'`, `'attendance'`, `'assignments'`, `'exams'`, `'study'`, `'career'`, `'projects'`, `'resources'`, `'notes'`, `'college'`, `'settings'`).
- This eliminates URL routing configuration errors when deploying to sub-paths on GitHub Pages or custom domains on Vercel.

### 3.3 Celebration Engine
- Integrated `canvas-confetti` triggered upon completing assignments, finishing a Pomodoro study block, completing onboarding, or loading demo data.

---

## 4. Key Design Decisions

1. **Dark Mode as Default Aesthetic:** Dark Navy (`#0B0F19`) background provides a sleek, modern, battery-efficient workspace for students who frequently study late at night.
2. **Unified Color Semantics:**
   - **Indigo (`#6366F1`):** Primary branding, active navigation, assignments.
   - **Emerald (`#10B981`):** Good attendance ($\ge 75\%$), completed tasks, focus break state.
   - **Amber (`#F59E0B`):** Warning attendance ($65\%-74\%$), exams countdown, in-progress tasks.
   - **Rose (`#F43F5E`):** Critical attendance ($< 65\%$), overdue assignments, danger actions.
   - **Purple (`#8B5CF6`):** Career roadmap, deep Pomodoro focus.

---

## 5. Known Limitations & Edge Cases

1. **Browser Storage Cleared on Cache Purge:** Because data is stored in `localStorage`, clearing browser cache/history removes local data. *Mitigation: Built-in Full JSON Backup Export and Restore in Settings.*
2. **Single-Browser Isolation:** Changes made in Chrome on Desktop will not automatically sync to Safari on Mobile without exporting/importing JSON.
3. **Storage Quota:** Browser `localStorage` typically has a 5MB limit per origin. For text-based college logs, this accommodates years of data, but high-volume binary attachments should not be stored directly in `localStorage`.

---

## 6. Known Bugs & Resolutions

- **Resolved (v1.0.0):** Rollup build error caused by missing `Github` icon name in `lucide-react`. Fixed by utilizing `GitBranch` / `FolderGit2` icons.
- **Resolved (v1.0.0):** Relative import paths in sub-directories (`src/components/features/*/`) adjusted from `../../` to `../../../` to properly resolve `AppContext` and `calculations.js`.

---

## 7. Future Strategic Decisions

1. **Optional Cloud Backend:** Evaluating Supabase or Firebase Auth + Firestore for opt-in cross-device synchronization while preserving offline-first local mode as default.
2. **PWA Offline Service Worker:** Upgrading PWA manifest with a Workbox service worker for caching static assets in airplane mode.
3. **Mobile Apps:** Exploring Capacitor bundling for Google Play Store and Apple App Store distribution.

---

## 8. Instructions for Future AI Agents Working on this Project

When making modifications or adding new features:
1. **Never break existing modules:** Test that all 12 navigation tabs, modals, and attendance calculators continue to function after any edits.
2. **Validate with `npm run build`:** Always run `npm run build` before concluding changes to guarantee zero Rollup / JSX compilation errors.
3. **Preserve the `localStorage` key schema:** Do not rename existing keys in `STORAGE_KEYS` (in `AppContext.jsx`) without providing backwards-compatible migration code.
4. **Follow the established component structure:** Place generic primitives in `src/components/common/`, layout in `src/components/layout/`, and feature-specific components in `src/components/features/[feature]/`.
5. **Keep dependencies clean:** Do not add heavy npm libraries for minor utility tasks; leverage standard JavaScript and existing packages (`clsx`, `lucide-react`, `canvas-confetti`).

