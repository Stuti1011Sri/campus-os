# Product Requirements Document (PRD) — CampusOS

## 1. Product Overview

- **Product Name:** CampusOS
- **Tagline:** *"Your entire college life, in one place."*
- **Version:** 1.0.0 (Client-Side Local-First MVP)
- **Primary Audience:** College and university students across engineering, sciences, arts, commerce, and professional degree programs.

---

## 2. Product Vision & Problem Statement

### 2.1 The Problem
College students juggle fragmented aspects of their academic and professional journey across multiple disparate apps, WhatsApp groups, spreadsheets, sticky notes, and portals:
1. **Attendance Uncertainty:** Manual or missing attendance tracking leads to last-minute debarment from semester examinations due to failing minimum attendance rules (typically 75%). Students lack actionable foresight on how many classes they need to attend or can safely miss.
2. **Scattered Deadlines:** Homework, lab assignments, project milestones, and exam dates are scattered across LMS portals, notice boards, and messages, leading to missed deadlines and unnecessary stress.
3. **No Centralized Career Roadmap:** Students often do not know what steps to take for internship and placement preparation, or they depend on expensive courses and paid platforms.
4. **Tool Fragmentation:** Notes, college ERP links, study timers, and GitHub links live in separate disconnected tools.
5. **Privacy & Barrier to Entry:** Many productivity tools require mandatory cloud accounts, subscriptions, intrusive tracking, or external API keys that beginner students cannot easily set up or afford.

### 2.2 Product Vision
**CampusOS** provides a free, fast, responsive, and privacy-respecting unified operating system designed specifically for students. It consolidates daily lecture schedules, attendance with exact mathematical thresholds, assignments, exams, focus timers, career milestones, notes, resources, and institutional links into one cohesive workspace. It requires no backend, no cloud authentication, and no paid APIs in its initial version.

---

## 3. Target Users & User Personas

### Persona 1: Aryan (2nd Year Computer Science Student)
- **Needs:** Needs to keep attendance strictly above 75% while balancing DSA practice, project building, and mid-term exam preparation.
- **Pain Points:** Hard to keep track of missed classes per subject; loses track of assignment due dates across 5 simultaneous courses.
- **CampusOS Solution:** Uses the Attendance Tracker with auto-calculated safe skip limits, the Assignment Kanban with priority flags, and the Software Developer Career Roadmap.

### Persona 2: Priya (Final Year Engineering Student)
- **Needs:** Organizing placement prep, capstone project milestones, and college placement cell links.
- **Pain Points:** Bookmarks and project links are lost in browser history; forgets upcoming campus interview dates.
- **CampusOS Solution:** Tracks project repository links, leverages the Exam & Interview Planner, and bookmarks campus placement links in the College Info section.

---

## 4. Main User Needs
- **Clarity & Predictability:** Instantly know today’s timetable, current attendance status, and upcoming deadlines upon opening the app.
- **Actionable Attendance Math:** See exact numbers: *"Attend 3 more classes"* or *"Can safely miss 2 classes"*.
- **Task & Exam Prioritization:** Clear visual cues for overdue tasks and high-priority deliverables.
- **Zero Friction:** Immediate access without complex signup forms, credit card prompts, or configuration files.
- **Reliable Persistence:** Data remains safely stored even after refreshing or closing the browser.

---

## 5. Current Features (Version 1.0)

