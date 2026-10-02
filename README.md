# 🎓 CampusOS – Your Entire College Life, in One Place

> **A startup-quality, privacy-first, all-in-one operating system designed for modern college students.**

CampusOS streamlines your daily academic life into one central command center. Manage your lecture attendance, assignments, exam countdowns, study sessions, career roadmaps, projects, and resources — all running locally in your browser with **zero subscription fees, zero required API keys, and 100% offline-ready client-side persistence**.

---

## ✨ Features Overview

1. **🌟 Interactive Landing Page** – Modern high-conversion hero, live interactive preview mockup, and feature showcase.
2. **🚀 Instant Onboarding** – Quick 30-second setup for your Name, College, Course, Branch, Semester, and Target Career Goal.
3. **🏠 Smart Central Dashboard**:
   - Time-sensitive greeting (`"Good morning, [Name] 👋"`)
   - Daily timetable and lecture halls
   - Upcoming assignment deadlines with priority badges
   - Overall attendance progress with smart safety alerts
   - Exam countdown timers (e.g. *"DSA exam in 6 days"*)
   - Subject study progress meters
   - Interactive daily task checklist
   - Live activity stream
4. **📊 Attendance Management System**:
   - Accurate formula: $\text{Attendance } \% = \left(\frac{\text{Classes Attended}}{\text{Total Classes}}\right) \times 100$
   - One-click `+ Present` and `+ Absent` loggers
   - Automated calculation: *"Need X more classes to reach 75%"* or *"Can safely miss Y more classes while staying above 75%"*
   - Customizable target threshold (default 75%)
5. **📝 Assignment & Deadline Manager**:
   - Card-based task tracker with priority badges (*High*, *Medium*, *Low*)
   - Real-time **Overdue** warning status
   - Filter by status (*To Do*, *In Progress*, *Completed*), priority, or subject
   - Sort by earliest deadline, latest deadline, priority, or title
6. **📅 Exam Planner & Timeline**:
   - Automatic days remaining countdown ticker
   - Topic-by-topic syllabus checklist with preparation progress bars
   - Switch between visual Card view and Chronological Timeline view
   - Examination hall and permitted items notes
7. **🎯 Study Planner & Integrated Pomodoro**:
   - Built-in Pomodoro focus timer (25 min focus / 5 min short break / 15 min long break)
   - Today's study blocks and weekly revision schedule
   - Subject study coverage indicators and focus streak counters
8. **🚀 Structured Career Roadmaps (No AI API required)**:
   - Built-in industry pathways for:
     - **Software Developer** (Fundamentals, DSA, Core CS, Git, FullStack, Resume, Mock Interviews)
     - **Web Developer** (HTML/CSS, JS ES6+, React, Node.js/Express, Databases, Deployments)
     - **Data Analyst** (Excel, SQL, Pandas/NumPy, Tableau/PowerBI, Applied Stats, Case Studies)
     - **AI/ML Engineer** (Linear Algebra, Scikit-Learn, PyTorch, Transformers/NLP, RAG, MLOps)
     - **Cybersecurity** (Networking, Linux/Bash, OWASP Top 10, Cryptography, CTF labs)
     - **UI/UX Designer** (Visual Foundations, Figma Mastery, User Research, Prototyping, Case Studies)
   - Step-by-step checklists with progress score and verified free course links
9. **💻 Project Portfolio Tracker**:
   - Track major semester projects, hackathon prototypes, and portfolio apps
   - Tech stack badges, milestones checklists, GitHub links, and live demo buttons
10. **🔖 Academic & Career Resource Vault**:
    - Bookmark links under *DSA*, *Programming*, *College*, *Internships*, *Projects*, *Career*, and *Learning*
    - Tagging, favorites, and search
11. **🏛 College Portals & Directory**:
    - Centralize university ERP, exam portals, library OPAC, and placement cells
    - Faculty and department contact book with direct email/phone actions
12. **🗒 Class Notes & Cheatsheets**:
    - Categorized notes (*DSA*, *DBMS*, *OS*, *Computer Networks*, *Mathematics*, *Other*)
    - Pin important notes to top
    - Full search across note titles and content
13. **🔍 Global Quick Search (⌘K / Ctrl+K)**:
    - Search across all assignments, exams, subjects, notes, projects, and bookmarks in real-time
