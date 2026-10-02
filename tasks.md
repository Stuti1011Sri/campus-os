# Project Tasks & Engineering Roadmap — CampusOS

This document tracks all completed features, active initiatives, bug fixes, and future roadmap tasks for **CampusOS**.

**Legend:**
- `[x]` Completed (Implemented and verified in the current codebase)
- `[~]` In Progress (Under active refinement)
- `[ ]` Not Started (Planned for upcoming versions)

---

## 1. Core Architecture & Infrastructure

- [x] Initialize React 18 + Vite 6 build configuration
- [x] Configure Tailwind CSS 3.4 with custom dark mode colors and glassmorphism helpers
- [x] Setup central reactive `AppContext` for global application state
- [x] Implement browser `localStorage` synchronization across all 15 state keys
- [x] Build mathematical calculation engine for attendance, exam countdowns, and progress metrics (`src/utils/calculations.js`)
- [x] Build dynamic demo data generator with relative dates (`src/data/demoData.js`)
- [x] Build 6 structured career roadmap datasets (`src/data/roadmapsData.js`)
- [x] Configure PWA manifest (`manifest.json`) and vector favicon (`favicon.svg`)
- [x] Verify production build pipeline (`npm run build`) with zero errors

---

## 2. Feature Implementation (Current Implementation)

### 2.1 Landing Page & Onboarding
- [x] Create modern responsive Landing Page with Hero section and gradient glows
- [x] Implement live interactive Dashboard Preview mockup on Landing Page
- [x] Add feature showcase grid detailing all 8 core student modules
- [x] Build 30-second Onboarding Modal for Name, College, Course, Branch, Semester, and Career Goal
- [x] Add 1-click "Load Demo Data" shortcut for immediate evaluation

### 2.2 Dashboard
- [x] Create personalized dynamic greeting based on current time of day
- [x] Build "Today's Classes" widget auto-synced with weekday timetable and instant `+ Present`/`+ Absent` buttons
- [x] Build "Upcoming Deadlines" widget with priority badges and 1-click completion
- [x] Build "Overall Attendance Snapshot" card with target threshold indicator
- [x] Build "Exam Countdown" ticker widget showing nearest tests and remaining days
- [x] Build "Subject Study Progress" meters showing syllabus coverage
- [x] Build "Career Milestone" progress snapshot
- [x] Build "Today's Tasks" interactive daily checklist with add/delete/toggle
- [x] Build "Recent Activity" stream logging latest student actions

### 2.3 Attendance Tracker
- [x] Build subject-wise attendance cards displaying Total, Present, Absent, and Percentage
- [x] Implement exact formula: $(\text{Present} / \text{Total}) \times 100$
- [x] Implement automated calculation for classes needed to reach $75\%$ or safe skips buffer
- [x] Implement instant `+ Present` and `+ Absent` loggers with activity audit
- [x] Build custom target attendance threshold slider (50% – 90%)
- [x] Build Add/Edit/Delete Subject modal with timetable slots and color badge selector

### 2.4 Assignment Manager
- [x] Build card-based assignment board with priority tags (*High*, *Medium*, *Low*)
- [x] Implement status tracking (*To Do*, *In Progress*, *Completed*)
- [x] Implement automatic real-time Overdue detection and visual warning banners
- [x] Add search bar for assignment titles and descriptions
- [x] Add multi-level filtering by priority, status, and subject
- [x] Add sorting options (Deadline Earliest/Latest, Priority, Title A-Z)
- [x] Build Add/Edit/Delete Assignment modal

### 2.5 Exam Planner & Timeline
- [x] Build exam countdown calculator with dynamic days remaining
- [x] Implement interactive chapter-by-chapter syllabus checklist with progress bars
- [x] Implement dual view modes: Visual Cards View and Chronological Timeline View
- [x] Add support for Exam Types (*Mid-Term*, *End-Term*, *Practical/Viva*, *Quiz*)
- [x] Add Examination Hall/Venue notes and permitted materials instructions
- [x] Build Schedule/Edit/Delete Exam modal

### 2.6 Study Planner & Pomodoro Focus Timer
- [x] Build interactive Pomodoro Focus Timer (25m Focus / 5m Break / 15m Long Break)
- [x] Add Pomodoro interval controls (Start, Pause, Reset) and completed sprint streak tracker
- [x] Build Today's Study Sessions checklist
- [x] Build Weekly Study Schedule pipeline
- [x] Build Subject Study Coverage progress meters
- [x] Build Schedule Study Session modal