| Feature Module | Current Capabilities & Implementation | Status |
| :--- | :--- | :--- |
| **Landing Page** | High-conversion hero, interactive dashboard preview mockup, feature highlights grid, and CTA buttons ("Get Started", "Explore Demo"). | Implemented |
| **Onboarding Modal** | 30-second setup capturing Name, College, Course, Branch, Year, Semester, Target Attendance %, and Career Goal. | Implemented |
| **Main Dashboard** | Time-aware greeting, Today's Timetable with direct present/absent loggers, Upcoming Deadlines, Attendance progress bar, Exam countdowns, Subject study progress, Today's Tasks checklist with celebration confetti, and Recent Activity log. | Implemented |
| **Attendance Tracker** | Subject cards with Total/Present/Absent counts, attendance %, +Present / +Absent buttons, exact calculation of classes needed or safe skips to maintain $\ge 75\%$, custom target threshold slider, Add/Edit/Delete subjects. | Implemented |
| **Assignment Manager** | Assignment cards with title, subject tag, due date, description, priority (*High*, *Medium*, *Low*), status (*To Do*, *In Progress*, *Completed*), live overdue detection, search, multi-filter by priority/status/subject, and sorting by deadline/priority/title. | Implemented |
| **Exam Planner** | Countdown timers (*"In 6 days"*, *"Tomorrow"*, *"Today"*), chapter-by-chapter syllabus checklist with completion %, card view and chronological timeline view, venue details, and permitted items notes. | Implemented |
| **Study Planner & Pomodoro** | Built-in Pomodoro timer (25m focus / 5m short break / 15m long break) with intervals, daily study blocks schedule, weekly revision schedule, and subject coverage meters. | Implemented |
| **Career Roadmap** | 6 pre-configured industry career pathways (Software Developer, Web Developer, Data Analyst, AI/ML Engineer, Cybersecurity, UI/UX Designer) with interactive checklist milestones, progress percentages, and curated free learning resources. | Implemented |
| **Project Tracker** | Portfolio manager for college capstones and side projects with tech stack badges, milestone sub-checklists, GitHub links, live URLs, and lifecycle status (*Planning*, *Development*, *Testing*, *Completed*). | Implemented |
| **Resource Vault** | Bookmarks organized by categories (*DSA*, *Programming*, *Internships*, *Career*, *Projects*, *Learning*, *College*), tags, favorite starring, search, and direct links. | Implemented |
| **College Info & Directory**| University ERP portal links, library catalog, exam portals, placement cell URLs, and faculty/advisor contact cards with direct email/phone actions. | Implemented |
| **Notes & Cheatsheets** | Subject-categorized revision notes with markdown preview, search, note pinning, and timestamp tracking. | Implemented |
| **Global Search (⌘K / Ctrl+K)**| Real-time modal searching across all assignments, exams, subjects, notes, projects, and resources. | Implemented |
| **Notification Center** | Drawer displaying low attendance warnings ($< 75\%$), urgent assignments (due $\le 3$ days or overdue), upcoming exams (within 7 days), today's study sessions, and native browser push permission trigger. | Implemented |
| **Settings & Data Management** | Profile editing, light/dark mode switch, Full JSON Backup Export, JSON Restore with schema check, One-click "Load Demo Data", and Factory Reset with safety modal. | Implemented |

---

## 6. Planned Features (Future Roadmap)

- [Planned] **Cloud Sync & Multi-Device Login:** Optional cloud authentication (Firebase Auth / Supabase) allowing sync between mobile and desktop devices.
- [Planned] **College Timetable Import (OCR / PDF / ICS):** Upload university PDF or image timetable to automatically generate weekly schedules.
- [Planned] **Calendar Sync (Google Calendar / Apple Calendar / Outlook):** Export exams and study schedules as `.ics` feed or direct OAuth sync.
- [Planned] **Peer Study Rooms & Pomodoro Co-Working:** Real-time study rooms with shared focus timers and ambient soundscapes.
- [Planned] **Grade / GPA / CGPA Calculator:** Weighted grade point average calculation per semester with grade goal forecasting.
- [Planned] **Offline-First Native Apps:** Mobile apps via Capacitor / React Native packaging.
- [Planned] **Campus Community / Peer Notes Sharing:** Optional local or campus-wide sharing of curated notes and previous years' question papers (PYQs).

---

## 7. User Flows

### Flow 1: First-Time User Onboarding
```
Landing Page -> Click "Get Started" -> Onboarding Modal (Name, College, Course, Semester, Goal) -> Save -> Confetti Celebration -> Personalized Dashboard Loaded
```

### Flow 2: Daily Attendance Logging
```
Open Dashboard -> Check "Today's Classes" widget -> Click "+ Present" or "+ Absent" -> Automatic State & % Recalculation -> Updated Safe Skips Banner & Activity Feed
```

