import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  PieChart,
  CalendarDays,
  CheckSquare,
  Clock,
  Compass,
  Sparkles,
  Plus,
  ArrowRight,
  CheckCircle2,
  Circle,
  AlertTriangle,
  BookOpen,
  FolderGit2,
  Trash2,
  FileText,
  MapPin
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { ProgressBar } from '../../common/ProgressBar';
import { Button } from '../../common/Button';
import {
  calculateOverallAttendance,
  calculateSubjectAttendance,
  getDaysRemaining,
  isAssignmentOverdue,
  getDynamicGreeting,
  calculateRoadmapProgress
} from '../../../utils/calculations';

export const DashboardPage = () => {
  const {
    userProfile,
    subjects,
    attendance,
    assignments,
    exams,
    studySessions,
    careerRoadmaps,
    projects,
    todayTasks,
    activityLog,
    setActiveTab,
    toggleTask,
    addTask,
    deleteTask,
    toggleAssignmentStatus,
    markAttendance
  } = useApp();

  const [newTaskInput, setNewTaskInput] = useState('');

  // Calculations
  const greeting = getDynamicGreeting(userProfile.name || 'Student');
  const targetAttendance = userProfile.targetAttendancePercentage || 75;
  const overallAttendance = calculateOverallAttendance(attendance, targetAttendance);

  // Today's classes based on weekday
  const currentDayName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ][new Date().getDay()];

  const todaysClasses = [];
  subjects.forEach((sub) => {
    if (Array.isArray(sub.schedule)) {
      sub.schedule.forEach((sch) => {
        if (sch.day === currentDayName || currentDayName === 'Sunday' || currentDayName === 'Saturday') {
          // If weekend, show Monday schedule so dashboard is never empty
          if (sch.day === 'Monday' || sch.day === currentDayName) {
            todaysClasses.push({
              subjectId: sub.id,
              subjectName: sub.name,
              code: sub.code,
              room: sub.room,
              time: sch.time,
              color: sub.color
            });
          }
        }
      });
    }
  });

  // Upcoming deadlines (Assignments & Projects sorted by nearest due date)
  const pendingAssignments = assignments
    .filter((a) => a.status !== 'Completed')
    .map((a) => ({
      ...a,
      isOverdue: isAssignmentOverdue(a.dueDate, a.status),
      remaining: getDaysRemaining(a.dueDate)
    }))
    .sort((a, b) => a.remaining.days - b.remaining.days);

  // Upcoming Exams
  const upcomingExams = exams
    .map((e) => ({
      ...e,
      remaining: getDaysRemaining(e.examDate)
    }))
    .filter((e) => !e.remaining.isPast)
    .sort((a, b) => a.remaining.days - b.remaining.days);

  // Career Goal Progress
  const currentRoadmap = careerRoadmaps[userProfile.careerGoal] || careerRoadmaps['Software Developer'];
  const careerProgress = calculateRoadmapProgress(currentRoadmap);

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (newTaskInput.trim()) {
      addTask(newTaskInput.trim(), 'general');
      setNewTaskInput('');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Greeting Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/40 border border-indigo-500/20 backdrop-blur-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {userProfile.course || 'B.Tech'} • {userProfile.semester || '4th Semester'}
            </span>
            <span className="text-xs text-slate-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {greeting}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {userProfile.collegeName || 'National Institute of Technology'} • Goal:{' '}
            <span className="text-indigo-400 font-semibold">{userProfile.careerGoal || 'Software Developer'}</span>
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          <Button
            onClick={() => setActiveTab('attendance')}
            size="sm"
            variant="secondary"
            icon={PieChart}
          >
            Mark Attendance
          </Button>
          <Button
            onClick={() => setActiveTab('assignments')}
            size="sm"
            variant="primary"
            icon={Plus}
          >
            New Assignment
          </Button>
        </div>
      </div>

      {/* Top Key Metric Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Attendance */}
        <Card
          onClick={() => setActiveTab('attendance')}
          className="p-5 flex flex-col justify-between hover:border-indigo-500/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Overall Attendance
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {overallAttendance.formattedPercentage}
            </div>
            <ProgressBar
              progress={overallAttendance.percentage}
              size="sm"
              color={overallAttendance.status === 'good' ? 'success' : 'danger'}
              className="mt-2"
            />
          </div>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
            {overallAttendance.message}
          </p>
        </Card>

        {/* Next Exam Countdown */}
        <Card
          onClick={() => setActiveTab('exams')}
          className="p-5 flex flex-col justify-between hover:border-amber-500/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Next Exam
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white truncate">
              {upcomingExams[0] ? upcomingExams[0].remaining.text : 'No Exams'}
            </div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1 truncate">
              {upcomingExams[0] ? upcomingExams[0].subjectName : 'All exams completed!'}
            </p>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {upcomingExams.length} upcoming scheduled
          </p>
        </Card>

        {/* Pending Deadlines */}
        <Card
          onClick={() => setActiveTab('assignments')}
          className="p-5 flex flex-col justify-between hover:border-indigo-500/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pending Tasks
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {pendingAssignments.length}
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Assignments to submit
            </p>
          </div>
          <p className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
            {pendingAssignments.filter((a) => a.priority === 'High').length} high priority
          </p>
        </Card>

        {/* Career Milestone */}
        <Card
          onClick={() => setActiveTab('career')}
          className="p-5 flex flex-col justify-between hover:border-purple-500/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Career Roadmap
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-500 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {careerProgress.percentage}%
            </div>
            <ProgressBar progress={careerProgress.percentage} size="sm" color="purple" className="mt-2" />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {careerProgress.completedItems}/{careerProgress.totalItems} checkpoints cleared
          </p>
        </Card>
      </div>

      {/* Main Two-Column Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide on large screen) */}
        <div className="lg:col-span-2 space-y-6">
          {/* TODAY'S CLASSES */}
          <Card>
            <CardHeader
              action={
                <button
                  onClick={() => setActiveTab('subjects')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  View All Subjects <ArrowRight className="w-3.5 h-3.5" />
                </button>
              }
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <CardTitle subtitle="Your class schedule and lecture halls for today">
                  Today's Classes
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {todaysClasses.length === 0 ? (
                <div className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                  No classes scheduled for today. Enjoy your study time!
                </div>
              ) : (
                <div className="space-y-3">
                  {todaysClasses.map((cls, idx) => {
                    const att = attendance[cls.subjectId] || { present: 0, total: 0 };
                    const stats = calculateSubjectAttendance(att.present, att.total, targetAttendance);
                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80 gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-2.5 h-10 rounded-full shrink-0 mt-0.5"
                            style={{ backgroundColor: cls.color || '#6366F1' }}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                {cls.subjectName}
                              </h4>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                {cls.code}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {cls.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {cls.room}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Present / Absent Action Buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mr-1">
                            {stats.formattedPercentage}
                          </span>
                          <button
                            onClick={() => markAttendance(cls.subjectId, true)}
                            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300/40 dark:border-emerald-800/50 hover:bg-emerald-100 transition-colors"
                          >
                            + Present
                          </button>
                          <button
                            onClick={() => markAttendance(cls.subjectId, false)}
                            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-300/40 dark:border-rose-800/50 hover:bg-rose-100 transition-colors"
                          >
                            + Absent
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* UPCOMING DEADLINES & ASSIGNMENTS */}
          <Card>
            <CardHeader
              action={
                <button
                  onClick={() => setActiveTab('assignments')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  All Assignments <ArrowRight className="w-3.5 h-3.5" />
                </button>
              }
            >
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-indigo-500" />
                <CardTitle subtitle="Submissions, lab assignments, and project deliverables">
                  Upcoming Deadlines
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {pendingAssignments.length === 0 ? (
                <div className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                  🎉 Zero pending deadlines! You're completely caught up.
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingAssignments.slice(0, 4).map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80 gap-3"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <button
                          onClick={() => toggleAssignmentStatus(a.id)}
                          className="mt-0.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
                          title="Mark complete"
                        >
                          <Circle className="w-4 h-4" />
                        </button>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {a.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {a.subjectName}
                            </span>
                            <span>• Due {a.dueDate}</span>
                            <Badge
                              variant={
                                a.priority === 'High'
                                  ? 'danger'
                                  : a.priority === 'Medium'
                                  ? 'warning'
                                  : 'default'
                              }
                              size="sm"
                            >
                              {a.priority} Priority
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-lg ${
                            a.isOverdue
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                              : a.remaining.isUrgent
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {a.isOverdue ? 'Overdue' : a.remaining.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* SUBJECT STUDY PROGRESS */}
          <Card>
            <CardHeader
              action={
                <button
                  onClick={() => setActiveTab('study')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  Study Sessions <ArrowRight className="w-3.5 h-3.5" />
                </button>
              }
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <CardTitle subtitle="Academic syllabus coverage by subject">
                  Subject Study & Exam Prep Progress
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subjects.map((sub) => {
                  const subExams = exams.filter((e) => e.subjectId === sub.id);
                  let totalTopics = 0;
                  let doneTopics = 0;
                  subExams.forEach((e) => {
                    if (Array.isArray(e.syllabus)) {
                      e.syllabus.forEach((s) => {
                        totalTopics++;
                        if (s.done) doneTopics++;
                      });
                    }
                  });
                  const progressPct =
                    totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 50;

                  return (
                    <div
                      key={sub.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {sub.name}
                        </span>
                        <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                          {progressPct}%
                        </span>
                      </div>
                      <ProgressBar progress={progressPct} size="sm" color="auto" />
                      <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1.5">
                        <span>{doneTopics}/{totalTopics || 4} topics covered</span>
                        <span>{sub.code}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1 Col on large screen) */}
        <div className="space-y-6">
          {/* TODAY'S TASKS CHECKLIST */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-500" />
                <CardTitle subtitle="Daily to-do list & study goals">
                  Today's Tasks
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {/* Task input form */}
              <form onSubmit={handleAddTaskSubmit} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  placeholder="Add a quick task for today..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm"
                >
                  Add
                </button>
              </form>

              {/* Tasks list */}
              {todayTasks.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No tasks added for today.</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {todayTasks.map((t) => (
                    <div
                      key={t.id}
                      className={`flex items-start justify-between p-2.5 rounded-xl border transition-all ${
                        t.completed
                          ? 'bg-slate-50 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/40 opacity-70'
                          : 'bg-white dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 shadow-xs'
                      }`}
                    >
                      <button
                        onClick={() => toggleTask(t.id)}
                        className="flex items-start gap-2 text-left flex-1 mr-2"
                      >
                        {t.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        )}
                        <span
                          className={`text-xs ${
                            t.completed
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-800 dark:text-slate-200 font-medium'
                          }`}
                        >
                          {t.text}
                        </span>
                      </button>
                      <button
                        onClick={() => deleteTask(t.id)}
                        className="text-slate-400 hover:text-rose-500 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* EXAM COUNTDOWNS */}
          <Card>
            <CardHeader
              action={
                <button
                  onClick={() => setActiveTab('exams')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  Schedule <ArrowRight className="w-3.5 h-3.5" />
                </button>
              }
            >
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-amber-500" />
                <CardTitle subtitle="Nearest upcoming exams">Exam Countdown</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingExams.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No upcoming exams scheduled.</p>
              ) : (
                <div className="space-y-3">
                  {upcomingExams.slice(0, 3).map((ex) => (
                    <div
                      key={ex.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800/80"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {ex.subjectName}
                        </h4>
                        <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                          {ex.remaining.text}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {ex.examType} • {ex.examDate} ({ex.examTime})
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* RECENT ACTIVITY LOG */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <CardTitle subtitle="Your latest accomplishments">Recent Activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {activityLog.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No activity logged yet.</p>
              ) : (
                <div className="space-y-2.5 max-h-56 overflow-y-auto">
                  {activityLog.slice(0, 5).map((act) => (
                    <div key={act.id} className="flex items-start gap-2.5 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-800 dark:text-slate-200 font-medium leading-tight">
                          {act.message}
                        </p>
                        <span className="text-[10px] text-slate-400">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

