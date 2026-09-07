import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TopProgressBar } from '../navigation/TopProgressBar';
import { MobileNavBar } from '../navigation/MobileNavBar';
import { MobileHeader } from '../navigation/MobileHeader';
import { DesktopSidebar } from '../navigation/DesktopSidebar';
import { NotificationDrawer } from '../notifications/NotificationDrawer';
import { FloatingNotificationToast } from '../notifications/FloatingNotificationToast';
import { DataCorrectionModal } from '../profile/DataCorrectionModal';
import { useStudent } from '../../context/StudentContext';
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation';
import { CheckCircle2 } from 'lucide-react';

// Clean, simple, non-choppy page transition — instant silky fade without vertical jumping
const pageVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.14,
      ease: 'easeOut',
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.08,
      ease: 'easeIn',
    }
  }
};

export const AppLayout = () => {
  const { offlineSyncMessage } = useStudent();
  const location = useLocation();
  useSwipeNavigation();

  return (
    <div className="min-h-screen eduhive-outer-canvas text-[#1a1918] flex flex-col lg:flex-row antialiased">
      {/* Top Navigation Progress Bar */}
      <TopProgressBar />

      {/* Offline Sync Banner */}
      {offlineSyncMessage && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#3e7b54] text-white text-sm py-2.5 px-4 flex items-center justify-center gap-2 shadow-lg animate-fade-in font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>{offlineSyncMessage}</span>
        </div>
      )}

      {/* Desktop Command Sidebar (>= 1024px) */}
      <DesktopSidebar />

      {/* Main Content Canvas (Eduhive Floating Studio Canvas on Desktop) */}
      <div className="flex-1 flex flex-col min-w-0 lg:p-4 lg:pl-0">
        {/* Mobile Header (< 1024px) */}
        <MobileHeader />

        {/* Dynamic Route Canvas inside Rounded Inner Container */}
        <div className="flex-1 flex flex-col min-w-0 lg:bg-[#faf9f5]/90 lg:rounded-3xl lg:border lg:border-[#e6e3da]/80 lg:shadow-[0_8px_30px_rgb(0,0,0,0.03)] lg:overflow-hidden">
          <main className="flex-1 pb-28 lg:pb-12 px-3 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto pt-20 lg:pt-6 overflow-x-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        </div>

        {/* Floating Apple Liquid Glass Navigation (< 1024px) */}
        <MobileNavBar />
      </div>

      {/* Global Modals, Floating Island Notifications, & Drawers */}
      <FloatingNotificationToast />
      <NotificationDrawer />
      <DataCorrectionModal />
    </div>
  );
};
