import React from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Bell,
  AlertTriangle,
  Calendar,
  CheckSquare,
  Clock,
  PieChart,
  FolderGit2,
  X,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { calculateSubjectAttendance, getDaysRemaining, isAssignmentOverdue } from '../../../utils/calculations';

export const NotificationPanel = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    subjects,
    attendance,
    assignments,
    exams,
    studySessions,
    projects,
    userProfile,
    setActiveTab,
    showToast
  } = useApp();

  if (!isNotificationsOpen) return null;

  const targetAttendance = userProfile.targetAttendancePercentage || 75;

  // 1. Attendance alerts
  const lowAttendanceSubjects = subjects
    .map((sub) => {
      const att = attendance[sub.id] || { present: 0, total: 0 };
      const stats = calculateSubjectAttendance(att.present, att.total, targetAttendance);
      return { ...sub, stats };
    })
    .filter((sub) => sub.stats.status !== 'good' && sub.stats.total > 0);

  // 2. Overdue or upcoming assignments (<= 3 days)
  const urgentAssignments = assignments
    .map((a) => {
      const isOverdue = isAssignmentOverdue(a.dueDate, a.status);
      const remaining = getDaysRemaining(a.dueDate);
      return { ...a, isOverdue, remaining };
    })
    .filter((a) => a.status !== 'Completed' && (a.isOverdue || (remainingDays(a.dueDate) <= 3 && remainingDays(a.dueDate) >= 0)));

  // 3. Upcoming exams (<= 7 days)
  const urgentExams = exams
    .map((e) => ({ ...e, remaining: getDaysRemaining(e.examDate) }))
    .filter((e) => !e.remaining.isPast && e.remaining.days <= 7);

  // 4. Today's study sessions
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySessions = studySessions.filter((s) => s.date === todayStr && !s.completed);

  function remainingDays(dateStr) {
    if (!dateStr) return 99;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    return Math.round((target - today) / (1000 * 60 * 60 * 24));
  }

  const handleRequestBrowserNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('CampusOS Notifications Enabled', {
          body: 'You will receive reminders for upcoming exams and low attendance directly in your browser.',
          icon: '/favicon.svg'
        });
        showToast('Notifications Active! 🔔', 'Local browser reminders enabled');
      } else {
        showToast('Permission Denied', 'Browser notifications were not allowed', 'warning');
      }
    } else {
      showToast('Not Supported', 'Browser notifications are not supported in this browser', 'info');
    }
  };

  const totalAlerts =
    lowAttendanceSubjects.length + urgentAssignments.length + urgentExams.length + todaySessions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsNotificationsOpen(false)}
      />

      {/* Slide-out drawer */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 animate-slide-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Notifications & Alerts
            </h3>
            {totalAlerts > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                {totalAlerts}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alerts Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {totalAlerts === 0 ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 mx-auto flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                All caught up! 🎉
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                No urgent warnings. Your attendance is in the green and deadlines are under control.
              </p>
            </div>
          ) : (
            <>
              {/* Low Attendance Warnings */}
              {lowAttendanceSubjects.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Low Attendance Alerts ({lowAttendanceSubjects.length})</span>
                  </div>
                  {lowAttendanceSubjects.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => {
                        setActiveTab('attendance');
                        setIsNotificationsOpen(false);
                      }}
                      className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 cursor-pointer hover:border-rose-300 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-900 dark:text-rose-200">
                          {sub.name}
                        </span>
                        <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">
                          {sub.stats.formattedPercentage}
                        </span>
                      </div>
                      <p className="text-[11px] text-rose-700 dark:text-rose-300 mt-1">
                        {sub.stats.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Urgent Deadlines */}
              {urgentAssignments.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Assignments Due Soon ({urgentAssignments.length})</span>
                  </div>
                  {urgentAssignments.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => {
                        setActiveTab('assignments');
                        setIsNotificationsOpen(false);
                      }}
                      className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 cursor-pointer hover:border-amber-300 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-900 dark:text-amber-200 truncate pr-2">
                          {a.title}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200/60 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 shrink-0">
                          {a.isOverdue ? 'OVERDUE' : a.remaining.text}
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-1">
                        {a.subjectName} • Due {a.dueDate}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Upcoming Exams */}
              {urgentExams.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Exams This Week ({urgentExams.length})</span>
                  </div>
                  {urgentExams.map((e) => (
                    <div
                      key={e.id}
                      onClick={() => {
                        setActiveTab('exams');
                        setIsNotificationsOpen(false);
                      }}
                      className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 cursor-pointer hover:border-indigo-300 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                          {e.subjectName} ({e.examType})
                        </span>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {e.remaining.text}
                        </span>
                      </div>
                      <p className="text-[11px] text-indigo-700 dark:text-indigo-300 mt-1">
                        Date: {e.examDate} • {e.examTime}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Today's Study Sessions */}
              {todaySessions.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Scheduled Today ({todaySessions.length})</span>
                  </div>
                  {todaySessions.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setActiveTab('study');
                        setIsNotificationsOpen(false);
                      }}
                      className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 cursor-pointer hover:border-purple-300 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-900 dark:text-purple-200">
                          {s.topic}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-200/60 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                          {s.startTime} ({s.durationMinutes}m)
                        </span>
                      </div>
                      <p className="text-[11px] text-purple-700 dark:text-purple-300 mt-1">
                        {s.subjectName}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer with browser notification button */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <button
            onClick={handleRequestBrowserNotifications}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enable Native Browser Reminders</span>
          </button>
        </div>
      </div>
    </div>
  );
};
