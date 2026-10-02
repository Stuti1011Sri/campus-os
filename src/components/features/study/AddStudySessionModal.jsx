import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { Target, Calendar, Clock, BookOpen } from 'lucide-react';

export const AddStudySessionModal = ({ isOpen, onClose }) => {
  const { addStudySession, subjects } = useApp();

  const [formData, setFormData] = useState({
    subjectId: subjects[0]?.id || '',
    topic: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '05:00 PM',
    durationMinutes: 60,
    notes: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.topic.trim()) {
      setError('Please provide a study topic name.');
      return;
    }

    const selectedSub = subjects.find((s) => s.id === formData.subjectId);
    const subjectName = selectedSub ? selectedSub.name : 'General Study';

    addStudySession({
      ...formData,
      subjectName,
      durationMinutes: Number(formData.durationMinutes) || 60
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Study Session"
      subtitle="Dedicate a focused time block for chapter revisions or problem solving"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Topic Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Topic / Chapter <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Target className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              required
              placeholder="e.g. Graph Algorithms & Shortest Path (Dijkstra)"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Subject */}
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
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date, Time & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Session Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Start Time
            </label>
            <input
              type="text"
              placeholder="e.g. 05:00 PM"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Duration
            </label>
            <select
              value={formData.durationMinutes}
              onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
              className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="30">30 mins</option>
              <option value="45">45 mins</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>

        {/* Goal / Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Goals & Key Exercises
          </label>
          <textarea
            rows="3"
            placeholder="e.g. Solve 3 LeetCode problems and review Professor's lecture slides."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Schedule Session</Button>
        </div>
      </form>
    </Modal>
  );
};

