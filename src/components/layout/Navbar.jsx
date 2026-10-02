import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Sun,
  Moon,
  Bell,
  Sparkles,
  Menu,
  GraduationCap,
  ChevronRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { calculateOverallAttendance } from '../../utils/calculations';

export const Navbar = ({ onOpenMobileMenu }) => {
  const {
    theme,
    toggleTheme,
    setIsSearchOpen,
    setIsNotificationsOpen,
    userProfile,
    attendance,
    assignments,
    exams,
    loadDemoData,
    setCurrentView,
    activeTab,
    setActiveTab
  } = useApp();

  const overall = calculateOverallAttendance(attendance, userProfile.targetAttendancePercentage || 75);

  // Count unread notifications
  const overdueCount = assignments.filter(
    (a) => a.status !== 'Completed' && new Date(a.dueDate) < new Date()
  ).length;
  const upcomingExamsCount = exams.filter((e) => {
    const diff = Math.round((new Date(e.examDate) - new Date()) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 7;
  }).length;
  const hasLowAttendance = overall.status !== 'good' && overall.total > 0;
  const notificationCount = (overdueCount > 0 ? 1 : 0) + (upcomingExamsCount > 0 ? 1 : 0) + (hasLowAttendance ? 1 : 0);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md transition-colors">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              setActiveTab('dashboard');
            }}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Campus<span className="text-indigo-600 dark:text-indigo-400">OS</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
                  v1.0
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Middle: Global Search Bar trigger */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-400 bg-slate-100/70 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search subjects, exams, notes, assignments...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Mobile search button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Load Demo Data pill button */}
          <button
            onClick={loadDemoData}
            title="Populate with rich sample college dataset"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-amber-500/10 to-indigo-500/10 hover:from-amber-500/20 hover:to-indigo-500/20 text-amber-700 dark:text-amber-300 border border-amber-300/40 dark:border-amber-700/40 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Load Demo Data</span>
          </button>

          {/* Landing Page link */}
          <button
            onClick={() => setCurrentView('landing')}
            title="View Landing Page"
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Landing</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 animate-fade-in" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600 animate-fade-in" />
            )}
          </button>

          {/* Notifications button */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            )}
          </button>

          {/* Profile capsule */}
          <div
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center overflow-hidden shadow-inner">
              {userProfile.avatarUrl ? (
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'S'
              )}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                {userProfile.name || 'Student'}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                {userProfile.course || 'B.Tech'} • {userProfile.semester || '4th Sem'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

