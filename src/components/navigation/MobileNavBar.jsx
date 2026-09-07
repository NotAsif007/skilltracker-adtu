import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Terminal, Plus, FlaskConical, User } from "lucide-react";
import { useStudent } from "../../context/StudentContext";

export const MobileNavBar = () => {
  const { labs, student } = useStudent();
  const location = useLocation();
  const navigate = useNavigate();
  const activeLabsCount = labs.filter((l) => l.status === "active").length;

  const triggerHaptic = () => {
    if ("vibrate" in navigator) {
      try { navigator.vibrate(10); } catch (e) {}
    }
  };

  const handleQuickAction = () => {
    triggerHaptic();
    // Quick action: navigate to priority continuous lab or DSA track
    navigate("/student/dsa-track");
  };

  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto pointer-events-none">
      <nav
        aria-label="Mobile Floating Navigation"
        className="pointer-events-auto studyzen-nav-bar rounded-[32px] px-3 py-2 shadow-2xl relative"
      >
        <div className="flex items-center justify-between relative">
          
          {/* 1. Home */}
          <NavLink
            to="/student"
            end
            onClick={triggerHaptic}
            className="relative flex-1 py-1 flex flex-col items-center justify-center select-none"
          >
            {({ isActive }) => (
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 flex items-center justify-center">
                  <Home className={`w-5 h-5 transition-all ${isActive ? "th-text scale-110 stroke-[2.5]" : "text-[#78756c] stroke-[1.8]"}`} />
                </div>
                <span className={`text-[10px] tracking-tight mt-0.5 font-bold ${isActive ? "th-text" : "text-[#78756c]"}`}>
                  Home
                </span>
              </div>
            )}
          </NavLink>

          {/* 2. Practice (DSA) */}
          <NavLink
            to="/student/dsa-track"
            onClick={triggerHaptic}
            className="relative flex-1 py-1 flex flex-col items-center justify-center select-none"
          >
            {({ isActive }) => (
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 flex items-center justify-center">
                  <Terminal className={`w-5 h-5 transition-all ${isActive ? "th-text scale-110 stroke-[2.5]" : "text-[#78756c] stroke-[1.8]"}`} />
                </div>
                <span className={`text-[10px] tracking-tight mt-0.5 font-bold ${isActive ? "th-text" : "text-[#78756c]"}`}>
                  Practice
                </span>
              </div>
            )}
          </NavLink>

          {/* 3. Center Elevated Action Button (StudyZen style "+") */}
          <div className="relative flex-1 flex justify-center -mt-6">
            <motion.button
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              onClick={handleQuickAction}
              aria-label="Quick Practice"
              title="Quick Practice / Focus Session"
              className="w-13 h-13 rounded-full th-bg text-white flex items-center justify-center shadow-[0_8px_20px_-2px_rgba(217,119,87,0.45)] border-4 border-white ring-2 th-ring/20 focus:outline-none"
            >
              <Plus className="w-6 h-6 stroke-[3]" />
            </motion.button>
          </div>

          {/* 4. Labs */}
          <NavLink
            to="/student/list"
            onClick={triggerHaptic}
            className="relative flex-1 py-1 flex flex-col items-center justify-center select-none"
          >
            {({ isActive }) => (
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 flex items-center justify-center relative">
                  <FlaskConical className={`w-5 h-5 transition-all ${isActive ? "th-text scale-110 stroke-[2.5]" : "text-[#78756c] stroke-[1.8]"}`} />
                  {activeLabsCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 min-w-[15px] h-[15px] px-1 th-bg text-white text-[9px] font-black rounded-full flex items-center justify-center">
                      {activeLabsCount}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] tracking-tight mt-0.5 font-bold ${isActive ? "th-text" : "text-[#78756c]"}`}>
                  Labs
                </span>
              </div>
            )}
          </NavLink>

          {/* 5. Profile */}
          <NavLink
            to="/student/profile"
            onClick={triggerHaptic}
            className="relative flex-1 py-1 flex flex-col items-center justify-center select-none"
          >
            {({ isActive }) => (
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 flex items-center justify-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                    isActive ? "th-bg text-white ring-2 th-ring ring-offset-1 ring-offset-white" : "bg-[#f4f2eb] text-[#504e48] border border-[#e6e3da]"
                  }`}>
                    {student.name.charAt(0)}
                  </div>
                </div>
                <span className={`text-[10px] tracking-tight mt-0.5 font-bold ${isActive ? "th-text" : "text-[#78756c]"}`}>
                  Profile
                </span>
              </div>
            )}
          </NavLink>

        </div>
      </nav>
    </div>
  );
};