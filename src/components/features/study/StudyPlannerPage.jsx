import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Target,
  Plus,
  Clock,
  CheckCircle2,
  Circle,
  Trash2,
  Calendar,
  Sparkles,
  BookOpen,
  Flame,
  Check
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../../common/Card';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import { ProgressBar } from '../../common/ProgressBar';
import { EmptyState } from '../../common/EmptyState';
import { PomodoroTimer } from './PomodoroTimer';
import { AddStudySessionModal } from './AddStudySessionModal';

export const StudyPlannerPage = () => {
  const {
    studySessions,
    subjects,
    toggleStudySession,
    deleteStudySession,
    loadDemoData
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  // Today's sessions
  const todaySessions = studySessions.filter((s) => s.date === todayStr);

  // Upcoming & Past sessions
  const otherSessions = studySessions
    .filter((s) => s.date !== todayStr)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Total Study Minutes Logged
  const completedMinutes = studySessions
    .filter((s) => s.completed)
    .reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0);

  const completedHours = (completedMinutes / 60).toFixed(1);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Study Planner & Focus Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Structure your revision blocks, track weekly study consistency, and enter deep work mode.
          </p>
        </div>

        <Button onClick={() => setIsAddModalOpen(true)} icon={Plus}>
          Plan Study Session
        </Button>
      </div>

      {/* Top Banner Grid: Pomodoro & Study Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Col: Built-in Pomodoro Timer */}
        <div className="lg:col-span-1">
          <PomodoroTimer />
        </div>

        {/* Right 2 Cols: Study KPIs & Subject Breakdown */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="p-4 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/20">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Total Focus Time
              </span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {completedHours} hrs
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Completed study blocks</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Sessions Finished
              </span>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">
                {studySessions.filter((s) => s.completed).length} / {studySessions.length}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Checkpoints cleared</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Active Streak
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  5 Days
                </p>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Consistent revision</p>
            </Card>
          </div>

          {/* Subject Study Progress Card */}
          <Card className="p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>Subject Revision Coverage</span>
            </h3>
            <div className="space-y-3">
              {subjects.map((sub) => {
                const subSessions = studySessions.filter((s) => s.subjectId === sub.id);
                const done = subSessions.filter((s) => s.completed).length;
                const total = subSessions.length;
                const pct = total > 0 ? Math.round((done / total) * 100) : 50;

                return (
                  <div key={sub.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {sub.name}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 font-bold">
                        {pct}% ({done}/{total || 1} sessions)
                      </span>
                    </div>
                    <ProgressBar progress={pct} size="sm" color="auto" />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Today's Study Sessions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <span>Today's Study Schedule</span>
          </h2>
          <span className="text-xs text-slate-500">
            {todaySessions.length} {todaySessions.length === 1 ? 'block' : 'blocks'} scheduled
          </span>
        </div>

        {todaySessions.length === 0 ? (
          <div className="p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
            No specific study blocks scheduled for today yet. Use the "Plan Study Session" button to allocate focus time.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todaySessions.map((s) => (
              <Card
                key={s.id}
                className={`p-4 flex flex-col justify-between border-l-4 ${
                  s.completed ? 'border-l-emerald-500 opacity-80' : 'border-l-indigo-500'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                      {s.subjectName}
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {s.startTime} ({s.durationMinutes}m)
                    </span>
                  </div>

                  <h4
                    className={`text-sm font-bold text-slate-900 dark:text-white ${
                      s.completed ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    {s.topic}
                  </h4>
                  {s.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {s.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => toggleStudySession(s.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      s.completed
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                    }`}
                  >
                    {s.completed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Done</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Complete Session</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => deleteStudySession(s.id)}
                    className="p-1 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Study Schedule List */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-500" />
          <span>Weekly Study Pipeline</span>
        </h2>

        {otherSessions.length === 0 ? (
          <div className="p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            No upcoming sessions beyond today.
          </div>
        ) : (
          <div className="space-y-2.5">
            {otherSessions.map((s) => (
              <div
                key={s.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    onClick={() => toggleStudySession(s.id)}
                    className="mt-0.5 text-slate-400 hover:text-indigo-600 shrink-0"
                  >
                    {s.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <h4
                      className={`text-sm font-bold text-slate-900 dark:text-white truncate ${
                        s.completed ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {s.topic}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {s.subjectName} • {s.date} at {s.startTime} ({s.durationMinutes}m)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Badge variant={s.completed ? 'success' : 'default'} size="sm">
                    {s.completed ? 'Completed' : 'Scheduled'}
                  </Badge>
                  <button
                    onClick={() => deleteStudySession(s.id)}
                    className="p-1 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Study Session Modal */}
      {isAddModalOpen && (
        <AddStudySessionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
};

