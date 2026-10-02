# Design System & UI/UX Guidelines — CampusOS

## 1. Brand Identity & Design Philosophy

### 1.1 Brand Identity
- **Name:** CampusOS
- **Iconography:** Graduation cap combined with electric lightning / operating system core.
- **Tone & Mood:** Modern, ambitious, professional, energetic, and distraction-free. It feels like a high-end Silicon Valley startup tool (similar to Linear, Raycast, or Notion) rather than a rudimentary student homework project.

### 1.2 Design Philosophy
1. **Utility First:** Fast to scan, zero visual clutter, maximum actionable student data on screen.
2. **Predictive Intelligence:** Surface immediate insights (e.g. *"Safe to miss 2 classes"*, *"Exam in 6 days"*).
3. **Micro-Delight:** Rewarding milestone completions with subtle confetti celebrations and animated progress bars.
4. **Visual Depth:** Multi-layered cards, subtle gradients, and glassmorphism backdrops (`backdrop-blur-md`).

---

## 2. Color System & Semantic Tokens

### 2.1 Brand Palette (Indigo & Purple Accents)
| Token | Hex (Light) | Hex (Dark) | Usage |
| :--- | :--- | :--- | :--- |
| `brand-50` | `#EEF2FF` | `#1E1B4B` | Light background tint / Badge background |
| `brand-500`| `#6366F1` | `#6366F1` | Primary CTA, focus rings, interactive states |
| `brand-600`| `#4F46E5` | `#4F46E5` | Button primary solid background |
| `brand-700`| `#4338CA` | `#3730A3` | Button active / hover state |

### 2.2 Backgrounds & Surfaces
| Surface Level | Light Mode | Dark Mode | Usage |
| :--- | :--- | :--- | :--- |
| **App Background** | `#F8FAFC` (Slate 50) | `#0B0F19` (Deep Navy) | Page body base background |
| **Card / Surface** | `#FFFFFF` (White) | `#111827` (Slate 900) | Primary cards, modals, popovers |
| **Sidebar / Nav** | `#FFFFFF` / `#F8FAFC` | `#0E1424` / `#0B0F19` | Navbars, side navigation rail |
| **Sub-panel / Input**| `#F1F5F9` (Slate 100) | `#1F2937` (Slate 800) | Form input fields, sub-sections |
| **Borders** | `rgba(226, 232, 240, 0.8)` | `rgba(55, 65, 81, 0.8)` | Card borders, dividers, outlines |

### 2.3 Semantic Status Colors
- **Success / Attendance Safe ($\ge 75\%$):** Emerald (`#10B981`, `#059669`)
- **Warning / Approaching Deadline / 65%–74% Attendance:** Amber (`#F59E0B`, `#D97706`)
- **Danger / Overdue / Critical Attendance ($< 65\%$):** Rose / Crimson (`#F43F5E`, `#E11D48`)
- **Focus / Pomodoro / Career:** Purple (`#8B5CF6`, `#A855F7`)
- **Tech / Projects / External:** Sky Blue (`#0284C7`, `#38BDF8`)

---

## 3. Typography & Text Hierarchy

CampusOS uses **Inter** and **Plus Jakarta Sans** with geometric numeral rendering.

| Style | Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | $36\text{px} - 60\text{px}$ | 800 (ExtraBold) | 1.15 | Landing page hero headings |
| **Page Title (H1)**| $24\text{px}$ (`1.5rem`) | 800 (ExtraBold) | 1.25 | Feature page headers |
| **Section Title (H2)**| $18\text{px}$ (`1.125rem`)| 700 (Bold) | 1.3 | Card headers, table titles |
| **Card Title (H3)**| $15\text{px}$ (`0.9375rem`)| 700 (Bold) | 1.4 | Assignment/Subject titles |
| **Body (Regular)** | $13\text{px} - 14\text{px}$ | 400 / 500 | 1.5 | Paragraphs, descriptions |
| **Caption / Subtitle**| $11\text{px} - 12\text{px}$ | 500 / 600 | 1.4 | Timestamps, secondary labels |
| **Overline / Badge** | $10\text{px} - 11\text{px}$ | 700 / 800 | 1.0 | Uppercase category tags |

---

## 4. UI Components Specification

### 4.1 Buttons
- **Primary:** Solid `#4F46E5`, white text, rounded 12px (`rounded-xl`), subtle shadow with hover scale and active compress (`active:scale-[0.98]`).
- **Secondary:** Neutral slate background (`bg-slate-100 dark:bg-slate-800`), dark text.
- **Outline:** 1px border (`border-slate-200 dark:border-slate-700`), transparent background.
- **Danger:** Solid rose red (`bg-rose-600`), for irreversible actions and resets.
- **Ghost:** Minimal hover background, icon-only or inline action triggers.

### 4.2 Cards
- **Standard Card:** Rounded 16px (`rounded-2xl`), 1px subtle border (`border-slate-200/80 dark:border-slate-800/80`), light box-shadow.
- **Interactive Card:** Transitions on hover (`hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md`).
- **Glass Card:** Background with `backdrop-filter: blur(12px)` and translucent fills for hero banners and Pomodoro widgets.

### 4.3 Forms & Inputs
- Rounded 12px (`rounded-xl`), background `#F8FAFC` (light) / `#111827` (dark).
- Left-aligned icon (`User`, `Calendar`, `BookOpen`, `MapPin`, etc.) in slate-400.
- Focus ring: `focus:ring-2 focus:ring-indigo-500 focus:outline-none`.
- Explicit red asterisk `<span className="text-rose-500">*</span>` on required fields.

### 4.4 Modals & Overlays
- Centered layout, max-width `$576\text{px} - 672\text{px}$`.
- Backdrop: `bg-slate-950/70 backdrop-blur-sm`.
- Animated entry: `animate-slide-up`.
- Top header with close button (`X`), scrollable body, and sticky bottom action bar.

---

## 5. Layout & Navigation Architecture

### 5.1 Desktop Viewport ($> 1024\text{px}$)
- Fixed 256px (`w-64`) left sidebar with direct navigation items, dynamic count badges, and target career card.
- Sticky 64px (`h-16`) top navbar with Global Search trigger (`⌘K`), Demo Data button, Light/Dark toggle, Notification bell, and Profile avatar.
- Main scrollable content canvas centered with `max-w-7xl`.

### 5.2 Mobile Viewport ($< 1024\text{px}$)
- Top navbar with hamburger toggle.
- Bottom fixed mobile dock (`MobileNav`) for 1-tap thumb navigation between **Dashboard**, **Attendance**, **Tasks**, **Exams**, and **More**.
- Slide-out drawer menu for secondary modules (*Career*, *Projects*, *Notes*, *Resources*, *Settings*).

---

## 6. Micro-Interactions, Feedback & Animations

1. **Toast Notifications:** Float in the bottom-right corner with color-coded left icons and auto-dismiss after 4 seconds.
2. **Confetti Bursts:** Triggers on milestone achievements (e.g. Completing an assignment, checking all exam topics, finishing a Pomodoro sprint, completing onboarding).
3. **Dynamic Progress Bars:** Smooth 500ms CSS width transitions with automatic color shifting (Green $\ge 75\%$, Amber $65\%-74\%$, Red $<65\%$).

---

## 7. Dark Mode & Light Mode Theme Specifications

- **Class Strategy:** Tailwind `class` mode toggled on the `<html>` root.
- **Synchronized:** Selection stored in `localStorage('campusos_theme')`.
- **System Default:** Defaults to Dark Mode on initial visit for modern aesthetic comfort.

