import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { FolderGit2, GitBranch, Globe, Calendar, Plus, Trash2 } from 'lucide-react';

export const AddProjectModal = ({ isOpen, onClose, projectToEdit = null }) => {
  const { addProject, editProject } = useApp();

  const [formData, setFormData] = useState({
    name: projectToEdit ? projectToEdit.name : '',
    description: projectToEdit ? projectToEdit.description : '',
    techStackString: projectToEdit ? (projectToEdit.techStack || []).join(', ') : 'React, TailwindCSS, Node.js',
    startDate: projectToEdit ? projectToEdit.startDate : new Date().toISOString().split('T')[0],
    deadline: projectToEdit ? projectToEdit.deadline : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    githubUrl: projectToEdit ? projectToEdit.githubUrl || '' : '',
    liveUrl: projectToEdit ? projectToEdit.liveUrl || '' : '',
    status: projectToEdit ? projectToEdit.status : 'Development',
    milestones: projectToEdit && Array.isArray(projectToEdit.milestones)
      ? projectToEdit.milestones
      : [
          { id: 'm-1', title: 'System architecture & UI wireframes', completed: true },
          { id: 'm-2', title: 'Core functionality & API integration', completed: false }
        ]
  });

  const [newMilestoneInput, setNewMilestoneInput] = useState('');
  const [error, setError] = useState('');

  const handleAddMilestone = () => {
    if (newMilestoneInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        milestones: [
          ...prev.milestones,
          { id: 'm-' + Date.now(), title: newMilestoneInput.trim(), completed: false }
        ]
      }));
      setNewMilestoneInput('');
    }
  };

  const handleRemoveMilestone = (id) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((m) => m.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide a project name.');
      return;
    }

    const techStack = formData.techStackString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const completedMilestones = formData.milestones.filter((m) => m.completed).length;
    const progressPercentage = formData.milestones.length > 0
      ? Math.round((completedMilestones / formData.milestones.length) * 100)
      : formData.status === 'Completed' ? 100 : 30;

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      techStack,
      startDate: formData.startDate,
      deadline: formData.deadline,
      githubUrl: formData.githubUrl.trim(),
      liveUrl: formData.liveUrl.trim(),
      status: formData.status,
      milestones: formData.milestones,
      progressPercentage
    };

    if (projectToEdit) {
      editProject(projectToEdit.id, payload);
    } else {
      addProject(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={projectToEdit ? 'Edit Project Details' : 'Add New Portfolio Project'}
      subtitle="Track your technical builds, milestones, repositories and demos"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Project Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Project Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <FolderGit2 className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              required
              placeholder="e.g. AI-Powered Resume Screener"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Tech Stack & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Tech Stack (Comma Separated)
            </label>
            <input
              type="text"
              placeholder="e.g. React, Next.js, PostgreSQL, Tailwind"
              value={formData.techStackString}
              onChange={(e) => setFormData({ ...formData, techStackString: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Project Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Planning">Planning</option>
              <option value="Development">Development</option>
              <option value="Testing">Testing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* GitHub & Live URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              GitHub URL
            </label>
            <div className="relative">
              <GitBranch className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="url"
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Live Demo URL
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="url"
                placeholder="https://myproject.vercel.app"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Start Date & Deadline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Target Deadline
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Description & Key Innovations
          </label>
          <textarea
            rows="2"
            placeholder="What does the project do? What problem does it solve for users?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Milestones */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Key Milestones
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add milestone (e.g. Deploy to production on Vercel)..."
              value={newMilestoneInput}
              onChange={(e) => setNewMilestoneInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddMilestone();
                }
              }}
              className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
            />
            <Button type="button" size="sm" onClick={handleAddMilestone}>
              Add Milestone
            </Button>
          </div>

          <div className="space-y-1.5 max-h-32 overflow-y-auto">
            {formData.milestones.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200"
              >
                <span>{m.title}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMilestone(m.id)}
                  className="p-1 text-slate-400 hover:text-rose-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {projectToEdit ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
