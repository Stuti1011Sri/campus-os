import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flame, Sparkles } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const PomodoroTimer = () => {
  const { triggerCelebration, showToast, logActivity } = useApp();

  const [mode, setMode] = useState('focus'); // 'focus' (25m) | 'short' (5m) | 'long' (15m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const MODES = {
    focus: { name: 'Focus Session', time: 25 * 60, color: 'text-indigo-500' },
    short: { name: 'Short Break', time: 5 * 60, color: 'text-emerald-500' },
    long: { name: 'Long Break', time: 15 * 60, color: 'text-purple-500' }
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      triggerCelebration();
      if (mode === 'focus') {
        const nextCount = sessionsCompleted + 1;
        setSessionsCompleted(nextCount);
        showToast('Focus Block Complete! 🎉', 'Take a well-deserved short break.');
        logActivity(`Completed 25-minute Pomodoro study sprint #${nextCount}`, 'study');
        setMode('short');
        setTimeLeft(5 * 60);
      } else {
        showToast('Break Finished! ⚡', 'Ready to dive back into deep focus?');
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, sessionsCompleted]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].time);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODES[mode].time);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progress = ((MODES[mode].time - timeLeft) / MODES[mode].time) * 100;

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/30 border border-indigo-500/30 shadow-lg text-center backdrop-blur-md">
      {/* Mode selectors */}
      <div className="flex items-center justify-center gap-1.5 mb-4 p-1 rounded-xl bg-slate-900/80 border border-slate-800 max-w-xs mx-auto">
        <button
          onClick={() => switchMode('focus')}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
            mode === 'focus'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          25m Focus
        </button>
        <button
          onClick={() => switchMode('short')}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
            mode === 'short'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          5m Break
        </button>
        <button
          onClick={() => switchMode('long')}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
            mode === 'long'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          15m Long
        </button>
      </div>

      {/* Clock display */}
      <div className="my-2">
        <span className="text-5xl sm:text-6xl font-black text-white tracking-tight font-mono">
          {formattedTime}
        </span>
        <p className={`text-xs font-bold mt-1 ${MODES[mode].color}`}>
          {MODES[mode].name}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" /> Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Start Focus
            </>
          )}
        </button>

        <button
          onClick={resetTimer}
          className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Streak count */}
      <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-semibold mt-4">
        <Flame className="w-3.5 h-3.5 text-rose-500" />
        <span>Completed sprints today: <strong className="text-white">{sessionsCompleted}</strong></span>
      </div>
    </div>
  );
};