### 2.7 Career Roadmaps
- [x] Pre-build 6 complete industry career pathways:
  - [x] Software Developer (SDE)
  - [x] Web Developer
  - [x] Data Analyst
  - [x] AI/ML Engineer
  - [x] Cybersecurity
  - [x] UI/UX Designer
- [x] Add interactive checklist milestones per progression stage
- [x] Compute step-level and career-level completion percentages
- [x] Add curated, verified free course and tutorial links per step
- [x] Add "Set as Dashboard Goal" button

### 2.8 Project Portfolio Tracker
- [x] Build project cards with tech stack badges and lifecycle status
- [x] Implement milestone sub-checklists with automatic project percentage calculation
- [x] Add direct GitHub repository and live demo link buttons
- [x] Add project status filter (*Planning*, *Development*, *Testing*, *Completed*)
- [x] Build Add/Edit/Delete Project modal

### 2.9 Resource Library, Notes & College Directory
- [x] Build Resource Vault with 7 categories (*DSA*, *Programming*, *Internships*, *Career*, *Projects*, *Learning*, *College*)
- [x] Add resource bookmarking, tags, favorite starring, search, and external links
- [x] Build Notes section with markdown preview and category sorting
- [x] Add Note Pinning capability to keep critical formulas on top
- [x] Build College Information directory for university portals (ERP, Exams, Library, Placements)
- [x] Build Faculty & Advisor contact directory with direct email/phone triggers

### 2.10 Navigation, Global Search & Alerts
- [x] Build Global Quick Search (`⌘K` / `Ctrl+K`) across all 6 core modules
- [x] Build Notification Center with low attendance warnings, upcoming exams, and overdue deadlines
- [x] Add Native Browser Push Notification permission request toggle
- [x] Build Responsive Desktop Sidebar with real-time dynamic count badges
- [x] Build Mobile Bottom Navigation Dock (`MobileNav`) for 1-tap mobile navigation
- [x] Build floating Toast Notification system with auto-dismiss
- [x] Add celebration confetti animations on milestone completion

### 2.11 Settings & Data Management
- [x] Build Student Profile editor
- [x] Build Dark / Light Mode theme toggle
- [x] Build Full JSON Backup Export
- [x] Build JSON Backup Restore with schema validation
- [x] Add 1-click "Reload Demo Dataset" action
- [x] Add "Reset All Data" with safety confirmation modal

---

## 3. Current In-Progress & Active Refinements

- [~] Fine-tune accessibility aria labels across all modal close buttons
- [~] Add custom printable study schedule export (PDF export preview)
- [~] Optimize PWA Service Worker caching for complete offline app shell support

---

## 4. Future Roadmap Tasks

### 4.1 UI & UX Improvements
- [ ] Add drag-and-drop Kanban board column reordering for Assignments
- [ ] Add rich text / markdown editor toolbar for Notes (Bold, Italic, Code block, List)
- [ ] Add customizable sound effects for Pomodoro timer finish and confetti celebrations
- [ ] Add calendar grid view for monthly assignment and exam layout

### 4.2 Feature Expansions
- [ ] [Planned] GPA / CGPA Semester Grade Calculator with target grade forecasting
- [ ] [Planned] University Timetable PDF / Image OCR parser to auto-fill weekly schedule
- [ ] [Planned] Google Calendar & Apple Calendar `.ics` subscription feed
- [ ] [Planned] Peer study rooms with WebRTC or shared synchronized focus clocks
- [ ] [Planned] Flashcard revision mode linked to Subject Notes

### 4.3 Testing & Quality Assurance
- [ ] Setup Vitest / React Testing Library unit tests for `calculations.js`
- [ ] Setup Cypress / Playwright end-to-end tests for attendance and assignment workflows
- [ ] Conduct automated Lighthouse performance, accessibility, and SEO audits

### 4.4 Deployment & Distribution
- [ ] Setup automated GitHub Actions workflow for automated test & Vercel deployment
- [ ] Package mobile Android / iOS build via Capacitor or React Native wrapper
- [ ] Submit Progressive Web App to Microsoft Store and Chrome Web Store

### 4.5 Security & Privacy
- [ ] Add optional master PIN / biometric lock for locally stored notes
- [ ] Add client-side AES encryption for sensitive local JSON backups

