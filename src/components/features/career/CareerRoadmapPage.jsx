import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Compass,
  CheckCircle2,
  Circle,
  ExternalLink,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  Check,
  Code2,
  Globe,
  BarChart3,
  Cpu,
  Shield,
  Palette
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { ProgressBar } from '../../common/ProgressBar';
import { calculateRoadmapProgress } from '../../../utils/calculations';
import { CAREER_ROADMAPS } from '../../../data/roadmapsData';

export const CareerRoadmapPage = () => {
  const {
    careerRoadmaps,
    userProfile,
    setUserProfile,
    toggleRoadmapChecklist,
    showToast
  } = useApp();

  const [selectedGoal, setSelectedGoal] = useState(
    userProfile.careerGoal || 'Software Developer'
  );

  const availableRoles = [
    { key: 'Software Developer', label: 'Software Developer', icon: Code2, color: 'text-indigo-500' },
    { key: 'Web Developer', label: 'Web Developer', icon: Globe, color: 'text-emerald-500' },
    { key: 'Data Analyst', label: 'Data Analyst', icon: BarChart3, color: 'text-amber-500' },
    { key: 'AI/ML Engineer', label: 'AI/ML Engineer', icon: Cpu, color: 'text-purple-500' },
    { key: 'Cybersecurity', label: 'Cybersecurity', icon: Shield, color: 'text-rose-500' },
    { key: 'UI/UX Designer', label: 'UI/UX Designer', icon: Palette, color: 'text-pink-500' }
  ];

  const currentRoadmap = careerRoadmaps[selectedGoal] || CAREER_ROADMAPS[selectedGoal] || CAREER_ROADMAPS['Software Developer'];
  const progressStats = calculateRoadmapProgress(currentRoadmap);

  const handleSetAsPrimaryGoal = () => {
    setUserProfile((prev) => ({ ...prev, careerGoal: selectedGoal }));
    showToast('Primary Career Goal Updated! 🚀', `Set to ${selectedGoal}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Career Pathway & Skill Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Industry-vetted curriculum, checklist milestones, and interview preparation guides.
          </p>
        </div>

        {userProfile.careerGoal !== selectedGoal && (
          <button
            onClick={handleSetAsPrimaryGoal}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Set as My Dashboard Goal</span>
          </button>
        )}
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {availableRoles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedGoal === role.key;
          const isPrimary = userProfile.careerGoal === role.key;
          const roleStats = calculateRoadmapProgress(careerRoadmaps[role.key] || CAREER_ROADMAPS[role.key]);

          return (
            <button
              key={role.key}
              onClick={() => setSelectedGoal(role.key)}
              className={`p-3 rounded-2xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 scale-[1.02]'
                  : 'bg-white dark:bg-[#111827] border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
              }`}
            >
              {isPrimary && (
                <span
                  className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600'
                  }`}
                >
                  Primary
                </span>
              )}
              <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-white' : role.color}`} />
              <div className="text-xs font-bold truncate">{role.label}</div>
              <div
                className={`text-[10px] mt-1 font-semibold ${
                  isSelected ? 'text-indigo-100' : 'text-slate-400'
                }`}
              >
                {roleStats.percentage}% Ready
              </div>
            </button>
          );
        })}
      </div>

      {/* Overall Progress Banner */}
      <Card className="p-6 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/40 border-indigo-500/30 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {selectedGoal}
              </span>
              <span className="text-xs text-slate-300">
                {currentRoadmap.steps.length} Progression Steps
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {currentRoadmap.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {currentRoadmap.description}
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-2xl bg-slate-900/60 border border-slate-700/80 min-w-[200px] text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Readiness Score
            </span>
            <div className="text-4xl font-black text-white my-1">
              {progressStats.percentage}%
            </div>
            <ProgressBar progress={progressStats.percentage} size="sm" color="purple" className="mt-2" />
            <p className="text-[10px] text-slate-400 mt-2 font-semibold">
              {progressStats.completedItems} of {progressStats.totalItems} milestones unlocked
            </p>
          </div>
        </div>
      </Card>

      {/* Roadmap Steps Timeline List */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-500" />
          <span>Curriculum Stages & Checkpoints</span>
        </h3>

        <div className="space-y-4">
          {currentRoadmap.steps.map((step, stepIndex) => {
            const stepTotal = step.checklist?.length || 0;
            const stepCompleted = step.checklist?.filter((c) => c.completed).length || 0;
            const stepPct = stepTotal > 0 ? Math.round((stepCompleted / stepTotal) * 100) : 0;
            const isFullyComplete = stepPct === 100;

            return (
              <Card
                key={step.id}
                className={`p-5 sm:p-6 transition-all border-l-4 ${
                  isFullyComplete
                    ? 'border-l-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-l-indigo-500'
                }`}
              >
                {/* Step Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isFullyComplete
                          ? 'bg-emerald-500 text-white'
                          : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                      }`}
                    >
                      {stepIndex + 1}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {stepCompleted}/{stepTotal} done ({stepPct}%)
                    </span>
                    <div className="w-24">
                      <ProgressBar progress={stepPct} size="sm" color="auto" />
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {step.description}
                </p>

                {/* Interactive Checklist Items */}
                <div className="space-y-2 mb-4 bg-slate-50/70 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Required Knowledge Checkpoints
                  </span>
                  {step.checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleRoadmapChecklist(selectedGoal, step.id, item.id)}
                      className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-all ${
                        item.completed
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-medium'
                          : 'bg-white dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                      )}
                      <span className={`text-xs ${item.completed ? 'line-through opacity-80' : ''}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Recommended Free Resources & Guides */}
                {Array.isArray(step.resources) && step.resources.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                    <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      Recommended Free Materials:
                    </span>
                    {step.resources.map((res, rIdx) => (
                      <a
                        key={rIdx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 transition-colors font-medium"
                      >
                        <span>{res.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

