/**
 * CampusOS Calculation Utilities
 * Handles attendance thresholds, exam countdowns, overdue checks, and roadmap metrics.
 */

// 1. ATTENDANCE CALCULATIONS
export const calculateSubjectAttendance = (present = 0, total = 0, targetPercent = 75) => {
  const p = Math.max(0, Number(present) || 0);
  const t = Math.max(p, Number(total) || 0);
  const absent = Math.max(0, t - p);
  
  if (t === 0) {
    return {
      percentage: 0,
      formattedPercentage: '0.0%',
      status: 'neutral',
      message: 'No classes logged yet',
      classesNeeded: 0,
      classesCanMiss: 0,
      present: p,
      total: t,
      absent
    };
  }

  const rawPercentage = (p / t) * 100;
  const percentage = Math.round(rawPercentage * 10) / 10;
  const target = targetPercent / 100;

  let classesNeeded = 0;
  let classesCanMiss = 0;
  let status = 'good'; // 'good', 'warning', 'critical'
  let message = '';

  if (rawPercentage < targetPercent) {
    // Formula: (p + x) / (t + x) >= target
    // p + x >= target * t + target * x
    // x * (1 - target) >= target * t - p
    // x = ceil((target * t - p) / (1 - target))
    classesNeeded = Math.ceil((target * t - p) / (1 - target));
    status = rawPercentage < targetPercent - 10 ? 'critical' : 'warning';
    message = `Need ${classesNeeded} more consecutive ${classesNeeded === 1 ? 'class' : 'classes'} to reach ${targetPercent}%`;
  } else {
    // Formula: p / (t + y) >= target
    // p >= target * t + target * y
    // target * y <= p - target * t
    // y = floor((p - target * t) / target)
    classesCanMiss = Math.floor((p - target * t) / target);
    status = 'good';
    if (classesCanMiss === 0) {
      message = `On the verge! Don't miss the next class to stay above ${targetPercent}%`;
    } else {
      message = `Can safely miss ${classesCanMiss} ${classesCanMiss === 1 ? 'class' : 'classes'} and stay above ${targetPercent}%`;
    }
  }

  return {
    percentage,
    formattedPercentage: `${percentage.toFixed(1)}%`,
    status,
    message,
    classesNeeded,
    classesCanMiss,
    present: p,
    total: t,
    absent
  };
};

export const calculateOverallAttendance = (attendanceMap = {}, targetPercent = 75) => {
  let totalPresent = 0;
  let totalClasses = 0;

  Object.values(attendanceMap).forEach((item) => {
    if (item && typeof item === 'object') {
      const p = Math.max(0, Number(item.present) || 0);
      const t = Math.max(p, Number(item.total) || 0);
      totalPresent += p;
      totalClasses += t;
    }
  });

  return calculateSubjectAttendance(totalPresent, totalClasses, targetPercent);
};

// 2. EXAM COUNTDOWN
export const getDaysRemaining = (targetDateString) => {
  if (!targetDateString) return { days: 0, text: 'No date', isPast: false, isToday: false, isUrgent: false };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(targetDateString);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { days: 0, text: 'Today', isPast: false, isToday: true, isUrgent: true };
  } else if (diffDays === 1) {
    return { days: 1, text: 'Tomorrow', isPast: false, isToday: false, isUrgent: true };
  } else if (diffDays > 1) {
    return {
      days: diffDays,
      text: `In ${diffDays} days`,
      isPast: false,
      isToday: false,
      isUrgent: diffDays <= 7
    };
  } else {
    const pastDays = Math.abs(diffDays);
    return {
      days: diffDays,
      text: `${pastDays} ${pastDays === 1 ? 'day' : 'days'} ago`,
      isPast: true,
      isToday: false,
      isUrgent: false
    };
  }
};

// 3. ASSIGNMENT UTILS
export const isAssignmentOverdue = (dueDate, status) => {
  if (status === 'Completed' || !dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

// 4. CAREER ROADMAP PROGRESS
export const calculateRoadmapProgress = (roadmapData) => {
  if (!roadmapData || !roadmapData.steps || roadmapData.steps.length === 0) {
    return { totalItems: 0, completedItems: 0, percentage: 0 };
  }

  let totalItems = 0;
  let completedItems = 0;

  roadmapData.steps.forEach((step) => {
    if (Array.isArray(step.checklist)) {
      step.checklist.forEach((item) => {
        totalItems++;
        if (item.completed) completedItems++;
      });
    }
  });

  const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  return { totalItems, completedItems, percentage };
};

// 5. SUBJECT OVERALL PROGRESS
export const calculateSubjectProgress = (subjectId, assignments = [], exams = [], attendance = null) => {
  const subAssignments = assignments.filter((a) => a.subjectId === subjectId);
  const completedAssignments = subAssignments.filter((a) => a.status === 'Completed').length;
  const assignmentProgress = subAssignments.length > 0 
    ? Math.round((completedAssignments / subAssignments.length) * 100) 
    : 100;

  const subExams = exams.filter((e) => e.subjectId === subjectId);
  let totalTopics = 0;
  let doneTopics = 0;
  subExams.forEach((e) => {
    if (Array.isArray(e.syllabus)) {
      e.syllabus.forEach((s) => {
        totalTopics++;
        if (s.done) doneTopics++;
      });
    }
  });
  const examPrepProgress = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  let attendanceStats = null;
  if (attendance) {
    attendanceStats = calculateSubjectAttendance(attendance.present, attendance.total);
  }

  // Blended completion metric
  const blendedProgress = totalTopics > 0 
    ? Math.round(examPrepProgress * 0.6 + assignmentProgress * 0.4)
    : assignmentProgress;

  return {
    assignmentProgress,
    examPrepProgress,
    blendedProgress,
    totalAssignments: subAssignments.length,
    completedAssignments,
    totalTopics,
    doneTopics,
    attendanceStats
  };
};

// 6. GREETING HELPER
export const getDynamicGreeting = (name = 'Student') => {
  const hour = new Date().getHours();
  let timeGreeting = 'Good morning';
  if (hour >= 12 && hour < 17) {
    timeGreeting = 'Good afternoon';
  } else if (hour >= 17 && hour < 22) {
    timeGreeting = 'Good evening';
  } else if (hour >= 22 || hour < 5) {
    timeGreeting = 'Burning the midnight oil';
  }
  return `${timeGreeting}, ${name} 👋`;
};

