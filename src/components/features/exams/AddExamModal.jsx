import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { Calendar, Clock, MapPin, BookOpen, Plus, Trash2, Layers } from 'lucide-react';

export const AddExamModal = ({ isOpen, onClose, examToEdit = null }) => {
  const { addExam, editExam, subjects } = useApp();

  const [formData, setFormData] = useState({
    subjectId: examToEdit ? examToEdit.subjectId || '' : (subjects[0]?.id || ''),
    examType: examToEdit ? examToEdit.examType : 'Mid-Term Exam',
    examDate: examToEdit
      ? examToEdit.examDate
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    examTime: examToEdit ? examToEdit.examTime : '10:00 AM - 01:00 PM',
    room: examToEdit ? examToEdit.room || '' : 'Exam Hall 1',
    syllabus: examToEdit && Array.isArray(examToEdit.syllabus)
      ? examToEdit.syllabus
      : [
          { id: 'top-1', topic: 'Chapter 1: Core Fundamentals & Theory', done: false },
          { id: 'top-2', topic: 'Chapter 2: Problem Solving & Numerical Practice', done: false }
        ],
    notes: examToEdit ? examToEdit.notes || '' : ''
  });

  const [newTopicInput, setNewTopicInput] = useState('');
  const [error, setError] = useState('');

  const handleAddTopic = () => {
    if (newTopicInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        syllabus: [
          ...prev.syllabus,
          { id: 'top-' + Date.now(), topic: newTopicInput.trim(), done: false }
        ]
      }));
      setNewTopicInput('');
    }
  };

  const handleRemoveTopic = (topicId) => {
    setFormData((prev) => ({
      ...prev,
      syllabus: prev.syllabus.filter((s) => s.id !== topicId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.examDate) {
      setError('Please select an exam date.');
      return;
    }

    const selectedSub = subjects.find((s) => s.id === formData.subjectId);
    const subjectName = selectedSub ? selectedSub.name : 'University Exam';

    if (examToEdit) {
      editExam(examToEdit.id, {
        ...formData,
        subjectName
      });
    } else {
      addExam({
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
      title={examToEdit ? 'Edit Scheduled Exam' : 'Schedule New Exam'}
      subtitle="Configure test dates, timing, venues and study checklist"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Subject & Exam Type */}
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
              Exam Format
            </label>
            <select
              value={formData.examType}
              onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Mid-Term Exam">Mid-Term Exam</option>
              <option value="End-Term Final Exam">End-Term Final Exam</option>
              <option value="Lab Practical & Viva">Lab Practical & Viva</option>
              <option value="Class Quiz / Assessment">Class Quiz / Assessment</option>
            </select>
          </div>
        </div>

        {/* Date, Time & Venue */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Exam Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="date"
                required
                value={formData.examDate}
                onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. 10:00 AM"
                value={formData.examTime}
                onChange={(e) => setFormData({ ...formData, examTime: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Room / Venue
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Hall B-302"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Syllabus Checklist Creator */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Syllabus Topics & Chapters
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add chapter / topic name (e.g. Dynamic Programming)..."
              value={newTopicInput}
              onChange={(e) => setNewTopicInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTopic();
                }
              }}
              className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
            />
            <Button type="button" size="sm" onClick={handleAddTopic}>
              Add Topic
            </Button>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto">
            {formData.syllabus.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200"
              >
                <span>{topic.topic}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTopic(topic.id)}
                  className="p-1 text-slate-400 hover:text-rose-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Special Instructions / Permitted Items
          </label>
          <input
            type="text"
            placeholder="e.g. Non-programmable calculators allowed. Carry college ID card."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Actions */}
        <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {examToEdit ? 'Save Exam Details' : 'Schedule Exam'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

