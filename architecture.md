# System Architecture Documentation — CampusOS

## 1. Overall System Architecture

CampusOS is designed as a **Client-Side, Local-First Single Page Application (SPA)** built with React 18 and bundled via Vite. It operates entirely within the user's browser runtime with zero required backend servers or external API dependencies for its core functionality.

### 1.1 Architecture Highlights
- **Engine:** React 18 (Functional components + Hooks + React Context API)
- **Bundler & Dev Server:** Vite 6 with `@vitejs/plugin-react`
- **Styling & Design Engine:** Tailwind CSS 3.4 + PostCSS with custom dark/light theme tokens and CSS glassmorphism
- **Persistence Layer:** Browser `localStorage` with reactive synchronization
- **Icons & Effects:** `lucide-react` (SVG icons) + `canvas-confetti` (interactive milestone animations)

---

## 2. Architecture Diagram

```
+---------------------------------------------------------------------------------+
|                                 USER BROWSER                                    |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   +-------------------------------------------------------------------------+   |
|   |                         React Application (Root)                        |   |
|   |                               (main.jsx)                                |   |
|   +------------------------------------+------------------------------------+   |
|                                        |                                        |
|   +------------------------------------v------------------------------------+   |
|   |                          AppContext Provider                            |   |
|   |      (Central State, Action Handlers, Toast Bus, Theme & Persistence)   |   |
|   +----+------------------+-------------------+------------------+----------+   |
|        |                  |                   |                  |              |
|   +----v-----+       +----v-----+       +-----v----+       +-----v----+         |
|   |  Layout  |       |  Common  |       | Feature  |       |  Utils   |         |
|   | (Nav,    |       | (Modal,  |       |  Pages   |       | (Math,   |         |
|   |  Sidebar,|       |  Badge,  |       | (Dash,   |       |  Dates,  |         |
|   |  Search, |       |  Card,   |       |  Attd,   |       |  Backup) |         |
|   |  Mobile) |       |  Button) |       |  Exams)  |       +----------+         |
|   +----------+       +----------+       +-----+----+                            |
|                                               |                                 |
|                                         +-----v----+                            |
|                                         | Modals & |                            |
|                                         | Forms    |                            |
|                                         +----------+                            |
|                                                                                 |
|   +-------------------------------------------------------------------------+   |
|   |                       Browser Storage (localStorage)                    |   |
|   |  [campusos_user_profile, campusos_subjects, campusos_attendance, ...]   |   |
|   +-------------------------------------------------------------------------+   |
+---------------------------------------------------------------------------------+
```

---

## 3. Frontend Directory & Component Structure

