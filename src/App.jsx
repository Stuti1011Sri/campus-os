import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { ToastContainer } from './components/common/Toast';
import { NotificationPanel } from './components/features/notifications/NotificationPanel';
import { OnboardingModal } from './components/features/onboarding/OnboardingModal';

// Pages
import { LandingPage } from './components/features/landing/LandingPage';
import { DashboardPage } from './components/features/dashboard/DashboardPage';
import { SubjectsPage } from './components/features/subjects/SubjectsPage';
import { AttendancePage } from './components/features/attendance/AttendancePage';
import { AssignmentsPage } from './components/features/assignments/AssignmentsPage';
import { ExamsPage } from './components/features/exams/ExamsPage';
import { StudyPlannerPage } from './components/features/study/StudyPlannerPage';
import { CareerRoadmapPage } from './components/features/career/CareerRoadmapPage';
import { ProjectsPage } from './components/features/projects/ProjectsPage';
import { ResourceLibraryPage } from './components/features/resources/ResourceLibraryPage';
import { NotesPage } from './components/features/notes/NotesPage';
import { CollegeInfoPage } from './components/features/college/CollegeInfoPage';
import { SettingsPage } from './components/features/settings/SettingsPage';

export const App = () => {
  const {
    currentView,
    activeTab,
    isOnboardingOpen,
    setIsOnboardingOpen,
    isOnboarded
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If user is currently on landing page
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19]">
        <LandingPage />
        <ToastContainer />
        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
        />
      </div>
    );
  }

  // Render active workspace page
  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'subjects':
        return <SubjectsPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'exams':
        return <ExamsPage />;
      case 'study':
        return <StudyPlannerPage />;
      case 'career':
        return <CareerRoadmapPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'resources':
        return <ResourceLibraryPage />;
      case 'notes':
        return <NotesPage />;
      case 'college':
        return <CollegeInfoPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Slide-out Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative w-64 max-w-[80vw] h-full bg-white dark:bg-[#0E1424] shadow-2xl z-10 animate-slide-up flex flex-col">
              <Sidebar
                isMobile={true}
                onCloseMobile={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full pb-20 lg:pb-12">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Bottom Dock Navigation */}
      <MobileNav onOpenMenu={() => setIsMobileMenuOpen(true)} />

      {/* Global Modals & Notifications */}
      <GlobalSearchModal />
      <NotificationPanel />
      <ToastContainer />
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </div>
  );
};

