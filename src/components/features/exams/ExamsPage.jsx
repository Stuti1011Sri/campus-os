import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  CalendarDays,
  Plus,
  Clock,
  MapPin,
  CheckCircle2,
  Circle,
  Edit2,
  Trash2,
  AlertTriangle,
  BookOpen,
  Sparkles,
  Layers,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../../common/Card';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import { ProgressBar } from '../../common/ProgressBar';
import { EmptyState } from '../../common/EmptyState';
import { getDaysRemaining } from '../../../utils/calculations';
import { AddExamModal } from './AddExamModal';

export const ExamsPage = () => {
  const { exams, deleteExam, toggleExamTopic, loadDemoData } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'timeline'

  // Sort exams chronologically by exam date
  const sortedExams = [...exams]
    .map((e) => ({
      ...e,
      remaining: getDaysRemaining(e.examDate)
    }))
    .sort((a, b) => new Date(a.examDate) - new Date(b.examDate));

  const upcomingExams = sortedExams.filter((e) => !e.remaining.isPast);
  const pastExams = sortedExams.filter((e) => e.remaining.isPast);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Exam Planner & Timeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Automated countdown timers, venue reminders, and chapter-by-chapter syllabus checklists.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle between Card view and Timeline view */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'timeline'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Timeline
            </button>
          </div>

          <Button
            onClick={() => {
              setEditingExam(null);
              setIsAddModalOpen(true);
            }}
            icon={Plus}
          >
            Add Exam
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {sortedExams.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No exams scheduled"
          description="Plan ahead for midterms, finals, practical vivas and class quizzes to keep stress levels low."
          actionLabel="Schedule Exam"
          onAction={() => setIsAddModalOpen(true)}
          secondaryActionLabel="Load Sample Exams"
          onSecondaryAction={loadDemoData}
        />
      ) : viewMode === 'timeline' ? (
        /* TIMELINE VIEW */
        <Card className="p-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-indigo-500" />
            <span>Chronological Examination Timeline</span>
          </h3>
          <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-200 dark:border-indigo-900/60 space-y-8 my-4">
            {sortedExams.map((ex) => {
              const totalTopics = ex.syllabus?.length || 0;
              const doneTopics = ex.syllabus?.filter((s) => s.done).length || 0;
              const prepPct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

              return (
                <div key={ex.id} className="relative group">
                  {/* Timeline bullet dot */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-white dark:bg-slate-900 transition-transform group-hover:scale-125 ${
                      ex.remaining.isPast
                        ? 'border-slate-400'
                        : ex.remaining.isUrgent
                        ? 'border-amber-500 bg-amber-500 ring-4 ring-amber-500/20'
                        : 'border-indigo-600 bg-indigo-600'
                    }`}
                  />

                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                          {ex.subjectName}
                        </span>
                        <Badge variant="primary" size="sm">
                          {ex.examType}
                        </Badge>
                      </div>

                      <span
                        className={`text-xs font-black px-2.5 py-1 rounded-xl ${
                          ex.remaining.isPast
                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                            : ex.remaining.isUrgent
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 animate-pulse'
                            : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                        }`}
                      >
                        {ex.remaining.text}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {ex.examDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {ex.examTime}
                      </span>
                      {ex.room && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {ex.room}
                        </span>
                      )}
                    </div>

                    {/* Mini syllabus prep bar */}
                    {totalTopics > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-4">
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                          Syllabus Prep: {doneTopics}/{totalTopics} chapters ({prepPct}%)
                        </span>
                        <div className="w-32">
                          <ProgressBar progress={prepPct} size="sm" color="auto" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ) : (
        /* CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedExams.map((ex) => {
            const totalTopics = ex.syllabus?.length || 0;
            const doneTopics = ex.syllabus?.filter((s) => s.done).length || 0;
            const prepPct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

            return (
              <Card key={ex.id} className="overflow-hidden flex flex-col justify-between">
                {/* Header Banner */}
                <div className="p-5 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-900/60">
                        {ex.examType || 'Exam'}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5 leading-snug">
                        {ex.subjectName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingExam(ex);
                          setIsAddModalOpen(true);
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Edit exam"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteExam(ex.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Delete exam"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Countdown pill */}
                  <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <div>
                        <span className="text-xs font-extrabold text-amber-700 dark:text-amber-300">
                          {ex.remaining.text}
                        </span>
                        <p className="text-[10px] text-amber-600 dark:text-amber-400">
                          {ex.examDate} • {ex.examTime}
                        </p>
                      </div>
                    </div>
                    {ex.room && (
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-amber-200/70 dark:bg-amber-900/70 text-amber-900 dark:text-amber-200">
                        {ex.room}
                      </span>
                    )}
                  </div>
                </div>

                {/* Syllabus Topic Checklist */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Syllabus Preparation ({prepPct}%)
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {doneTopics}/{totalTopics} done
                      </span>
                    </div>

                    <ProgressBar progress={prepPct} size="sm" color="auto" className="mb-3" />

                    {totalTopics === 0 ? (
                      <p className="text-xs text-slate-400 italic py-2">
                        No specific syllabus topics added.
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {ex.syllabus.map((topic) => (
                          <div
                            key={topic.id}
                            onClick={() => toggleExamTopic(ex.id, topic.id)}
                            className={`flex items-start gap-2 p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                              topic.done
                                ? 'bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300'
                                : 'bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {topic.done ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                            )}
                            <span className={topic.done ? 'line-through opacity-80' : 'font-medium'}>
                              {topic.topic}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {ex.notes && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 italic">
                      Note: {ex.notes}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add / Edit Exam Modal */}
      {isAddModalOpen && (
        <AddExamModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingExam(null);
          }}
          examToEdit={editingExam}
        />
      )}
    </div>
  );
};

