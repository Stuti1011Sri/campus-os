import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  PieChart,
  CheckSquare,
  CalendarDays,
  Target,
  Compass,
  FolderGit2,
  Bookmark,
  FileText,
  Building2,
  Settings,
  Flame,
  ChevronRight
} from 'lucide-react';
import { calculateOverallAttendance, getDaysRemaining } from '../../utils/calculations';

export const Sidebar = ({ isMobile = false, onCloseMobile }) => {
  const {
    activeTab,
    setActiveTab,
    attendance,
    assignments,
    exams,
    userProfile
  } = useApp();

  const overall = calculateOverallAttendance(attendance, userProfile.targetAttendancePercentage || 75);
  const pendingAssignments = assignments.filter((a) => a.status !== 'Completed').length;

  // Next upcoming exam
  const upcomingExams = exams
    .map((e) => ({ ...e, remaining: getDaysRemaining(e.examDate) }))
    .filter((e) => !e.remaining.isPast)
    .sort((a, b) => a.remaining.days - b.remaining.days);

  const nextExam = upcomingExams[0];

  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, badge: null },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: PieChart,
      badge: overall.total > 0 ? overall.formattedPercentage : null,
      badgeColor: overall.status === 'good' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
    },
    {
      id: 'assignments',
      label: 'Assignments',
      icon: CheckSquare,
      badge: pendingAssignments > 0 ? String(pendingAssignments) : null,
      badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
    },
    {
      id: 'exams',
      label: 'Exams',
      icon: CalendarDays,
      badge: nextExam ? (nextExam.remaining.days === 0 ? 'Today' : `${nextExam.remaining.days}d`) : null,
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    { id: 'study', label: 'Study Planner', icon: Target, badge: null },
    { id: 'career', label: 'Career Roadmap', icon: Compass, badge: 'Hot', badgeColor: 'bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-rose-500 border-rose-500/20' },
    { id: 'projects', label: 'Projects', icon: FolderGit2, badge: null },
    { id: 'resources', label: 'Resources', icon: Bookmark, badge: null },
    { id: 'notes', label: 'Notes', icon: FileText, badge: null },
    { id: 'college', label: 'College Info', icon: Building2, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null }
  ];

  const handleNav = (tabId) => {
    setActiveTab(tabId);
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside className="w-64 flex flex-col h-full bg-white dark:bg-[#0E1424] border-r border-slate-200/80 dark:border-slate-800/80 transition-colors select-none">
      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Main Menu
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md border ${
                    isActive
                      ? 'bg-white/20 text-white border-white/30'
                      : item.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Goal mini banner at sidebar bottom */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/80">
        <div
          onClick={() => handleNav('career')}
          className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 hover:border-indigo-500/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>Target Career</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate">
            {userProfile.careerGoal || 'Software Developer'}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
            Click to track milestones
          </p>
        </div>
      </div>
    </aside>
  );
};

