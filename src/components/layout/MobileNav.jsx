import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  PieChart,
  CheckSquare,
  CalendarDays,
  Menu
} from 'lucide-react';

export const MobileNav = ({ onOpenMenu }) => {
  const { activeTab, setActiveTab } = useApp();

  const QUICK_TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: PieChart },
    { id: 'assignments', label: 'Tasks', icon: CheckSquare },
    { id: 'exams', label: 'Exams', icon: CalendarDays }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 transition-colors px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around">
        {QUICK_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}

        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">More</span>
        </button>
      </div>
    </nav>
  );
};