14. **🔔 Smart Notification Center**:
    - Proactive alerts for low attendance, upcoming exams, overdue tasks, and today's study sessions
    - Optional native browser notification permission toggle
15. **⚙ Settings & Privacy**:
    - Dark mode and Light mode support
    - Full **JSON Backup Export** & **Restore from JSON**
    - One-click **Load Demo Data** and Factory Reset
    - 100% private: stored in your browser's `localStorage`

---

## 🛠 Project Structure

```
CampusOS/
├── public/
│   ├── favicon.svg               # Vector brand logo & icon
│   └── manifest.json             # Progressive Web App manifest
├── src/
│   ├── components/
│   │   ├── common/               # Reusable UI primitives (Button, Modal, Card, Badge, ProgressBar, Toast)
│   │   ├── layout/               # Top Navbar, Sidebar, MobileNav bottom dock, GlobalSearchModal
│   │   └── features/
│   │       ├── landing/          # Landing Page (Hero, mockup, feature highlights)
│   │       ├── onboarding/       # Setup modal for new students
│   │       ├── dashboard/        # Central Dashboard widgets and feeds
│   │       ├── subjects/         # Course registry and timetable
│   │       ├── attendance/       # Attendance tracker and calculations
│   │       ├── assignments/      # Assignment board, filters, and priority tags
│   │       ├── exams/            # Exam planner, syllabus checklists, and timeline
│   │       ├── study/            # Study planner and Pomodoro timer
│   │       ├── career/           # 6 Career roadmaps with interactive checklists
│   │       ├── projects/         # Portfolio and capstone project manager
│   │       ├── resources/        # Bookmarked resources by category
│   │       ├── college/          # University links and faculty directory
│   │       ├── notes/            # Markdown notes and cheatsheets
│   │       ├── notifications/    # Alert drawer and browser notifications
│   │       └── settings/         # Profile edit, theme toggle, JSON backup/restore
│   ├── context/
│   │   └── AppContext.jsx        # Unified reactive state manager with LocalStorage persistence
│   ├── data/
│   │   ├── demoData.js           # Rich realistic academic demo dataset
│   │   └── roadmapsData.js       # Predefined curated career roadmap curriculums
│   ├── utils/
│   │   └── calculations.js       # Accurate attendance formulas, countdowns & progress metrics
│   ├── App.jsx                   # Main workspace router and layout wrapper
│   ├── index.css                 # Tailwind CSS styles and glassmorphism helpers
│   └── main.jsx                  # React DOM entry point
├── index.html                    # SEO tags, typography, and OpenGraph metadata
├── package.json                  # Dependencies (React 18, Lucide Icons, Canvas Confetti)
├── tailwind.config.js            # Tailwind CSS configuration & custom dark theme
└── vite.config.js                # Vite build configuration
```

---

## 🚀 Beginner Quick-Start Guide

### Step 1: Install Node.js (If you don't have it)
1. Visit [nodejs.org](https://nodejs.org/) and download the **LTS (Recommended For Most Users)** version.
2. Run the installer and click **Next** until finished.
3. Open your terminal (or Command Prompt / PowerShell on Windows) and verify by typing:
   ```bash
   node -v
   npm -v
   ```

### Step 2: Open the Project Folder
Open your terminal and navigate to the project directory:
```bash
cd "c:\Users\Stuti Srivastava\Student-Os"
```

### Step 3: Install Dependencies
Run the install command:
```bash
npm install
```

### Step 4: Run the Development Server
Start the website with:
```bash
npm run dev
```

### Step 5: Open in Your Browser
Open your web browser (Chrome, Edge, Safari, Firefox) and go to:
```
http://localhost:5173
```
You will immediately see CampusOS running!

---

## ⚡ How to Build for Production & Deploy

### Option 1: Deploy on Vercel (Recommended - Free & 1 Click)
1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Click **"Deploy"**. Vercel will build and give you a live HTTPS URL in under 60 seconds!

### Option 2: Build Locally
To create an optimized production build:
```bash
npm run build
```
This will generate a `dist/` folder containing static HTML, CSS, and JS files ready to host anywhere.

---

## 🔒 Privacy & Local Storage
CampusOS values student privacy. All your data is saved in your browser's `localStorage` and never leaves your device. You can export a JSON backup at any time from **Settings > Export JSON Backup**.

