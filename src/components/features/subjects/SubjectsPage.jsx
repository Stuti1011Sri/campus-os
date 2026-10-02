import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Clock,
  MapPin,
  User,
  CheckSquare,
  CalendarDays,
  PieChart
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { ProgressBar } from '../../common/ProgressBar';
import { EmptyState } from '../../common/EmptyState';
import { calculateSubjectAttendance } from '../../../utils/calculations';
import { AddSubjectModal } from '../attendance/AddSubjectModal';

export const SubjectsPage = () => {
  const {
    subjects,
    attendance,
    assignments,
    exams,
    deleteSubject,
    loadDemoData,
    userProfile,
    setActiveTab
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const targetPercentage = userProfile.targetAttendancePercentage || 75;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Courses & Subjects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your registered semester courses, faculty details, lecture schedules and syllabus.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingSubject(null);
            setIsAddModalOpen(true);
          }}
          icon={Plus}
        >
          Add Course Subject
        </Button>
      </div>

      {/* Subjects Grid */}
      {subjects.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No registered subjects"
          description="Add your enrolled college courses to automatically organize assignments, exams, and attendance."
          actionLabel="Add Subject"
          onAction={() => setIsAddModalOpen(true)}
          secondaryActionLabel="Load Sample Subjects"
          onSecondaryAction={loadDemoData}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((sub) => {
            const att = attendance[sub.id] || { present: 0, total: 0 };
            const attStats = calculateSubjectAttendance(att.present, att.total, targetPercentage);
            const subAssignments = assignments.filter((a) => a.subjectId === sub.id);
            const subExams = exams.filter((e) => e.subjectId === sub.id);

            return (
              <Card key={sub.id} className="overflow-hidden flex flex-col justify-between">
                <div className="p-5">
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-3.5 h-10 rounded-full shrink-0"
                        style={{ backgroundColor: sub.color || '#6366F1' }}
                      />
                      <div>
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {sub.code}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                          {sub.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingSubject(sub);
                          setIsAddModalOpen(true);
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-indigo-600"
                        title="Edit course"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteSubject(sub.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600"
                        title="Delete course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Professor & Room Info */}
                  <div className="space-y-1.5 mt-3 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{sub.professor || 'Instructor TBA'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{sub.room || 'Classroom TBA'}</span>
                    </div>
                  </div>

                  {/* Weekly Lecture Slots */}
                  {Array.isArray(sub.schedule) && sub.schedule.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Weekly Lecture Slots
                      </span>
                      <div className="space-y-1">
                        {sub.schedule.map((sch, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/50"
                          >
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {sch.day}
                            </span>
                            <span className="text-slate-500 font-mono text-[10px]">
                              {sch.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attendance & Deliverables Quick Metrics */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-center">
                    <div
                      onClick={() => setActiveTab('attendance')}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Attendance
                      </span>
                      <p
                        className={`text-sm font-black mt-0.5 ${
                          attStats.status === 'good'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {attStats.formattedPercentage}
                      </p>
                    </div>

                    <div
                      onClick={() => setActiveTab('assignments')}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Assignments
                      </span>
                      <p className="text-sm font-black text-slate-800 dark:text-slate-200 mt-0.5">
                        {subAssignments.filter((a) => a.status === 'Completed').length}/
                        {subAssignments.length}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <AddSubjectModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingSubject(null);
          }}
          subjectToEdit={editingSubject}
        />
      )}
    </div>
  );
};

