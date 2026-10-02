import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import {
  GraduationCap,
  Sparkles,
  User,
  Building,
  BookOpen,
  Compass,
  ArrowRight,
  Check
} from 'lucide-react';

export const OnboardingModal = ({ isOpen, onClose }) => {
  const { completeOnboarding, userProfile, loadDemoData } = useApp();

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

  const [error, setError] = useState('');

  const CAREER_OPTIONS = [
    'Software Developer',
    'Data Analyst',
    'Web Developer',
    'AI/ML Engineer',
    'Cybersecurity',
    'UI/UX Designer'
  ];

  const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];
  const SEMESTER_OPTIONS = [
    '1st Semester',
    '2nd Semester',
    '3rd Semester',
    '4th Semester',
    '5th Semester',
    '6th Semester',
    '7th Semester',
    '8th Semester'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter your name to personalize your workspace.');
      return;
    }
    if (!formData.collegeName.trim()) {
      setError('Please enter your college/university name.');
      return;
    }
    setError('');
    completeOnboarding(formData);
  };

  const handleUseDemo = () => {
    loadDemoData();
    if (onClose) onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose || (() => {})}
      title="Welcome to CampusOS"
      subtitle="Set up your college profile in 30 seconds to personalize your dashboard"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Name & College */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Your Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Aryan Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              College / University <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. National Institute of Technology"
                value={formData.collegeName}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Course & Branch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Course / Degree
            </label>
            <input
              type="text"
              placeholder="e.g. B.Tech, BCA, B.Sc"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Branch / Department
            </label>
            <input
              type="text"
              placeholder="e.g. Computer Science & Engineering"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Year & Semester */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Current Year
            </label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {YEAR_OPTIONS.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Current Semester
            </label>
            <select
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {SEMESTER_OPTIONS.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Career Goal Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Primary Career Goal (Generates your tailored roadmap)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {CAREER_OPTIONS.map((goal) => {
              const isSelected = formData.careerGoal === goal;
              return (
                <button
                  type="button"
                  key={goal}
                  onClick={() => setFormData({ ...formData, careerGoal: goal })}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Compass className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-indigo-500'}`} />
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span>{goal}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Attendance Target */}
        <div>
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
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            CampusOS will alert you whenever your attendance drops below this number.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleUseDemo}
            className="text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Or test with pre-filled sample student data</span>
          </button>

          <Button type="submit" size="md" icon={ArrowRight}>
            Launch My CampusOS
          </Button>
        </div>
      </form>
    </Modal>
  );
};

