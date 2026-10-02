import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  FileText,
  Plus,
  Search,
  Pin,
  PinOff,
  Edit2,
  Trash2,
  BookOpen,
  Calendar,
  Sparkles,
  Tag
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { EmptyState } from '../../common/EmptyState';
import { NoteEditorModal } from './NoteEditorModal';

export const NotesPage = () => {
  const {
    notes,
    deleteNote,
    togglePinNote,
    loadDemoData
  } = useApp();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const CATEGORIES = [
    'All',
    'DSA',
    'DBMS',
    'OS',
    'Computer Networks',
    'Mathematics',
    'Other'
  ];

  // Filter notes
  const filteredNotes = notes.filter((n) => {
    if (selectedCategory !== 'All' && n.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchContent = n.content.toLowerCase().includes(q);
      if (!matchTitle && !matchContent) return false;
    }
    return true;
  });

  // Sort pinned notes to top, then by latest updated
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Class Notes & Cheatsheets
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Quick revision summaries, algorithmic formulas, and lecture takeaways saved in your browser.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingNote(null);
            setIsEditorOpen(true);
          }}
          icon={Plus}
        >
          Create Note
        </Button>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-3">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search notes content or titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      {sortedNotes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No notes found"
          description={
            notes.length === 0
              ? 'Create revision notes for your computer science subjects and formulas.'
              : `No notes found under category "${selectedCategory}".`
          }
          actionLabel="Write New Note"
          onAction={() => setIsEditorOpen(true)}
          secondaryActionLabel={notes.length === 0 ? 'Load Demo Notes' : undefined}
          onSecondaryAction={notes.length === 0 ? loadDemoData : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedNotes.map((n) => (
            <Card
              key={n.id}
              className={`overflow-hidden flex flex-col justify-between p-5 ${
                n.isPinned
                  ? 'border-indigo-500/60 ring-1 ring-indigo-500/20 bg-indigo-500/[0.02]'
                  : ''
              }`}
            >
              <div>
                {/* Top Row */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <Badge variant="primary" size="sm">
                    {n.category}
                  </Badge>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => togglePinNote(n.id)}
                      className={`p-1 rounded-md transition-colors ${
                        n.isPinned
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={n.isPinned ? 'Unpin note' : 'Pin note to top'}
                    >
                      <Pin className={`w-3.5 h-3.5 ${n.isPinned ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingNote(n);
                        setIsEditorOpen(true);
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-indigo-600"
                      title="Edit note"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteNote(n.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {n.title}
                </h3>

                {/* Content preview */}
                <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-6 leading-relaxed whitespace-pre-line font-sans opacity-90">
                  {n.content}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Updated {n.updatedAt}
                </span>

                <button
                  onClick={() => {
                    setEditingNote(n);
                    setIsEditorOpen(true);
                  }}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View / Edit Note
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Note Editor Modal */}
      {isEditorOpen && (
        <NoteEditorModal
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingNote(null);
          }}
          noteToEdit={editingNote}
        />
      )}
    </div>
  );
};

