import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2 text-sm rounded-xl gap-2 font-medium',
    lg: 'px-5 py-2.5 text-base rounded-xl gap-2.5 font-semibold'
  };

  const variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm shadow-indigo-600/20 hover:shadow-indigo-600/30',
    secondary: 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200',
    outline: 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300',
    danger: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-sm shadow-rose-600/20',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
};

