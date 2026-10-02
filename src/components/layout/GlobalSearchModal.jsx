import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  BookOpen,
  CheckSquare,
  CalendarDays,
  FolderGit2,
  Bookmark,
  FileText,
  ArrowRight,
  X,
  Clock
} from 'lucide-react';

export const GlobalSearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    subjects,
    assignments,
    exams,
    projects,
    resources,
    notes,
    setActiveTab
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Global keydown listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Search filter logic
  const filteredAssignments = q
    ? assignments.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.subjectName?.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q)
      )
    : [];

  const filteredExams = q
    ? exams.filter(
        (e) =>
          e.subjectName?.toLowerCase().includes(q) ||
          e.examType?.toLowerCase().includes(q) ||
          e.syllabus?.some((s) => s.topic.toLowerCase().includes(q))
      )
    : [];

  const filteredSubjects = q
    ? subjects.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.professor?.toLowerCase().includes(q) ||
          s.room?.toLowerCase().includes(q)
      )
    : [];

  const filteredProjects = q
    ? projects.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.techStack?.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const filteredResources = q
    ? resources.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.category?.toLowerCase().includes(q) ||
          r.tags?.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const filteredNotes = q
    ? notes.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content?.toLowerCase().includes(q) ||
          n.category?.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    filteredAssignments.length +
    filteredExams.length +
    filteredSubjects.length +
    filteredProjects.length +
    filteredResources.length +
    filteredNotes.length;

  const handleSelectResult = (tabId) => {
    setActiveTab(tabId);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Search Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 animate-slide-up">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-indigo-500 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search anything (e.g. 'Trees', 'DBMS', 'Mid-Term', 'React')..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {!query ? (
            <div className="py-8 text-center">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Search across all your academic items in one keystroke
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {['Data Structures', 'Operating Systems', 'Assignment', 'Exam', 'Figma', 'LeetCode'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center">
              <p className="text-base font-semibold text-slate-900 dark:text-white">
                No matching results found
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Try searching for a different keyword, subject name or topic.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Assignments matches */}
              {filteredAssignments.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
                    <CheckSquare className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Assignments ({filteredAssignments.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredAssignments.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => handleSelectResult('assignments')}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition-colors group"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {a.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {a.subjectName} • Due {a.dueDate} • {a.status}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exams matches */}
              {filteredExams.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
                    <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
                    <span>Exams ({filteredExams.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredExams.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => handleSelectResult('exams')}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition-colors group"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {e.subjectName} - {e.examType}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            Date: {e.examDate} • {e.examTime}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subjects matches */}
              {filteredSubjects.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Subjects ({filteredSubjects.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredSubjects.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSelectResult('subjects')}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition-colors group"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {s.name} ({s.code})
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {s.professor} • {s.room}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes matches */}
              {filteredNotes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
                    <FileText className="w-3.5 h-3.5 text-purple-500" />
                    <span>Notes ({filteredNotes.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredNotes.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => handleSelectResult('notes')}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition-colors group"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            Category: {n.category} • Updated {n.updatedAt}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects matches */}
              {filteredProjects.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
                    <FolderGit2 className="w-3.5 h-3.5 text-sky-500" />
                    <span>Projects ({filteredProjects.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredProjects.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectResult('projects')}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition-colors group"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            Tech: {p.techStack?.join(', ')} • Status: {p.status}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources matches */}
              {filteredResources.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
                    <Bookmark className="w-3.5 h-3.5 text-rose-500" />
                    <span>Resources ({filteredResources.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredResources.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => handleSelectResult('resources')}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition-colors group"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {r.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            Category: {r.category} • {r.url}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between text-xs text-slate-400">
          <span>Search index is 100% private and runs locally in your browser</span>
          <span>{totalResults} matches</span>
        </div>
      </div>
    </div>
  );
};