```
src/
├── components/
│   ├── common/                       # Reusable Presentation Primitives
│   │   ├── Badge.jsx                 # Status indicator chips (primary, success, warning, danger)
│   │   ├── Button.jsx                # Multi-variant button (primary, secondary, outline, danger, ghost)
│   │   ├── Card.jsx                  # Standard & glassmorphism card wrappers with sub-components
│   │   ├── EmptyState.jsx            # Friendly zero-data visual prompt with action triggers
│   │   ├── Modal.jsx                 # Accessible overlay dialog with ESC-listener & body scroll lock
│   │   ├── ProgressBar.jsx           # Animated progress bar with threshold color computation
│   │   └── Toast.jsx                 # Dynamic floating notification toasts (success, warning, error, info)
│   │
│   ├── layout/                       # App Frame & Navigation
│   │   ├── GlobalSearchModal.jsx     # Cmd/Ctrl+K real-time search across all modules
│   │   ├── MobileNav.jsx             # Bottom fixed navigation dock for mobile viewports
│   │   ├── Navbar.jsx                # Top app bar (Logo, search trigger, demo loader, theme toggle, badges)
│   │   └── Sidebar.jsx               # Desktop collapsible side navigation with dynamic counter badges
│   │
│   └── features/                     # Domain Feature Pages & Sub-modals
│       ├── landing/
│       │   └── LandingPage.jsx       # Public landing page with hero, interactive mockup, feature grid
│       ├── onboarding/
│       │   └── OnboardingModal.jsx   # 30-sec profile configuration modal for new students
│       ├── dashboard/
│       │   └── DashboardPage.jsx     # Personalized command center with timetable, deadlines, exam timers
│       ├── subjects/
│       │   └── SubjectsPage.jsx      # Academic course registry and weekly timetable slots
│       ├── attendance/
│       │   ├── AttendancePage.jsx    # Numerical attendance manager, target threshold, safe skips
│       │   └── AddSubjectModal.jsx   # Add/edit subject modal with color picker and schedule slots
│       ├── assignments/
│       │   ├── AssignmentsPage.jsx   # Assignment Kanban/cards, multi-filters, sorting, overdue flags
│       │   └── AddAssignmentModal.jsx# Assignment creation and edit modal
│       ├── exams/
│       │   ├── ExamsPage.jsx         # Exam countdown cards, chronological timeline, syllabus tracker
│       │   └── AddExamModal.jsx      # Exam scheduler with topic checklist builder
│       ├── study/
│       │   ├── StudyPlannerPage.jsx  # Daily study scheduler, weekly pipeline, subject study meters
│       │   ├── PomodoroTimer.jsx     # Interactive 25/5/15 Pomodoro clock with streak counters
│       │   └── AddStudySessionModal.jsx # Schedule study session modal
│       ├── career/
│       │   └── CareerRoadmapPage.jsx # 6 role pathways with interactive milestones & free learning links
│       ├── projects/
│       │   ├── ProjectsPage.jsx      # Project portfolio manager with milestones, GitHub & live links
│       │   └── AddProjectModal.jsx   # Add/edit project modal with tech stack tagging
│       ├── resources/
│       │   ├── ResourceLibraryPage.jsx # Categorized bookmarks, favorites, search, external links
│       │   └── AddResourceModal.jsx  # Add resource bookmark modal
│       ├── notes/
│       │   ├── NotesPage.jsx         # Subject-categorized revision notes with pinning and search
│       │   └── NoteEditorModal.jsx   # Markdown note editor modal
│       ├── college/
│       │   ├── CollegeInfoPage.jsx   # University ERP portals, library, placement cell, faculty contacts
│       │   └── AddCollegeLinkModal.jsx # Add portal URL or department contact modal
│       ├── notifications/
│       │   └── NotificationPanel.jsx # Slide-out notification drawer with urgent alarms & browser push
│       └── settings/
│           └── SettingsPage.jsx      # Profile edit, theme toggle, JSON backup export/import, factory reset
│
├── context/
│   └── AppContext.jsx                # Single source of truth managing all states, actions, toasts, demo data
├── data/
│   ├── demoData.js                   # Realistic academic dataset generator with dynamic relative dates
│   └── roadmapsData.js               # Predefined 6-track career roadmap curriculums
├── utils/
│   └── calculations.js               # Mathematical formulas (attendance, countdowns, overdue, progress)
├── App.jsx                           # View switcher (Landing vs Dashboard workspace) & modal mounts
├── index.css                         # Tailwind directives, custom scrollbars, animations, glassmorphism
└── main.jsx                          # React 18 DOM mount and strict mode wrapper
```

---

## 4. State Management & Data Flow

```
[User Action in UI]
       │
       ▼
[Handler in Component] ──> Calls method from AppContext (e.g., markAttendance(), addAssignment())
                               │
                               ├─► 1. Computes new state immutably (useState)
                               ├─► 2. Synchronizes to Browser localStorage (useEffect)
                               ├─► 3. Dispatches Toast Notification & logs activity
                               └─► 4. Triggers Celebration (Canvas Confetti) if milestone reached
                               │
                               ▼
                    [Re-render Connected Components]
```

### 4.1 State Entities in AppContext
1. `userProfile`: Student identity, institution, degree, semester, career goal, target attendance %.
2. `subjects`: Array of course objects (`id`, `name`, `code`, `professor`, `room`, `color`, `schedule`).
3. `attendance`: Map keyed by subjectId (`total`, `present`, `absent`).
4. `assignments`: Array of assignment items (`id`, `title`, `subjectId`, `dueDate`, `priority`, `status`).
5. `exams`: Array of exam schedules (`id`, `subjectId`, `examType`, `examDate`, `examTime`, `syllabus: []`).
6. `studySessions`: Array of study focus blocks (`id`, `subjectId`, `topic`, `date`, `startTime`, `durationMinutes`, `completed`).
7. `careerRoadmaps`: Pre-structured roadmap trees with interactive checkbox states.
8. `projects`: Portfolio entities (`id`, `name`, `techStack: []`, `githubUrl`, `liveUrl`, `status`, `milestones: []`).
9. `resources`: Bookmarks (`id`, `title`, `category`, `url`, `tags: []`, `isFavorite`).
10. `notes`: Study notes (`id`, `title`, `category`, `content`, `updatedAt`, `isPinned`).
11. `collegeInfo`: Institution links (`portalUrl`, `examPortalUrl`, `quickLinks: []`, `contacts: []`).
12. `todayTasks`: Daily interactive checklist items (`id`, `text`, `completed`, `category`).
13. `activityLog`: Chronological student audit stream (last 20 logged actions).
14. `theme`: `'dark'` | `'light'` mode flag.
15. `currentView`: `'landing'` | `'dashboard'`.
16. `activeTab`: Active workspace module tab.

