import React from 'react';

export const ProgressBar = ({
  progress = 0,
  max = 100,
  size = 'md',
  color = 'primary', // 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'auto'
  showText = false,
  className = ''
}) => {
  const normalized = Math.min(100, Math.max(0, (progress / max) * 100));

  const heightClasses = {
    xs: 'h-1.5',
    sm: 'h-2',
    md: 'h-2.5',
    lg: 'h-3.5'
  };

  let fillColor = 'bg-indigo-600 dark:bg-indigo-500';
  if (color === 'auto') {
    if (normalized >= 75) fillColor = 'bg-emerald-500';
    else if (normalized >= 65) fillColor = 'bg-amber-500';
    else fillColor = 'bg-rose-500';
  } else if (color === 'success') {
    fillColor = 'bg-emerald-500';
  } else if (color === 'warning') {
    fillColor = 'bg-amber-500';
  } else if (color === 'danger') {
    fillColor = 'bg-rose-500';
  } else if (color === 'purple') {
    fillColor = 'bg-purple-500';
  }

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>Progress</span>
          <span>{Math.round(normalized)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 dark:bg-slate-800/90 rounded-full overflow-hidden ${heightClasses[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${fillColor}`}
          style={{ width: `${normalized}%` }}
        />
      </div>
    </div>
  );
};