### Flow 3: Assignment Creation & Submission
```
Sidebar "Assignments" -> Click "Add Assignment" -> Fill Title, Subject, Due Date, Priority -> Save -> View on Board -> Work on task -> Click "Mark Done" -> Confetti & Status Updated to "Completed"
```

### Flow 4: Exam Syllabus Preparation
```
Sidebar "Exams" -> Select Exam Card or Timeline -> Check off completed chapter topics -> Progress Bar Updates dynamically -> Readiness score increases
```

### Flow 5: Data Backup & Transfer
```
Sidebar "Settings" -> Click "Export JSON Backup" -> CampusOS_Backup_YYYY-MM-DD.json downloaded -> On another machine: Settings -> "Upload JSON File" -> Restored immediately
```

---

## 8. Functional Requirements

1. **FR-01 Local Data Persistence:** All state mutations (attendance, assignments, exams, study sessions, career checklist, notes, bookmarks, projects, user profile) MUST write to `localStorage` immediately.
2. **FR-02 Accurate Attendance Math:**
   - Attendance percentage: $\text{Percentage} = \frac{\text{Present}}{\text{Total}} \times 100$
   - Classes needed when below target $T$: $\lceil \frac{T \cdot \text{Total} - \text{Present}}{1 - T} \rceil$
   - Classes can miss when in good standing: $\lfloor \frac{\text{Present} - T \cdot \text{Total}}{T} \rfloor$
3. **FR-03 Exam Days Calculation:** Dynamically compute whole day differences between current calendar day and exam date.
4. **FR-04 Overdue Detection:** Any assignment with `dueDate < today` and `status !== 'Completed'` must be flagged as Overdue.
5. **FR-05 Global Search:** Must perform fuzzy/substring search over all 6 core entities with instant modal preview and direct tab jumping.
6. **FR-06 Preloaded Demo Data:** The app must offer a 1-click demo data population that provides complete sample data across all modules.
7. **FR-07 Theme Persistence:** Theme choice (`dark` or `light`) must persist in `localStorage` and synchronize with the HTML document root.

---

## 9. Non-Functional Requirements

1. **Zero External API Dependency:** The application core must function 100% offline without external server APIs, keys, or payment gates.
2. **Performance:** Initial page load under 1.5s; bundle size under 500 KB gzipped.
3. **Responsiveness:** Fluid adaptation across mobile (<640px), tablet (640px–1024px), laptop (1024px–1280px), and desktop (>1280px).
4. **Accessibility:** Proper contrast ratios (WCAG 2.1 AA), keyboard navigation support (`Esc` to dismiss modals, `Cmd+K` for global search), and semantic HTML elements.
5. **Data Integrity:** Graceful JSON import validation; prevent negative counts or invalid date inputs.

---

## 10. Privacy & Security Requirements

1. **No External Telemetry / Tracking:** No user data, passwords, or personal metrics are transmitted to any external server.
2. **Local Sandboxing:** All user input resides in browser storage under domain origin.
3. **Explicit Disclaimer:** Transparent notice shown in Settings confirming local-only data residence.

---

## 11. Future Monetization Ideas (If Cloud/Commercial Version is Launched)

1. **CampusOS Pro (Cloud Sync & Multi-Device):** Subscription for cross-device cloud sync, automatic Google Calendar integration, and team collaboration on projects.
2. **Campus / Institutional Licenses:** White-labeled dashboard sold to colleges/universities integrated with institutional LMS (Moodle, Blackboard, Canvas).
3. **Verified Placement & Internship Platform:** Optional opt-in student talent pool connecting students with hiring companies based on completed career roadmap checkpoints.
4. **Creator & Educator Marketplace:** Verified student seniors and educators publishing curated roadmap bundles, notes, and cheat sheets.

---

## 12. Success Metrics

1. **Daily Active Engagement (DAU):** Students opening the dashboard daily to log attendance and check timetable.
2. **Task Completion Rate:** % of created assignments marked completed before due dates.
3. **Attendance Safety Rate:** % of subjects maintained above student's target threshold (e.g. $\ge 75\%$).
4. **Exam Readiness:** Increase in syllabus chapter checklist completion before exam countdown reaches 0 days.
5. **Zero-Crash Session Stability:** 100% error-free local render rate across all device viewports.