---

## 5. Persistence & LocalStorage Layer

Every major entity is stored under an isolated key in the browser’s `localStorage`:

| Storage Key | Data Structure | Purpose |
| :--- | :--- | :--- |
| `campusos_user_profile` | `Object` | Student metadata and target attendance threshold |
| `campusos_subjects` | `Array<Subject>` | Enrolled subjects and weekly lecture timings |
| `campusos_attendance` | `Record<subjectId, Stats>` | Present, absent, and total counts per subject |
| `campusos_assignments` | `Array<Assignment>` | Coursework, lab submissions, and priority flags |
| `campusos_exams` | `Array<Exam>` | Exam dates, timings, venues, and syllabus checklists |
| `campusos_study_sessions`| `Array<Session>` | Focus study blocks and durations |
| `campusos_career_roadmap`| `Record<roleKey, Roadmap>` | Career progression checklists and milestones |
| `campusos_projects` | `Array<Project>` | Capstone/side projects with GitHub and milestone state |
| `campusos_resources` | `Array<Resource>` | Bookmarks, category tags, and favorites |
| `campusos_college_info` | `Object` | University ERP URLs and department contact cards |
| `campusos_notes` | `Array<Note>` | Markdown revision notes and pinned flags |
| `campusos_tasks` | `Array<Task>` | Today's to-do items and completion status |
| `campusos_activity` | `Array<Activity>` | History of recent student actions |
| `campusos_theme` | `String` (`'dark'`/`'light'`) | Active theme preference |
| `campusos_onboarded` | `String` (`'true'`/`'false'`) | Onboarding completion flag |
| `campusos_has_visited` | `String` (`'true'`) | Landing page routing preference flag |

---

## 6. Mathematical & Business Logic Utilities (`src/utils/calculations.js`)

### 6.1 Attendance Formula
- **Percentage:**
  $$\text{Percentage} = \frac{\text{Present}}{\text{Total}} \times 100$$
- **Classes Needed ($\text{Percentage} < \text{Target } T$):**
  $$\text{Classes Needed} = \left\lceil \frac{T \cdot \text{Total} - \text{Present}}{1 - T} \right\rceil$$
- **Safe Skips Buffer ($\text{Percentage} \ge \text{Target } T$):**
  $$\text{Safe Skips} = \left\lfloor \frac{\text{Present} - T \cdot \text{Total}}{T} \right\rfloor$$

### 6.2 Exam Countdown Calculation
Computes calendar day difference normalized to midnight:
$$\Delta \text{Days} = \text{round}\left(\frac{\text{TargetDate} - \text{Today}}{86,400,000}\right)$$

### 6.3 Overdue Assignment Detection
Flags assignments where `dueDate < Today` and `status !== 'Completed'`.

---

## 7. Current Project Dependencies

```json
{
  "dependencies": {
    "canvas-confetti": "^1.9.4",
    "clsx": "^2.1.1",
    "lucide-react": "^1.16.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.5"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.7"
  }
}
```

---

## 8. Deployment Architecture

```
[Vite Build Process] ──> Compiles JS/JSX & Tailwind CSS ──> Generates /dist (static HTML, CSS, JS, SVG)
                                                                    │
                                                                    ▼
                                                 [Hosting: Vercel / GitHub Pages / Netlify]
                                                                    │
                                                                    ▼
                                                    [Global Edge CDN Distribution]
                                                                    │
                                                                    ▼
                                                         [End-User Browser]
```

---

## 9. Future Backend Architecture (When Scaling Beyond Version 1.0)

If a collaborative cloud-synced edition is introduced in the future:
1. **API Layer:** Node.js / Express or Fastify REST/GraphQL API or Supabase Edge Functions.
2. **Database:** PostgreSQL (with Prisma ORM) for relational modeling of users, classes, assignments, and notes.
3. **Authentication:** OAuth2 (Google / GitHub) + JWT sessions.
4. **Offline Sync Engine:** CRDTs (Yjs) or Local-First sync (ElectricSQL / RxDB / WatermelonDB) to retain instant offline local capability while synchronizing with the cloud when connected.

