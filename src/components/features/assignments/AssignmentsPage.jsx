import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  Clock,
  AlertTriangle,
  Edit2,
  Trash2,
  CheckCircle2,
  Circle,
  MoreVertical,
  BookOpen
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { EmptyState } from '../../common/EmptyState';
import { getDaysRemaining, isAssignmentOverdue } from '../../../utils/calculations';
import { AddAssignmentModal } from './AddAssignmentModal';

export const AssignmentsPage = () => {
  const {
    assignments,
    subjects,
    deleteAssignment,
    toggleAssignmentStatus,
    loadDemoData
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  // Filters & Sorting state
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [sortBy, setSortBy] = useState('deadline-asc');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering
  const filteredAssignments = assignments.filter((a) => {
    if (statusFilter !== 'All' && a.status !== statusFilter) return false;
    if (priorityFilter !== 'All' && a.priority !== priorityFilter) return false;
    if (subjectFilter !== 'All' && a.subjectId !== subjectFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchDesc = a.description?.toLowerCase().includes(q);
      const matchSub = a.subjectName?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchSub) return false;
    }
    return true;
  });

  // Sorting
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    if (sortBy === 'deadline-asc') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'deadline-desc') {
      return new Date(b.dueDate) - new Date(a.dueDate);
    } else if (sortBy === 'priority') {
      const pWeights = { High: 3, Medium: 2, Low: 1 };
      return (pWeights[b.priority] || 0) - (pWeights[a.priority] || 0);
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const completedCount = assignments.filter((a) => a.status === 'Completed').length;
  const inProgressCount = assignments.filter((a) => a.status === 'In Progress').length;
  const todoCount = assignments.filter((a) => a.status === 'To Do').length;
  const overdueCount = assignments.filter((a) => isAssignmentOverdue(a.dueDate, a.status)).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Assignment Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Organize lab work, homework, research papers and project deliverables by deadline and priority.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingAssignment(null);
            setIsAddModalOpen(true);
          }}
          icon={Plus}
        >
          Add Assignment
        </Button>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setStatusFilter('All')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'All'
              ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500/40 shadow-sm'
              : 'bg-white dark:bg-[#111827] border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
            Total
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
            {assignments.length}
          </p>
        </div>

        <div
          onClick={() => setStatusFilter('To Do')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'To Do'
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-600 shadow-sm'
              : 'bg-white dark:bg-[#111827] border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
            To Do
          </span>
          <p className="text-2xl font-black text-slate-800 dark:text-slate-200 mt-0.5">
            {todoCount}
          </p>
        </div>

        <div
          onClick={() => setStatusFilter('In Progress')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'In Progress'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500/40 shadow-sm'
              : 'bg-white dark:bg-[#111827] border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">
            In Progress
          </span>
          <p className="text-2xl font-black text-amber-700 dark:text-amber-300 mt-0.5">
            {inProgressCount}
          </p>
        </div>

        <div
          onClick={() => setStatusFilter('Completed')}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'Completed'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 shadow-sm'
              : 'bg-white dark:bg-[#111827] border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
            Completed
          </span>
          <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-0.5">
            {completedCount}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          {/* Subject filter */}
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium max-w-[150px] truncate"
          >
            <option value="All">All Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="deadline-asc">Deadline (Earliest)</option>
            <option value="deadline-desc">Deadline (Latest)</option>
            <option value="priority">Priority (High to Low)</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Assignment Cards Grid */}
      {sortedAssignments.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No assignments found"
          description={
            assignments.length === 0
              ? 'You have not added any assignments yet. Keep your academic coursework organized!'
              : 'No assignments match your active search and filter criteria.'
          }
          actionLabel="Create Assignment"
          onAction={() => setIsAddModalOpen(true)}
          secondaryActionLabel={assignments.length === 0 ? 'Load Sample Assignments' : undefined}
          onSecondaryAction={assignments.length === 0 ? loadDemoData : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedAssignments.map((a) => {
            const isOverdue = isAssignmentOverdue(a.dueDate, a.status);
            const remaining = getDaysRemaining(a.dueDate);
            const isCompleted = a.status === 'Completed';

            return (
              <Card
                key={a.id}
                className={`overflow-hidden flex flex-col justify-between border-t-4 ${
                  isCompleted
                    ? 'border-t-emerald-500 opacity-80'
                    : isOverdue
                    ? 'border-t-rose-500'
                    : a.priority === 'High'
                    ? 'border-t-amber-500'
                    : 'border-t-indigo-500'
                }`}
              >
                <div className="p-5">
                  {/* Top Bar: Subject, Priority & Actions */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-900/60 truncate">
                      {a.subjectName || 'General Course'}
                    </span>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingAssignment(a);
                          setIsAddModalOpen(true);
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Edit assignment"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteAssignment(a.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Delete assignment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`text-sm font-bold text-slate-900 dark:text-white leading-snug ${
                      isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''
                    }`}
                  >
                    {a.title}
                  </h3>
                  {a.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {a.description}
                    </p>
                  )}

                  {/* Badges: Priority & Status */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">
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
                    <Badge
                      variant={
                        a.status === 'Completed'
                          ? 'success'
                          : a.status === 'In Progress'
                          ? 'warning'
                          : 'default'
                      }
                      size="sm"
                    >
                      {a.status}
                    </Badge>
                  </div>
                </div>

                {/* Footer Bar: Due date & Toggle Complete */}
                <div className="px-5 py-3.5 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span
                      className={`font-semibold ${
                        isOverdue
                          ? 'text-rose-600 dark:text-rose-400 font-bold'
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {isOverdue ? 'Overdue: ' : 'Due '} {a.dueDate}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleAssignmentStatus(a.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5" />
                        <span>Mark Done</span>
                      </>
                    )}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add / Edit Assignment Modal */}
      {isAddModalOpen && (
        <AddAssignmentModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingAssignment(null);
          }}
          assignmentToEdit={editingAssignment}
        />
      )}
    </div>
  );
};

