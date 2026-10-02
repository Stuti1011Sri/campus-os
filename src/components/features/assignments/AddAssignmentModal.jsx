import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { CheckSquare, Calendar, BookOpen, AlertCircle } from 'lucide-react';

export const AddAssignmentModal = ({ isOpen, onClose, assignmentToEdit = null }) => {
  const { addAssignment, editAssignment, subjects } = useApp();

  const [formData, setFormData] = useState({
    title: assignmentToEdit ? assignmentToEdit.title : '',
    subjectId: assignmentToEdit ? assignmentToEdit.subjectId || '' : (subjects[0]?.id || ''),
    description: assignmentToEdit ? assignmentToEdit.description || '' : '',
    dueDate: assignmentToEdit
      ? assignmentToEdit.dueDate
      : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    priority: assignmentToEdit ? assignmentToEdit.priority : 'Medium',
    status: assignmentToEdit ? assignmentToEdit.status : 'To Do'
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide an assignment title.');
      return;
    }
    if (!formData.dueDate) {
      setError('Please select a valid due date.');
      return;
    }

    const selectedSub = subjects.find((s) => s.id === formData.subjectId);
    const subjectName = selectedSub ? selectedSub.name : 'General Academic';

    if (assignmentToEdit) {
      editAssignment(assignmentToEdit.id, {
        ...formData,
        subjectName
      });
    } else {
      addAssignment({
        ...formData,
        subjectName
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={assignmentToEdit ? 'Edit Assignment' : 'Create New Assignment'}
      subtitle="Track submissions, problem sets, and lab deliverables"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Assignment Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <CheckSquare className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              required
              placeholder="e.g. Implement AVL Tree in C++ with test cases"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Subject & Due Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Subject
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <select
                value={formData.subjectId}
                onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">General Assignment</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Submission Due Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Priority & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Description & Notes
          </label>
          <textarea
            rows="3"
            placeholder="Include problem statements, submission portal instructions, or repository links..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Modal Actions */}
        <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {assignmentToEdit ? 'Update Assignment' : 'Add Assignment'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

