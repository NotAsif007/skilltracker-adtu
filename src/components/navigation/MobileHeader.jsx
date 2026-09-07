import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, WifiOff } from "lucide-react";
import { useStudent } from "../../context/StudentContext";

export const MobileHeader = () => {
  const { student, unreadNotificationsCount, setIsNotificationDrawerOpen, isOnline } = useStudent();

  return (
    <div className="lg:hidden fixed top-3 left-3 right-3 z-40 max-w-md mx-auto pointer-events-none">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 34, delay: 0.05 }}
        className="pointer-events-auto apple-liquid-glass rounded-3xl px-4 py-2.5 shadow-xl border border-white/80"
      >
        <div className="flex items-center justify-between">
          {/* Left: Avatar & Greeting (StudyZen style) */}
          <Link to="/student/profile" className="flex items-center gap-2.5 group select-none min-w-0">
            <div className="w-9 h-9 rounded-full th-bg text-white font-black text-xs flex items-center justify-center shrink-0 ring-2 ring-white shadow-xs">
              {student.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-[#78756c] leading-tight flex items-center gap-1">
                <span>Welcome back!</span>
                {!isOnline && (
                  <span className="text-[9px] font-bold text-[#b87728] bg-[#b87728]/10 px-1.5 py-0.2 rounded-full">
                    Offline
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-sm text-[#1a1918] tracking-tight truncate leading-tight mt-0.5">
                {student.name}
              </h3>
            </div>
          </Link>

          {/* Right: Sem Tag & Notification Bell */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#f4f2eb] text-[#78756c] border border-[#e6e3da]">
              Sem 5A
            </span>

            <motion.button
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              type="button"
              onClick={() => setIsNotificationDrawerOpen(true)}
              aria-label="Open notifications"
              className="relative p-2 rounded-full bg-white/80 border border-[#e6e3da]/80 text-[#4f4c46] hover:text-[#1a1918] transition-colors shadow-xs"
            >
              <Bell className="w-4 h-4 stroke-[2.2]" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full th-bg ring-2 ring-white animate-pulse" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>
    </div>
  );
};