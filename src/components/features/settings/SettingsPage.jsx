import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Settings,
  User,
  Building,
  GraduationCap,
  Compass,
  Sun,
  Moon,
  Download,
  Upload,
  Sparkles,
  Trash2,
  ShieldCheck,
  Check,
  AlertTriangle
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../../common/Card';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';

export const SettingsPage = () => {
  const {
    userProfile,
    setUserProfile,
    theme,
    toggleTheme,
    loadDemoData,
    resetAllData,
    showToast,
    subjects,
    attendance,
    assignments,
    exams,
    studySessions,
    careerRoadmaps,
    projects,
    resources,
    collegeInfo,
    notes,
    todayTasks
  } = useApp();

  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    collegeName: userProfile.collegeName || '',
    course: userProfile.course || 'B.Tech',
    branch: userProfile.branch || 'Computer Science & Engineering',
    year: userProfile.year || '2nd Year',
    semester: userProfile.semester || '4th Semester',
    careerGoal: userProfile.careerGoal || 'Software Developer',
    targetAttendancePercentage: userProfile.targetAttendancePercentage || 75
  });

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const CAREER_OPTIONS = [
    'Software Developer',
    'Data Analyst',
    'Web Developer',
    'AI/ML Engineer',
    'Cybersecurity',
    'UI/UX Designer'
  ];

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setUserProfile((prev) => ({
      ...prev,
      ...formData
    }));
    showToast('Profile Saved! ✅', 'Your student information has been updated');
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      userProfile,
      subjects,
      attendance,
      assignments,
      exams,
      studySessions,
      careerRoadmaps,
      projects,
      resources,
      collegeInfo,
      notes,
      todayTasks
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CampusOS_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup Downloaded! 📦', 'CampusOS JSON data exported successfully');
  };

  // Import JSON Backup
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.userProfile) {
          localStorage.setItem('campusos_user_profile', JSON.stringify(parsed.userProfile));
          if (parsed.subjects) localStorage.setItem('campusos_subjects', JSON.stringify(parsed.subjects));
          if (parsed.attendance) localStorage.setItem('campusos_attendance', JSON.stringify(parsed.attendance));
          if (parsed.assignments) localStorage.setItem('campusos_assignments', JSON.stringify(parsed.assignments));
          if (parsed.exams) localStorage.setItem('campusos_exams', JSON.stringify(parsed.exams));
          if (parsed.studySessions) localStorage.setItem('campusos_study_sessions', JSON.stringify(parsed.studySessions));
          if (parsed.projects) localStorage.setItem('campusos_projects', JSON.stringify(parsed.projects));
          if (parsed.resources) localStorage.setItem('campusos_resources', JSON.stringify(parsed.resources));
          if (parsed.notes) localStorage.setItem('campusos_notes', JSON.stringify(parsed.notes));
          
          window.location.reload();
        } else {
          showToast('Invalid Backup', 'The selected JSON is not a valid CampusOS export', 'error');
        }
      } catch (err) {
        showToast('Import Failed', 'Unable to parse backup JSON file', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System & Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Configure personal details, attendance requirements, dark mode, and local JSON backups.
        </p>
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mb-0.5">
            100% Client-Side Privacy Guarantee
          </strong>
          Your data is stored locally in this browser's <code className="px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">localStorage</code>. No passwords, credentials, or personal telemetry are transmitted over the web.
        </div>
      </div>

      {/* Student Profile Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500" />
            <CardTitle subtitle="Your personal academic credentials and degree info">
              Student Profile
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  College / University
                </label>
                <input
                  type="text"
                  required
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Course
                </label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Branch / Department
                </label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Year
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Semester
                </label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="3rd Semester">3rd Semester</option>
                  <option value="4th Semester">4th Semester</option>
                  <option value="5th Semester">5th Semester</option>
                  <option value="6th Semester">6th Semester</option>
                  <option value="7th Semester">7th Semester</option>
                  <option value="8th Semester">8th Semester</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Career Goal
                </label>
                <select
                  value={formData.careerGoal}
                  onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {CAREER_OPTIONS.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Attendance Threshold */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Target Attendance Threshold
                </label>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                  {formData.targetAttendancePercentage}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={formData.targetAttendancePercentage}
                onChange={(e) =>
                  setFormData({ ...formData, targetAttendancePercentage: Number(e.target.value) })
                }
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Appearance & Theme */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-indigo-500" />
            <CardTitle subtitle="Choose your preferred visual aesthetic">
              Appearance & Theme
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {theme === 'dark' ? 'Dark Mode (Active)' : 'Light Mode (Active)'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Switch between high-contrast dark palette and modern light mode.
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-500 transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" /> Switch to Light
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" /> Switch to Dark
                </>
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Data Backup & Demo Utilities */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-indigo-500" />
            <CardTitle subtitle="Export or restore your complete academic workspace">
              Data Management & Backup
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Export JSON */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Export JSON Backup
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Download all your subjects, attendance logs, notes and exams into a single file.
                </p>
              </div>
              <button
                onClick={handleExportBackup}
                className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download JSON Backup</span>
              </button>
            </div>

            {/* Import JSON */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Restore from Backup
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Load a previously exported CampusOS JSON backup file.
                </p>
              </div>
              <label className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload JSON File</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Demo Data & Factory Reset */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={loadDemoData}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Reload Academic Demo Dataset</span>
            </button>

            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Reset All Data</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <Modal
          isOpen={isResetConfirmOpen}
          onClose={() => setIsResetConfirmOpen(false)}
          title="Reset All Local Data?"
          subtitle="This action cannot be undone"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
              <AlertTriangle className="w-5 h-5 text-rose-500 mb-2" />
              Are you sure you want to delete all saved subjects, attendance logs, assignments, exams and notes from this browser?
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setIsResetConfirmOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  resetAllData();
                  setIsResetConfirmOpen(false);
                }}
              >
                Yes, Reset Everything
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

