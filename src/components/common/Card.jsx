import React from 'react';

export const Card = ({ children, className = '', hover = true, onClick, glass = false }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border transition-all duration-200 ${
        glass
          ? 'glass-card'
          : 'bg-white dark:bg-[#111827] border-slate-200/80 dark:border-slate-800/80 shadow-sm dark:shadow-none'
      } ${
        hover
          ? 'hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md dark:hover:shadow-slate-900/40'
          : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', action }) => {
  return (
    <div className={`px-5 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between ${className}`}>
      <div>{children}</div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = '', subtitle }) => {
  return (
    <div>
      <h3 className={`text-base font-bold text-slate-900 dark:text-white ${className}`}>
        {children}
      </h3>
      {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
  );
};

