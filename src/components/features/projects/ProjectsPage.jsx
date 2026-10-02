import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  FolderGit2,
  Plus,
  GitBranch,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Circle,
  Edit2,
  Trash2,
  Tag,
  Layers,
  Sparkles
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { ProgressBar } from '../../common/ProgressBar';
import { EmptyState } from '../../common/EmptyState';
import { AddProjectModal } from './AddProjectModal';

export const ProjectsPage = () => {
  const {
    projects,
    deleteProject,
    toggleProjectMilestone,
    loadDemoData
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredProjects = statusFilter === 'All'
    ? projects
    : projects.filter((p) => p.status === statusFilter);

  const STATUSES = ['All', 'Planning', 'Development', 'Testing', 'Completed'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Project Portfolio Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage semester major projects, hackathon prototypes, GitHub links and launch milestones.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingProject(null);
            setIsAddModalOpen(true);
          }}
          icon={Plus}
        >
          Add Project
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 max-w-fit overflow-x-auto">
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              statusFilter === status
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={FolderGit2}
          title="No projects found"
          description={
            projects.length === 0
              ? 'Start tracking your engineering portfolio, GitHub repositories, and tech stacks.'
              : `No projects found with status "${statusFilter}".`
          }
          actionLabel="Add New Project"
          onAction={() => setIsAddModalOpen(true)}
          secondaryActionLabel={projects.length === 0 ? 'Load Sample Projects' : undefined}
          onSecondaryAction={projects.length === 0 ? loadDemoData : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((p) => {
            const milestones = p.milestones || [];
            const completedCount = milestones.filter((m) => m.completed).length;

            return (
              <Card key={p.id} className="overflow-hidden flex flex-col justify-between">
                <div className="p-5">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge
                      variant={
                        p.status === 'Completed'
                          ? 'success'
                          : p.status === 'Development'
                          ? 'primary'
                          : p.status === 'Testing'
                          ? 'purple'
                          : 'default'
                      }
                      size="sm"
                    >
                      {p.status}
                    </Badge>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setIsAddModalOpen(true);
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Edit project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProject(p.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Name & Description */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Tech Stack Badges */}
                  {Array.isArray(p.techStack) && p.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Milestones Checklist */}
                  {milestones.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                          Milestones
                        </span>
                        <span className="text-slate-500 font-semibold text-[11px]">
                          {completedCount}/{milestones.length}
                        </span>
                      </div>
                      <ProgressBar progress={p.progressPercentage || 0} size="xs" color="auto" className="mb-2" />

                      <div className="space-y-1.5 max-h-28 overflow-y-auto">
                        {milestones.map((m) => (
                          <div
                            key={m.id}
                            onClick={() => toggleProjectMilestone(p.id, m.id)}
                            className="flex items-start gap-2 p-1.5 rounded-lg text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                          >
                            {m.completed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                            )}
                            <span className={m.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}>
                              {m.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Bar with Links */}
                <div className="px-5 py-3 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Due {p.deadline || 'Ongoing'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                        title="GitHub Repository"
                      >
                        <GitBranch className="w-4 h-4" />
                      </a>
                    )}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isAddModalOpen && (
        <AddProjectModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProject(null);
          }}
          projectToEdit={editingProject}
        />
      )}
    </div>
  );
};
