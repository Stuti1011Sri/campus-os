import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  DEMO_USER_PROFILE,
  DEMO_SUBJECTS,
  DEMO_ATTENDANCE,
  DEMO_ASSIGNMENTS,
  DEMO_EXAMS,
  DEMO_STUDY_SESSIONS,
  DEMO_PROJECTS,
  DEMO_RESOURCES,
  DEMO_COLLEGE_INFO,
  DEMO_NOTES,
  DEMO_TODAY_TASKS,
  DEMO_ACTIVITY_LOG
} from '../data/demoData';
import { CAREER_ROADMAPS } from '../data/roadmapsData';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  PROFILE: 'campusos_user_profile',
  SUBJECTS: 'campusos_subjects',
  ATTENDANCE: 'campusos_attendance',
  ASSIGNMENTS: 'campusos_assignments',
  EXAMS: 'campusos_exams',
  STUDY_SESSIONS: 'campusos_study_sessions',
  CAREER_ROADMAP: 'campusos_career_roadmap',
  PROJECTS: 'campusos_projects',
  RESOURCES: 'campusos_resources',
  COLLEGE_INFO: 'campusos_college_info',
  NOTES: 'campusos_notes',
  TASKS: 'campusos_tasks',
  ACTIVITY: 'campusos_activity',
  THEME: 'campusos_theme',
  ONBOARDED: 'campusos_onboarded',
  HAS_VISITED: 'campusos_has_visited'
};

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  });

  // Flow State: Landing vs App
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDED) === 'true';
  });

  const [currentView, setCurrentView] = useState(() => {
    const hasVisited = localStorage.getItem(STORAGE_KEYS.HAS_VISITED);
    return hasVisited ? 'dashboard' : 'landing';
  });

  // Active navigation tab inside app
  const [activeTab, setActiveTab] = useState('dashboard');

  // Search & Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // DATA STATES WITH LOCAL STORAGE
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : DEMO_USER_PROFILE;
  });

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    return saved ? JSON.parse(saved) : DEMO_SUBJECTS;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    return saved ? JSON.parse(saved) : DEMO_ATTENDANCE;
  });

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
    return saved ? JSON.parse(saved) : DEMO_ASSIGNMENTS;
  });

  const [exams, setExams] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXAMS);
    return saved ? JSON.parse(saved) : DEMO_EXAMS;
  });

  const [studySessions, setStudySessions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDY_SESSIONS);
    return saved ? JSON.parse(saved) : DEMO_STUDY_SESSIONS;
  });

  const [careerRoadmaps, setCareerRoadmaps] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CAREER_ROADMAP);
    return saved ? JSON.parse(saved) : CAREER_ROADMAPS;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : DEMO_PROJECTS;
  });

  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESOURCES);
    return saved ? JSON.parse(saved) : DEMO_RESOURCES;
  });

  const [collegeInfo, setCollegeInfo] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COLLEGE_INFO);
    return saved ? JSON.parse(saved) : DEMO_COLLEGE_INFO;
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
    return saved ? JSON.parse(saved) : DEMO_NOTES;
  });

  const [todayTasks, setTodayTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    return saved ? JSON.parse(saved) : DEMO_TODAY_TASKS;
  });

  const [activityLog, setActivityLog] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
    return saved ? JSON.parse(saved) : DEMO_ACTIVITY_LOG;
  });

  // Synchronize theme to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Synchronize state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDY_SESSIONS, JSON.stringify(studySessions));
  }, [studySessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CAREER_ROADMAP, JSON.stringify(careerRoadmaps));
  }, [careerRoadmaps]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLLEGE_INFO, JSON.stringify(collegeInfo));
  }, [collegeInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(todayTasks));
  }, [todayTasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDED, String(isOnboarded));
  }, [isOnboarded]);

  // TOAST NOTIFICATIONS HELPER
  const showToast = (title, message = '', type = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // LOG ACTIVITY HELPER
  const logActivity = (message, type = 'general') => {
    const newLog = {
      id: 'act-' + Date.now(),
      message,
      time: 'Just now',
      type
    };
    setActivityLog((prev) => [newLog, ...prev.slice(0, 19)]); // Keep last 20
  };

  // TRIGGER CONFETTI CELEBRATION
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Graceful fallback
    }
  };

  // TOGGLE THEME
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // ONBOARDING COMPLETE
  const completeOnboarding = (profileData) => {
    setUserProfile((prev) => ({
      ...prev,
      ...profileData,
      onboarded: true
    }));
    setIsOnboarded(true);
    localStorage.setItem(STORAGE_KEYS.HAS_VISITED, 'true');
    setCurrentView('dashboard');
    setIsOnboardingOpen(false);
    triggerCelebration();
    showToast('Welcome to CampusOS! 🎉', `Profile set up for ${profileData.name}`);
    logActivity(`Completed profile setup for ${profileData.careerGoal}`, 'profile');
  };

  // LOAD DEMO DATA
  const loadDemoData = () => {
    setUserProfile(DEMO_USER_PROFILE);
    setSubjects(DEMO_SUBJECTS);
    setAttendance(DEMO_ATTENDANCE);
    setAssignments(DEMO_ASSIGNMENTS);
    setExams(DEMO_EXAMS);
    setStudySessions(DEMO_STUDY_SESSIONS);
    setCareerRoadmaps(CAREER_ROADMAPS);
    setProjects(DEMO_PROJECTS);
    setResources(DEMO_RESOURCES);
    setCollegeInfo(DEMO_COLLEGE_INFO);
    setNotes(DEMO_NOTES);
    setTodayTasks(DEMO_TODAY_TASKS);
    setActivityLog(DEMO_ACTIVITY_LOG);
    setIsOnboarded(true);
    localStorage.setItem(STORAGE_KEYS.HAS_VISITED, 'true');
    triggerCelebration();
    showToast('Demo Data Loaded! 🚀', 'Explore subjects, attendance, roadmaps and projects');
    logActivity('Loaded standard academic demo dataset', 'system');
  };

  // RESET ALL DATA
  const resetAllData = () => {
    localStorage.clear();
    const emptyProfile = {
      name: '',
      collegeName: '',
      course: '',
      branch: '',
      year: '1st Year',
      semester: '1st Semester',
      careerGoal: 'Software Developer',
      targetAttendancePercentage: 75,
      avatarUrl: ''
    };
    setUserProfile(emptyProfile);
    setSubjects([]);
    setAttendance({});
    setAssignments([]);
    setExams([]);
    setStudySessions([]);
    setCareerRoadmaps(CAREER_ROADMAPS);
    setProjects([]);
    setResources([]);
    setCollegeInfo({ institution: '', portalUrl: '', examPortalUrl: '', libraryUrl: '', placementCellUrl: '', quickLinks: [], contacts: [] });
    setNotes([]);
    setTodayTasks([]);
    setActivityLog([]);
    setIsOnboarded(false);
    setCurrentView('landing');
    showToast('Data Reset', 'All local data cleared. You can start fresh or reload demo data.', 'info');
  };

  // ATTENDANCE ACTIONS
  const markAttendance = (subjectId, isPresent) => {
    setAttendance((prev) => {
      const current = prev[subjectId] || { total: 0, present: 0, absent: 0 };
      const newTotal = current.total + 1;
      const newPresent = isPresent ? current.present + 1 : current.present;
      const newAbsent = !isPresent ? current.absent + 1 : current.absent;

      const sub = subjects.find((s) => s.id === subjectId);
      const subName = sub ? sub.name : 'Subject';
      logActivity(
        `Marked ${isPresent ? 'Present ✅' : 'Absent ❌'} in ${subName}`,
        'attendance'
      );

      return {
        ...prev,
        [subjectId]: {
          total: newTotal,
          present: newPresent,
          absent: newAbsent
        }
      };
    });
    showToast(
      isPresent ? 'Marked Present' : 'Marked Absent',
      'Attendance updated successfully',
      isPresent ? 'success' : 'info'
    );
  };

  const updateSubjectAttendanceStats = (subjectId, present, total) => {
    const p = Math.max(0, parseInt(present, 10) || 0);
    const t = Math.max(p, parseInt(total, 10) || 0);
    setAttendance((prev) => ({
      ...prev,
      [subjectId]: { total: t, present: p, absent: t - p }
    }));
    showToast('Attendance Updated', 'Record saved');
  };

  // SUBJECT ACTIONS
  const addSubject = (subjectData) => {
    const newId = 'sub-' + Date.now();
    const newSubject = { ...subjectData, id: newId };
    setSubjects((prev) => [...prev, newSubject]);
    
    // initialize attendance
    const initialPresent = parseInt(subjectData.initialPresent, 10) || 0;
    const initialTotal = parseInt(subjectData.initialTotal, 10) || 0;
    setAttendance((prev) => ({
      ...prev,
      [newId]: {
        total: Math.max(initialPresent, initialTotal),
        present: initialPresent,
        absent: Math.max(0, initialTotal - initialPresent)
      }
    }));

    logActivity(`Added new subject: ${subjectData.name}`, 'subject');
    showToast('Subject Added', `${subjectData.name} has been created`);
    return newId;
  };

  const editSubject = (subjectId, subjectData) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === subjectId ? { ...s, ...subjectData } : s))
    );
    showToast('Subject Updated', 'Changes saved successfully');
  };

  const deleteSubject = (subjectId) => {
    const sub = subjects.find((s) => s.id === subjectId);
    setSubjects((prev) => prev.filter((s) => s.id !== subjectId));
    setAttendance((prev) => {
      const copy = { ...prev };
      delete copy[subjectId];
      return copy;
    });
    // also clean up assignments and exams linked to subject
    setAssignments((prev) => prev.filter((a) => a.subjectId !== subjectId));
    setExams((prev) => prev.filter((e) => e.subjectId !== subjectId));
    setStudySessions((prev) => prev.filter((ss) => ss.subjectId !== subjectId));
    logActivity(`Deleted subject: ${sub?.name || 'Subject'}`, 'subject');
    showToast('Subject Deleted', 'Subject and linked records removed', 'info');
  };

  // ASSIGNMENT ACTIONS
  const addAssignment = (data) => {
    const newAssignment = {
      ...data,
      id: 'asg-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAssignments((prev) => [newAssignment, ...prev]);
    logActivity(`Created assignment: ${data.title}`, 'assignment');
    showToast('Assignment Added', data.title);
  };

  const editAssignment = (id, data) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...data } : a))
    );
    showToast('Assignment Updated', 'Changes saved');
  };

  const deleteAssignment = (id) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    showToast('Assignment Deleted', 'Removed from tracker', 'info');
  };

  const toggleAssignmentStatus = (id) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const newStatus = a.status === 'Completed' ? 'In Progress' : 'Completed';
          if (newStatus === 'Completed') {
            triggerCelebration();
            logActivity(`Completed assignment: ${a.title}`, 'assignment');
            showToast('Great Job! 🎯', `Completed "${a.title}"`);
          }
          return { ...a, status: newStatus };
        }
        return a;
      })
    );
  };

  // EXAM ACTIONS
  const addExam = (data) => {
    const newExam = {
      ...data,
      id: 'ex-' + Date.now()
    };
    setExams((prev) => [...prev, newExam]);
    logActivity(`Scheduled exam: ${data.subjectName} (${data.examType})`, 'exam');
    showToast('Exam Scheduled', `${data.subjectName} on ${data.examDate}`);
  };

  const editExam = (id, data) => {
    setExams((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)));
    showToast('Exam Updated', 'Exam details saved');
  };

  const deleteExam = (id) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
    showToast('Exam Removed', 'Exam deleted from schedule', 'info');
  };

  const toggleExamTopic = (examId, topicId) => {
    setExams((prev) =>
      prev.map((ex) => {
        if (ex.id === examId && Array.isArray(ex.syllabus)) {
          const updatedSyllabus = ex.syllabus.map((s) =>
            s.id === topicId ? { ...s, done: !s.done } : s
          );
          return { ...ex, syllabus: updatedSyllabus };
        }
        return ex;
      })
    );
  };

  // STUDY SESSION ACTIONS
  const addStudySession = (data) => {
    const newSession = {
      ...data,
      id: 'ss-' + Date.now(),
      completed: false
    };
    setStudySessions((prev) => [newSession, ...prev]);
    logActivity(`Scheduled study session for ${data.subjectName}`, 'study');
    showToast('Study Session Added', `${data.topic} (${data.durationMinutes}m)`);
  };

  const toggleStudySession = (id) => {
    setStudySessions((prev) =>
      prev.map((ss) => {
        if (ss.id === id) {
          const nextState = !ss.completed;
          if (nextState) {
            triggerCelebration();
            logActivity(`Finished study session: ${ss.topic}`, 'study');
            showToast('Study Session Done! 📚', 'Keep up the momentum!');
          }
          return { ...ss, completed: nextState };
        }
        return ss;
      })
    );
  };

  const deleteStudySession = (id) => {
    setStudySessions((prev) => prev.filter((ss) => ss.id !== id));
    showToast('Study Session Removed', 'Session deleted', 'info');
  };

  // CAREER ROADMAP ACTIONS
  const toggleRoadmapChecklist = (careerKey, stepId, checkId) => {
    setCareerRoadmaps((prev) => {
      const currentRoadmap = prev[careerKey] || CAREER_ROADMAPS[careerKey];
      if (!currentRoadmap) return prev;

      const updatedSteps = currentRoadmap.steps.map((step) => {
        if (step.id === stepId) {
          const updatedChecklist = step.checklist.map((item) => {
            if (item.id === checkId) {
              const nextVal = !item.completed;
              if (nextVal) triggerCelebration();
              return { ...item, completed: nextVal };
            }
            return item;
          });
          return { ...step, checklist: updatedChecklist };
        }
        return step;
      });

      return {
        ...prev,
        [careerKey]: {
          ...currentRoadmap,
          steps: updatedSteps
        }
      };
    });
    logActivity('Updated career roadmap checklist', 'career');
  };

  // PROJECT ACTIONS
  const addProject = (data) => {
    const newProject = {
      ...data,
      id: 'prj-' + Date.now(),
      progressPercentage: data.progressPercentage || 0,
      milestones: data.milestones || []
    };
    setProjects((prev) => [newProject, ...prev]);
    logActivity(`Started new project: ${data.name}`, 'project');
    showToast('Project Added 💻', data.name);
  };

  const editProject = (id, data) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    showToast('Project Updated', 'Project updated successfully');
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Project Deleted', 'Project removed', 'info');
  };

  const toggleProjectMilestone = (projectId, milestoneId) => {
    setProjects((prev) =>
      prev.map((prj) => {
        if (prj.id === projectId) {
          const updatedMilestones = prj.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          );
          const completedCount = updatedMilestones.filter((m) => m.completed).length;
          const progressPercentage = updatedMilestones.length > 0
            ? Math.round((completedCount / updatedMilestones.length) * 100)
            : prj.progressPercentage;

          if (progressPercentage === 100) {
            triggerCelebration();
            showToast('All Milestones Complete! 🏆', `${prj.name} is ready for launch!`);
          }

          return {
            ...prj,
            milestones: updatedMilestones,
            progressPercentage
          };
        }
        return prj;
      })
    );
  };

  // RESOURCE ACTIONS
  const addResource = (data) => {
    const newResource = {
      ...data,
      id: 'res-' + Date.now(),
      isFavorite: false
    };
    setResources((prev) => [newResource, ...prev]);
    logActivity(`Saved resource: ${data.title}`, 'resource');
    showToast('Resource Saved 🔖', data.title);
  };

  const editResource = (id, data) => {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } : r)));
    showToast('Resource Updated', 'Resource details updated');
  };

  const deleteResource = (id) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    showToast('Resource Removed', 'Resource deleted', 'info');
  };

  const toggleFavoriteResource = (id) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  };

  // NOTES ACTIONS
  const addNote = (data) => {
    const newNote = {
      ...data,
      id: 'nt-' + Date.now(),
      updatedAt: new Date().toISOString().split('T')[0],
      isPinned: false
    };
    setNotes((prev) => [newNote, ...prev]);
    logActivity(`Created note: ${data.title}`, 'notes');
    showToast('Note Created 📝', data.title);
  };

  const editNote = (id, data) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              ...data,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : n
      )
    );
    showToast('Note Saved', 'Changes persisted locally');
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    showToast('Note Deleted', 'Note removed', 'info');
  };

  const togglePinNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  // TODAY TASKS ACTIONS
  const addTask = (text, category = 'general') => {
    if (!text.trim()) return;
    const newTask = {
      id: 'tsk-' + Date.now(),
      text: text.trim(),
      completed: false,
      category
    };
    setTodayTasks((prev) => [newTask, ...prev]);
    logActivity(`Added task: ${newTask.text}`, 'task');
  };

  const toggleTask = (id) => {
    setTodayTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            triggerCelebration();
            logActivity(`Completed task: ${t.text}`, 'task');
          }
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  const deleteTask = (id) => {
    setTodayTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // COLLEGE INFO ACTIONS
  const updateCollegeInfo = (data) => {
    setCollegeInfo((prev) => ({ ...prev, ...data }));
    showToast('College Portal Updated', 'Settings saved');
  };

  const addCollegeQuickLink = (link) => {
    setCollegeInfo((prev) => ({
      ...prev,
      quickLinks: [...(prev.quickLinks || []), { ...link, id: 'cl-' + Date.now() }]
    }));
    showToast('Portal Link Added', link.title);
  };

  const deleteCollegeQuickLink = (linkId) => {
    setCollegeInfo((prev) => ({
      ...prev,
      quickLinks: (prev.quickLinks || []).filter((l) => l.id !== linkId)
    }));
    showToast('Link Removed', 'Link deleted', 'info');
  };

  const addCollegeContact = (contact) => {
    setCollegeInfo((prev) => ({
      ...prev,
      contacts: [...(prev.contacts || []), { ...contact, id: 'ct-' + Date.now() }]
    }));
    showToast('Contact Added', contact.name);
  };

  const deleteCollegeContact = (contactId) => {
    setCollegeInfo((prev) => ({
      ...prev,
      contacts: (prev.contacts || []).filter((c) => c.id !== contactId)
    }));
    showToast('Contact Removed', 'Contact deleted', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        // View & Navigation
        theme,
        toggleTheme,
        currentView,
        setCurrentView,
        activeTab,
        setActiveTab,
        isOnboarded,
        setIsOnboarded,
        isSearchOpen,
        setIsSearchOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,

        // Toasts
        toasts,
        showToast,
        removeToast,
        triggerCelebration,

        // Data State
        userProfile,
        setUserProfile,
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
        todayTasks,
        activityLog,

        // Actions
        completeOnboarding,
        loadDemoData,
        resetAllData,
        logActivity,

        // Subject & Attendance Actions
        markAttendance,
        updateSubjectAttendanceStats,
        addSubject,
        editSubject,
        deleteSubject,

        // Assignments Actions
        addAssignment,
        editAssignment,
        deleteAssignment,
        toggleAssignmentStatus,

        // Exams Actions
        addExam,
        editExam,
        deleteExam,
        toggleExamTopic,

        // Study Sessions Actions
        addStudySession,
        toggleStudySession,
        deleteStudySession,

        // Career Actions
        toggleRoadmapChecklist,

        // Project Actions
        addProject,
        editProject,
        deleteProject,
        toggleProjectMilestone,

        // Resource Actions
        addResource,
        editResource,
        deleteResource,
        toggleFavoriteResource,

        // Notes Actions
        addNote,
        editNote,
        deleteNote,
        togglePinNote,

        // Task Actions
        addTask,
        toggleTask,
        deleteTask,

        // College Info Actions
        updateCollegeInfo,
        addCollegeQuickLink,
        deleteCollegeQuickLink,
        addCollegeContact,
        deleteCollegeContact
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

