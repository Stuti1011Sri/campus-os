import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  PieChart,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  MapPin,
  UserCheck
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../../common/Card';
import { Button } from '../../common/Button';
import { ProgressBar } from '../../common/ProgressBar';
import { EmptyState } from '../../common/EmptyState';
import { calculateOverallAttendance, calculateSubjectAttendance } from '../../../utils/calculations';
import { AddSubjectModal } from './AddSubjectModal';

export const AttendancePage = () => {
  const {
    subjects,
    attendance,
    markAttendance,
    deleteSubject,
    userProfile,
    loadDemoData
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const targetPercentage = userProfile.targetAttendancePercentage || 75;
  const overall = calculateOverallAttendance(attendance, targetPercentage);

  return (
    <div className="space-y-6 pb-12">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Attendance Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Log your daily lecture attendance and monitor exact thresholds to meet the {targetPercentage}% requirement.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingSubject(null);
            setIsAddModalOpen(true);
          }}
          icon={Plus}
        >
          Add Subject
        </Button>
      </div>

      {/* Overall Attendance Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Overall Percentage */}
        <Card className="p-5 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Overall Academic Attendance
            </span>
            <PieChart className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {overall.formattedPercentage}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              ({overall.present} / {overall.total} attended)
            </span>
          </div>
          <ProgressBar
            progress={overall.percentage}
            size="md"
            color={overall.status === 'good' ? 'success' : 'danger'}
            className="mt-3"
          />
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-2">
            {overall.message}
          </p>
        </Card>

        {/* Metric 2: Present vs Absent Breakdown */}
        <Card className="p-5 flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Classes Breakdown
          </span>
          <div className="grid grid-cols-2 gap-3 my-2">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
              <span className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                Present
              </span>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                {overall.present}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50">
              <span className="text-[11px] font-bold uppercase text-rose-600 dark:text-rose-400">
                Missed / Bunked
              </span>
              <p className="text-2xl font-black text-rose-700 dark:text-rose-300">
                {overall.absent}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Target threshold: <strong className="text-slate-700 dark:text-slate-300">{targetPercentage}%</strong>
          </p>
        </Card>

        {/* Metric 3: Safety Buffer & Health Status */}
        <Card className="p-5 flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Status & Advice
          </span>
          <div className="my-2">
            {overall.status === 'good' ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>Eligibility Safe</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-base">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
                <span>Below Minimum Target</span>
              </div>
            )}
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {overall.status === 'good'
                ? `You have a safe buffer of ${overall.classesCanMiss} missed classes across current subjects without risking exam debarment.`
                : `You must attend ${overall.classesNeeded} more continuous lectures across subjects to reach good standing.`}
            </p>
          </div>
          <p className="text-[10px] text-slate-400">
            CampusOS calculates exact algebraic thresholds automatically.
          </p>
        </Card>
      </div>

      {/* Subjects Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Subject-wise Attendance Records ({subjects.length})
          </h2>
        </div>

        {subjects.length === 0 ? (
          <EmptyState
            icon={PieChart}
            title="No subjects tracked yet"
            description="Add your first college course subject to start logging your daily attendance and calculating safe skips."
            actionLabel="Add Subject"
            onAction={() => setIsAddModalOpen(true)}
            secondaryActionLabel="Load Sample Subjects"
            onSecondaryAction={loadDemoData}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjects.map((sub) => {
              const att = attendance[sub.id] || { present: 0, total: 0, absent: 0 };
              const stats = calculateSubjectAttendance(att.present, att.total, targetPercentage);

              return (
                <Card key={sub.id} className="overflow-hidden flex flex-col justify-between">
                  {/* Top Subject Banner */}
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className="w-3.5 h-10 rounded-full shrink-0 mt-0.5"
                          style={{ backgroundColor: sub.color || '#6366F1' }}
                        />
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                            {sub.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {sub.code} • {sub.professor || 'Faculty Incharge'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingSubject(sub);
                            setIsAddModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Edit subject / counts"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteSubject(sub.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Delete subject"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Numerical Stats Table */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-center">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Total</span>
                        <p className="text-lg font-black text-slate-800 dark:text-slate-200">
                          {stats.total}
                        </p>
                      </div>
                      <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40">
                        <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                          Present
                        </span>
                        <p className="text-lg font-black text-emerald-700 dark:text-emerald-300">
                          {stats.present}
                        </p>
                      </div>
                      <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40">
                        <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400">
                          Absent
                        </span>
                        <p className="text-lg font-black text-rose-700 dark:text-rose-300">
                          {stats.absent}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Percentage & Prediction Footer */}
                  <div className="p-5 bg-slate-50/50 dark:bg-slate-900/30 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                          Attendance Rate
                        </span>
                        <span
                          className={`text-base font-black ${
                            stats.status === 'good'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {stats.formattedPercentage}
                        </span>
                      </div>
                      <ProgressBar
                        progress={stats.percentage}
                        size="sm"
                        color={stats.status === 'good' ? 'success' : 'danger'}
                      />

                      {/* Dynamic status advisory note */}
                      <div
                        className={`mt-3 p-2.5 rounded-xl text-xs font-medium border flex items-start gap-2 ${
                          stats.status === 'good'
                            ? 'bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-900/50'
                            : 'bg-rose-50/80 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border-rose-200/80 dark:border-rose-900/50'
                        }`}
                      >
                        {stats.status === 'good' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <span className="leading-tight">{stats.message}</span>
                      </div>
                    </div>

                    {/* Quick +Present / +Absent Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/80">
                      <button
                        onClick={() => markAttendance(sub.id, true)}
                        className="py-2 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>+ Present</span>
                      </button>
                      <button
                        onClick={() => markAttendance(sub.id, false)}
                        className="py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-rose-950/50 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 active:scale-95 transition-all"
                      >
                        + Absent
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Subject Modal */}
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

