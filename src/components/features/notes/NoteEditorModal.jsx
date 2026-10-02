import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { FileText, Pin } from 'lucide-react';

export const NoteEditorModal = ({ isOpen, onClose, noteToEdit = null }) => {
  const { addNote, editNote } = useApp();

  const [formData, setFormData] = useState({
    title: noteToEdit ? noteToEdit.title : '',
    category: noteToEdit ? noteToEdit.category : 'DSA',
    content: noteToEdit ? noteToEdit.content : '',
    isPinned: noteToEdit ? noteToEdit.isPinned : false
  });

  const [error, setError] = useState('');

  const CATEGORIES = ['DSA', 'DBMS', 'OS', 'Computer Networks', 'Mathematics', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide a note title.');
      return;
    }

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      content: formData.content.trim(),
      isPinned: formData.isPinned
    };

    if (noteToEdit) {
      editNote(noteToEdit.id, payload);
    } else {
      addNote(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={noteToEdit ? 'Edit Note' : 'Create Revision Note'}
      subtitle="Write summaries, algorithms, formulas and lecture notes"
      maxWidth="max-w-2xl"
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
            Note Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              required
              placeholder="e.g. Red-Black Tree Properties & Rotations"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Category & Pin toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isPinned}
                onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Pin className="w-3.5 h-3.5 text-indigo-500" />
                Pin to top of list
              </span>
            </label>
          </div>
        </div>

        {/* Content Body */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Note Content & Code Snippets
          </label>
          <textarea
            rows="8"
            placeholder="Type your notes here. You can use markdown headings, bullet points, and code formatting..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm font-mono rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed"
          />
        </div>

        {/* Actions */}
        <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {noteToEdit ? 'Save Changes' : 'Create Note'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

