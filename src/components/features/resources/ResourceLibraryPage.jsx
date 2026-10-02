import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Bookmark,
  Plus,
  ExternalLink,
  Star,
  Search,
  Tag,
  Edit2,
  Trash2,
  BookOpen,
  Code2,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Compass,
  Sparkles
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { EmptyState } from '../../common/EmptyState';
import { AddResourceModal } from './AddResourceModal';

export const ResourceLibraryPage = () => {
  const {
    resources,
    deleteResource,
    toggleFavoriteResource,
    loadDemoData
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const CATEGORIES = [
    { id: 'All', label: 'All Resources', icon: Bookmark },
    { id: 'DSA', label: 'DSA & Coding', icon: Code2 },
    { id: 'Programming', label: 'Programming', icon: Code2 },
    { id: 'Internships', label: 'Internships & Jobs', icon: Briefcase },
    { id: 'Career', label: 'Career & Prep', icon: Compass },
    { id: 'Projects', label: 'Projects & UI', icon: FolderGit2 },
    { id: 'Learning', label: 'Textbooks & CS', icon: BookOpen },
    { id: 'College', label: 'College Portals', icon: GraduationCap }
  ];

  const filteredResources = resources.filter((res) => {
    if (selectedCategory !== 'All' && res.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = res.title.toLowerCase().includes(q);
      const matchDesc = res.description?.toLowerCase().includes(q);
      const matchTags = res.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTags) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic & Career Resource Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Curate and bookmark standard DSA sheets, interview questions, textbooks and internship boards.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingResource(null);
            setIsAddModalOpen(true);
          }}
          icon={Plus}
        >
          Add Resource
        </Button>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-3">
        {/* Search bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources by title, keyword or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                    : 'bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resources Cards Grid */}
      {filteredResources.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No resources found"
          description={
            resources.length === 0
              ? 'Save your favorite documentation, cheatsheets and learning portals.'
              : `No resources match your filter for "${selectedCategory}".`
          }
          actionLabel="Add Resource Link"
          onAction={() => setIsAddModalOpen(true)}
          secondaryActionLabel={resources.length === 0 ? 'Load Demo Resources' : undefined}
          onSecondaryAction={resources.length === 0 ? loadDemoData : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((res) => (
            <Card key={res.id} className="overflow-hidden flex flex-col justify-between p-5">
              <div>
                {/* Top bar */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <Badge variant="primary" size="sm">
                    {res.category}
                  </Badge>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleFavoriteResource(res.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-amber-500 transition-colors"
                      title="Favorite"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          res.isFavorite
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-slate-400 hover:text-amber-400'
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => {
                        setEditingResource(res);
                        setIsAddModalOpen(true);
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-indigo-600"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteResource(res.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {res.title}
                </h3>
                {res.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {res.description}
                  </p>
                )}

                {/* Tags */}
                {Array.isArray(res.tags) && res.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {res.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Open Link Button */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Resource Modal */}
      {isAddModalOpen && (
        <AddResourceModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingResource(null);
          }}
          resourceToEdit={editingResource}
        />
      )}
    </div>
  );
};

