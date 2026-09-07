import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Terminal,
  Plus,
  FlaskConical,
  User,
  X,
  Sparkles,
  Play,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const MobileNavBar = () => {
  const { labs, student } = useStudent();
  const location = useLocation();
  const navigate = useNavigate();
  const activeLabsCount = labs.filter((l) => l.status === 'active').length;

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [sprintRunning, setSprintRunning] = useState(false);
  const [sprintSeconds, setSprintSeconds] = useState(1500); // 25 min

  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(10); } catch (e) {}
    }
  };

  const handleCenterButtonClick = () => {
    triggerHaptic();
    setIsActionSheetOpen(true);
  };

  return (
    <>
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
                    <Home className={`w-5 h-5 transition-all ${isActive ? 'th-text scale-110 stroke-[2.5]' : 'text-[#78756c] stroke-[1.8]'}`} />
                  </div>
                  <span className={`text-[10px] tracking-tight mt-0.5 font-bold ${isActive ? 'th-text' : 'text-[#78756c]'}`}>
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
                    <Terminal className={`w-5 h-5 transition-all ${isActive ? 'th-text scale-110 stroke-[2.5]' : 'text-[#78756c] stroke-[1.8]'}`} />
                  </div>
                  <span className={`text-[10px] tracking-tight mt-0.5 font-bold ${isActive ? 'th-text' : 'text-[#78756c]'}`}>
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
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                onClick={handleCenterButtonClick}
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
                    <FlaskConical className={`w-5 h-5 transition-all ${isActive ? 'th-text scale-110 stroke-[2.5]' : 'text-[#78756c] stroke-[1.8]'}`} />
                    {activeLabsCount > 0 && (
                      <span className="absolute -top-1 -right-1.5 min-w-[15px] h-[15px] px-1 th-bg text-white text-[9px] font-black rounded-full flex items-center justify-center">
                        {activeLabsCount}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] tracking-tight mt-0.5 font-bold ${isActive ? 'th-text' : 'text-[#78756c]'}`}>
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
                      isActive ? 'th-bg text-white ring-2 th-ring ring-offset-1 ring-offset-white' : 'bg-[#f4f2eb] text-[#504e48] border border-[#e6e3da]'
                    }`}>
                      {student.name.charAt(0)}
                    </div>
                  </div>
                  <span className={`text-[10px] tracking-tight mt-0.5 font-bold ${isActive ? 'th-text' : 'text-[#78756c]'}`}>
                    Profile
                  </span>
                </div>
              )}
            </NavLink>

          </div>
        </nav>
      </div>

      {/* Interactive Quick Action Bottom Sheet (Triggered by +) */}
      <AnimatePresence>
        {isActionSheetOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center p-3">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              className="w-full max-w-md bg-white rounded-3xl p-5 border border-[#e6e3da] shadow-2xl space-y-4 mb-2"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#f4f2eb]">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl th-bg text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-[#1a1918]">Quick Action Launcher</h3>
                    <p className="text-[10px] text-[#78756c]">ADTU Student Workspace</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActionSheetOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#f4f2eb] flex items-center justify-center text-[#78756c] hover:text-[#1a1918]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action 1: Solve Next DSA Problem */}
              <button
                type="button"
                onClick={() => {
                  setIsActionSheetOpen(false);
                  navigate('/student/dsa-track');
                }}
                className="w-full p-3.5 rounded-2xl bg-[#faf9f5] hover:bg-[#f4f2eb] border border-[#e6e3da] flex items-center justify-between text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl th-bg-subtle th-text flex items-center justify-center font-bold">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1a1918]">Solve Next Algorithm</div>
                    <div className="text-[10px] text-[#78756c]">LeetCode 300 Track (#3 Longest Substring)</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 th-text group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Action 2: Submit Priority Lab 05 */}
              <button
                type="button"
                onClick={() => {
                  setIsActionSheetOpen(false);
                  navigate('/student/list');
                }}
                className="w-full p-3.5 rounded-2xl bg-[#faf9f5] hover:bg-[#f4f2eb] border border-[#e6e3da] flex items-center justify-between text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#b87728]/15 text-[#b87728] flex items-center justify-center font-bold">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1a1918]">Submit Continuous Lab 05</div>
                    <div className="text-[10px] text-[#b87728] font-bold">Due in 4 hours &bull; CS502 Virtual Memory</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#b87728] group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Action 3: 25-Min Focus Sprint */}
              <button
                type="button"
                onClick={() => {
                  setIsActionSheetOpen(false);
                  navigate('/student/overview');
                }}
                className="w-full p-3.5 rounded-2xl bg-[#faf9f5] hover:bg-[#f4f2eb] border border-[#e6e3da] flex items-center justify-between text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#3e7b54]/15 text-[#3e7b54] flex items-center justify-center font-bold">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1a1918]">Study Analytics &amp; Overview</div>
                    <div className="text-[10px] text-[#78756c]">12h 45m logged this week &bull; View breakdown</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#3e7b54] group-hover:translate-x-0.5 transition-transform" />
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};