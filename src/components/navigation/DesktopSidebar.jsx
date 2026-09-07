import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Terminal,
  FlaskConical,
  Trophy,
  Calendar,
  HelpCircle,
  Settings,
  Sun,
  Moon,
  LogOut,
  Sparkles,
  BarChart3
} from "lucide-react";
import { useStudent } from "../../context/StudentContext";
import { useTheme } from "../../context/ThemeContext";

export const DesktopSidebar = () => {
  const {
    student,
    labs,
  } = useStudent();
  const { theme, themeId, setTheme, themes } = useTheme();

  const activeLabsCount = labs.filter((l) => l.status === "active").length;

  const mainLinks = [
    { to: "/student", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/student/dsa-track", label: "DSA Practice", icon: Terminal },
    {
      to: "/student/list",
      label: "Assignments & Labs",
      icon: FlaskConical,
      badge: activeLabsCount > 0 ? activeLabsCount : null
    },
    { to: "/student/leaderboard", label: "Cohort Leaderboard", icon: Trophy },
    { to: "/student/overview", label: "Study Overview", icon: BarChart3 },
    { to: "/student/transcript", label: "Academic Records", icon: Calendar }
  ];

  const otherLinks = [
    { to: "/student/diagnostic", label: "Diagnostic Center", icon: HelpCircle },
    { to: "/student/profile", label: "Account Settings", icon: Settings }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 p-4 shrink-0 h-screen sticky top-0">
      {/* Outer Floating Pill Card (Eduhive Style) */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl border border-[#e6e3da]/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 overflow-y-auto">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-[#f4f2eb]">
          <div className="w-10 h-10 rounded-2xl th-bg flex items-center justify-center text-white shadow-sm shrink-0">
            <Sparkles className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="font-black text-lg tracking-tight text-[#1a1918] leading-none">SkillTracker</h2>
            <p className="text-[11px] font-semibold text-[#9e9a90] mt-1">Student Dashboard</p>
          </div>
        </div>

        {/* Student Quick Profile Card */}
        <div className="my-4 p-3 rounded-2xl bg-[#faf9f5] border border-[#e6e3da]/70 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl th-bg-subtle th-text font-black text-sm flex items-center justify-center shrink-0 border th-border-subtle">
            {student.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-[#1a1918] truncate">{student.name}</div>
            <div className="text-[10px] text-[#78756c] font-mono truncate">{student.id}</div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full th-bg-subtle th-text shrink-0">
            #{student.cohortRank}
          </span>
        </div>

        {/* MAIN MENU */}
        <div className="mt-2 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-black tracking-wider text-[#9e9a90] uppercase">
            Main Menu
          </div>
          {mainLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `
                  flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all group
                  ${isActive
                    ? "th-bg text-white shadow-sm"
                    : "text-[#4f4c46] hover:text-[#1a1918] hover:bg-[#faf9f5]"}
                `}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-white stroke-[2.2]" : "text-[#78756c] group-hover:text-[#1a1918]"
                        }`}
                      />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "th-bg text-white"
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* OTHER MENU */}
        <div className="mt-6 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-black tracking-wider text-[#9e9a90] uppercase">
            Other Menu
          </div>
          {otherLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                  flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all group
                  ${isActive
                    ? "th-bg text-white shadow-sm"
                    : "text-[#4f4c46] hover:text-[#1a1918] hover:bg-[#faf9f5]"}
                `}
              >
                {({ isActive }) => (
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-white stroke-[2.2]" : "text-[#78756c] group-hover:text-[#1a1918]"
                      }`}
                    />
                    <span>{link.label}</span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="flex-1 min-h-6" />

        {/* MODE / PALETTE TOGGLE (Eduhive Mode Toggle inspired) */}
        <div className="pt-4 border-t border-[#f4f2eb] space-y-3">
          <div className="text-[10px] font-black tracking-wider text-[#9e9a90] uppercase px-1">
            Palette Accent
          </div>
          <div className="flex items-center justify-between p-1 bg-[#f4f2eb] rounded-2xl">
            {themes.slice(0, 4).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                title={t.name}
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                  themeId === t.id ? "bg-white shadow-xs scale-105" : "hover:bg-white/50"
                }`}
              >
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.accent }} />
              </button>
            ))}
          </div>

          {/* Logout button */}
          <button
            type="button"
            onClick={() => {
              if (confirm("End your current student session?")) {
                alert("Session ended.");
              }
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#78756c] hover:text-[#ba3c3c] hover:bg-[#f4f2eb]/60 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </aside>
  );
};