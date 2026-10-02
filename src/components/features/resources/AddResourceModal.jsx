import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { Bookmark, Globe, Tag } from 'lucide-react';

export const AddResourceModal = ({ isOpen, onClose, resourceToEdit = null }) => {
  const { addResource, editResource } = useApp();

  const [formData, setFormData] = useState({
    title: resourceToEdit ? resourceToEdit.title : '',
    category: resourceToEdit ? resourceToEdit.category : 'DSA',
    url: resourceToEdit ? resourceToEdit.url : '',
    description: resourceToEdit ? resourceToEdit.description : '',
    tagsString: resourceToEdit ? (resourceToEdit.tags || []).join(', ') : 'LeetCode, Algorithms, Guide'
  });

  const [error, setError] = useState('');

  const CATEGORIES = [
    'DSA',
    'Programming',
    'Internships',
    'Career',
    'Projects',
    'Learning',
    'College'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide a resource title.');
      return;
    }
    if (!formData.url.trim()) {
      setError('Please provide a valid destination URL.');
      return;
    }

    const tags = formData.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      url: formData.url.trim().startsWith('http') ? formData.url.trim() : `https://${formData.url.trim()}`,
      description: formData.description.trim(),
      tags
    };

    if (resourceToEdit) {
      editResource(resourceToEdit.id, payload);
    } else {
      addResource(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={resourceToEdit ? 'Edit Resource' : 'Bookmark New Resource'}
      subtitle="Save study materials, documentation and career resources"
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
            Resource Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Bookmark className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              required
              placeholder="e.g. Striver's A2Z DSA Sheet"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Category & URL */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Web URL <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="https://takeuforward.org/..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Tags (Comma Separated)
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. Algorithms, C++, LeetCode, Free"
              value={formData.tagsString}
              onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
              className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Short Description
          </label>
          <textarea
            rows="2"
            placeholder="What does this resource offer?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {resourceToEdit ? 'Save Changes' : 'Bookmark Link'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

