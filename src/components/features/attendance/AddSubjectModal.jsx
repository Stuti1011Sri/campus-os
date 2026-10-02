import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { BookOpen, User, MapPin, Hash, Plus, Trash2 } from 'lucide-react';

const PRESET_COLORS = [
  '#6366F1', // Indigo
  '#EC4899', // Pink
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#EF4444', // Red
  '#3B82F6'  // Blue
];

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const AddSubjectModal = ({ isOpen, onClose, subjectToEdit = null }) => {
  const { addSubject, editSubject, attendance, updateSubjectAttendanceStats } = useApp();

  const currentAttendance = subjectToEdit ? attendance[subjectToEdit.id] || { present: 0, total: 0 } : null;

  const [formData, setFormData] = useState({
    name: subjectToEdit ? subjectToEdit.name : '',
    code: subjectToEdit ? subjectToEdit.code : '',
    professor: subjectToEdit ? subjectToEdit.professor || '' : '',
    room: subjectToEdit ? subjectToEdit.room || '' : '',
    color: subjectToEdit ? subjectToEdit.color || '#6366F1' : '#6366F1',
    initialPresent: currentAttendance ? currentAttendance.present : 0,
    initialTotal: currentAttendance ? currentAttendance.total : 0,
    schedule: subjectToEdit && Array.isArray(subjectToEdit.schedule) ? subjectToEdit.schedule : [
      { day: 'Monday', time: '09:00 AM - 10:00 AM' }
    ]
  });

  const [error, setError] = useState('');

  const handleAddScheduleSlot = () => {
    setFormData((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { day: 'Tuesday', time: '10:00 AM - 11:00 AM' }]
    }));
  };

  const handleRemoveScheduleSlot = (index) => {
    setFormData((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateSchedule = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.schedule];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, schedule: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter a subject title.');
      return;
    }
    const p = Math.max(0, parseInt(formData.initialPresent, 10) || 0);
    const t = Math.max(0, parseInt(formData.initialTotal, 10) || 0);

    if (p > t) {
      setError('Attended classes cannot be higher than total classes.');
      return;
    }

    if (subjectToEdit) {
      editSubject(subjectToEdit.id, {
        name: formData.name.trim(),
        code: formData.code.trim() || 'CS101',
        professor: formData.professor.trim(),
        room: formData.room.trim(),
        color: formData.color,
        schedule: formData.schedule
      });
      updateSubjectAttendanceStats(subjectToEdit.id, p, t);
    } else {
      addSubject({
        name: formData.name.trim(),
        code: formData.code.trim() || 'CS101',
        professor: formData.professor.trim(),
        room: formData.room.trim(),
        color: formData.color,
        initialPresent: p,
        initialTotal: t,
        schedule: formData.schedule
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={subjectToEdit ? 'Edit Subject & Attendance' : 'Add New Academic Subject'}
      subtitle="Configure subject details, timetable slots and baseline attendance numbers"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Subject Name & Code */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Subject Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Data Structures & Algorithms"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Code
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. CS201"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Professor & Room */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Professor / Instructor
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Dr. Ramesh Kumar"
                value={formData.professor}
                onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Lecture Room / Hall
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Hall B-302 / Lab 4"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Initial Attendance Numbers */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Attendance Figures
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                Classes Attended (Present)
              </label>
              <input
                type="number"
                min="0"
                value={formData.initialPresent}
                onChange={(e) =>
                  setFormData({ ...formData, initialPresent: Math.max(0, parseInt(e.target.value, 10) || 0) })
                }
                className="w-full px-3 py-1.5 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                Total Classes Held
              </label>
              <input
                type="number"
                min="0"
                value={formData.initialTotal}
                onChange={(e) =>
                  setFormData({ ...formData, initialTotal: Math.max(0, parseInt(e.target.value, 10) || 0) })
                }
                className="w-full px-3 py-1.5 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Color Badge Picker */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Subject Accent Color
          </label>
          <div className="flex items-center gap-2">
            {PRESET_COLORS.map((clr) => (
              <button
                key={clr}
                type="button"
                onClick={() => setFormData({ ...formData, color: clr })}
                className={`w-7 h-7 rounded-full transition-transform ${
                  formData.color === clr ? 'scale-125 ring-2 ring-offset-2 ring-indigo-500' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: clr }}
              />
            ))}
          </div>
        </div>

        {/* Weekly Timetable Schedule Slots */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Timetable Slots
            </label>
            <button
              type="button"
              onClick={handleAddScheduleSlot}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Slot
            </button>
          </div>

          <div className="space-y-2 max-h-36 overflow-y-auto">
            {formData.schedule.map((slot, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <select
                  value={slot.day}
                  onChange={(e) => handleUpdateSchedule(idx, 'day', e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                >
                  {DAYS_OF_WEEK.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="e.g. 09:00 AM - 10:00 AM"
                  value={slot.time}
                  onChange={(e) => handleUpdateSchedule(idx, 'time', e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
                />
                {formData.schedule.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveScheduleSlot(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {subjectToEdit ? 'Save Changes' : 'Create Subject'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

