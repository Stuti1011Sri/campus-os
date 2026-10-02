import React from 'react';
import { useApp } from '../../../context/AppContext';
import {
  GraduationCap,
  Sparkles,
  PieChart,
  CheckSquare,
  CalendarDays,
  Target,
  Compass,
  FolderGit2,
  Bookmark,
  ShieldCheck,
  ArrowRight,
  Zap,
  Star,
  Users,
  Check,
  LayoutDashboard,
  Clock,
  BookOpen
} from 'lucide-react';
import { Button } from '../../common/Button';

export const LandingPage = () => {
  const { setCurrentView, setIsOnboardingOpen, loadDemoData, userProfile, isOnboarded } = useApp();

  const handleGetStarted = () => {
    if (isOnboarded) {
      setCurrentView('dashboard');
    } else {
      setIsOnboardingOpen(true);
    }
  };

  const handleTryDemo = () => {
    loadDemoData();
    setCurrentView('dashboard');
  };

  const FEATURES = [
    {
      icon: LayoutDashboard,
      title: 'Smart Central Dashboard',
      description: 'Unified command center showing your daily timetable, live attendance percentage, exam countdowns, and quick checklists.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: PieChart,
      title: 'Attendance Tracker',
      description: 'Accurate attendance calculations with smart alerts: exactly how many classes you must attend or can safely miss to stay above 75%.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: CheckSquare,
      title: 'Assignment Manager',
      description: 'Card-based Kanban manager with deadlines, priorities, filters, overdue status warnings, and one-click completion.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: CalendarDays,
      title: 'Exam Planner & Timeline',
      description: 'Countdown tickers for midterms and finals with topic-by-topic syllabus trackers and examination hall notes.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Target,
      title: 'Study Planner & Pomodoro',
      description: 'Plan daily study sessions, track subject study hours, weekly calendar scheduling, and maintain productive study streaks.',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: Compass,
      title: 'Structured Career Roadmaps',
      description: 'Built-in step-by-step checklists for Software Engineering, AI/ML, Data Analytics, Cybersecurity, and UI/UX design.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FolderGit2,
      title: 'Project Portfolio Tracker',
      description: 'Organize personal and college capstone projects, manage milestones, tech stacks, GitHub repositories, and live links.',
      color: 'from-sky-500 to-indigo-500'
    },
    {
      icon: Bookmark,
      title: 'College Resource Vault',
      description: 'Curated repository for DSA sheets, free full-stack tutorials, internship trackers, textbooks, and college links.',
      color: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">
              Campus<span className="text-indigo-600 dark:text-indigo-400">OS</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTryDemo}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Explore Demo</span>
            </button>

            <Button onClick={handleGetStarted} size="sm" icon={ArrowRight}>
              {isOnboarded ? 'Open Dashboard' : 'Get Started'}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>The All-in-One Operating System for College Students</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
            Your entire college life,{' '}
            <span className="text-gradient">in one place.</span>
          </h1>

          {/* Tagline / Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-6 leading-relaxed">
            Manage your classes, assignments, exams, attendance, projects and career goals from one simple, beautiful dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-base font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleTryDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Launch Live Interactive Demo</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" /> 100% Free & No API Keys Required
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Private Local Storage
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> Works Instantly Offline
            </span>
          </div>

          {/* Live Interactive Dashboard Mockup Preview */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="p-2 sm:p-3 rounded-2xl sm:rounded-3xl bg-slate-900/10 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-white dark:bg-[#0E1424] border border-slate-200/80 dark:border-slate-800/80 text-left p-5 sm:p-7 space-y-6">
                {/* Mockup Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-slate-900 dark:text-white">
                        Good morning, Aryan Sharma 👋
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        B.Tech CSE
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      National Institute of Technology • Target Goal: Software Developer
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleTryDemo}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
                    >
                      Open Live Dashboard
                    </button>
                  </div>
                </div>

                {/* Mockup Mini Widgets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Attendance Card */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2">
                      <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                        <PieChart className="w-4 h-4" />
                        <span>Overall Attendance</span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-500">82.3%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '82%' }} />
                    </div>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-2">
                      Safe! Can miss 3 more classes and stay above 75%.
                    </p>
                  </div>

                  {/* Exam Countdown */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                        <CalendarDays className="w-4 h-4" />
                        <span>Next Exam</span>
                      </div>
                      <span className="text-xs font-extrabold text-amber-500">In 6 days</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Data Structures & Algorithms
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Mid-Term • Hall B-302 • 10:00 AM
                    </p>
                  </div>

                  {/* Career Goal */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold">
                        <Compass className="w-4 h-4" />
                        <span>Career Pathway</span>
                      </div>
                      <span className="text-xs font-extrabold text-purple-500">45% Complete</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      Software Developer
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Step 3: Core CS & Operating Systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
              Everything You Need To Excel
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Built for real college workflows, not just tutorials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-lg transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.color} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
            Take control of your college journey today.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8">
            No signup forms or credit cards required. Your student dashboard is saved securely inside your browser.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button onClick={handleGetStarted} size="lg" icon={ArrowRight}>
              Open CampusOS Now
            </Button>
            <Button onClick={handleTryDemo} variant="secondary" size="lg" icon={Sparkles}>
              Load Demo Workspace
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>© 2026 CampusOS. Crafted with care for ambitious students worldwide.</p>
        <p className="mt-1">All data stored locally in your browser (LocalStorage). No tracking.</p>
      </footer>
    </div>
  );
};

