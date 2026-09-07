import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Terminal,
  ChevronRight,
  Play,
  Calendar,
  Flame,
  Search,
  Bell,
  MoreVertical,
  Bot,
  Layers,
  Code2,
  Check,
  Compass,
  X,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export const DashboardView = () => {
  const {
    student,
    labs,
    dsaProblems,
    leaderboard,
    unreadNotificationsCount,
    setIsNotificationDrawerOpen
  } = useStudent();

  const navigate = useNavigate();

  // Interactive UI States
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 11, seconds: 45 });
  const [selectedStatDay, setSelectedStatDay] = useState('Wed');
  const [progressPeriod, setProgressPeriod] = useState('Month'); // 'Month' | 'Week'
  const [statsPeriod, setStatsPeriod] = useState('Weekly'); // 'Weekly' | 'Monthly'
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [completedPlans, setCompletedPlans] = useState({ 1: false, 2: true, 3: false });

  // Live countdown timer for priority deadline
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeLab = labs.find((l) => l.status === 'active') || labs[0];
  const unsolvedDsa = dsaProblems.find((p) => !p.solved);
  const topCohort = leaderboard.slice(0, 4);

  // Dynamic Weekly vs Monthly study data
  const weeklyStats = statsPeriod === 'Weekly' ? [
    { day: 'Sun', activeHours: 4.5, goalHours: 6.0, percent: 75 },
    { day: 'Mon', activeHours: 7.0, goalHours: 8.0, percent: 88 },
    { day: 'Tue', activeHours: 5.2, goalHours: 7.5, percent: 69 },
    { day: 'Wed', activeHours: 7.2, goalHours: 8.0, percent: 90 },
    { day: 'Thu', activeHours: 6.0, goalHours: 7.5, percent: 80 },
    { day: 'Fri', activeHours: 3.5, goalHours: 6.0, percent: 58 },
    { day: 'Sat', activeHours: 5.8, goalHours: 7.0, percent: 82 }
  ] : [
    { day: 'W1', activeHours: 24, goalHours: 30, percent: 80 },
    { day: 'W2', activeHours: 28, goalHours: 30, percent: 93 },
    { day: 'W3', activeHours: 22, goalHours: 30, percent: 73 },
    { day: 'W4', activeHours: 31, goalHours: 30, percent: 100 },
    { day: 'W5', activeHours: 19, goalHours: 30, percent: 63 },
    { day: 'W6', activeHours: 27, goalHours: 30, percent: 90 },
    { day: 'W7', activeHours: 25, goalHours: 30, percent: 83 }
  ];

  const currentDayStat = weeklyStats.find((s) => s.day === selectedStatDay) || weeklyStats[3];

  // Dynamic search results across labs and DSA
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...labs.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.courseCode.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(l => ({ title: l.title, subtitle: `${l.courseCode} • Continuous Lab`, link: '/student/list', type: 'Lab' })),
    ...dsaProblems.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5)
      .map(p => ({ title: p.title, subtitle: `${p.category} • ${p.difficulty}`, link: '/student/dsa-track', type: 'DSA' }))
  ];

  const togglePlanItem = (id) => {
    setCompletedPlans(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if ('vibrate' in navigator) navigator.vibrate?.(10);
      return next;
    });
  };

  return (
    <div className="space-y-6 sm:space-y-7">

      {/* ========================================================================= */}
      {/* 1. DESKTOP VIEW: FULL EDUHIVE-INSPIRED DASHBOARD (>= 1024px)              */}
      {/* ========================================================================= */}
      <div className="hidden lg:block space-y-6">

        {/* ── Eduhive Top Bar: Welcome Back + Quick Search + Profile Status ── */}
        <div className="card-pop p-6 rounded-3xl bg-white border border-[#e6e3da]/80 eduhive-card-shadow relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-[#1a1918]">
                  Welcome Back 👋
                </h1>
              </div>
              <p className="text-xs text-[#78756c] font-medium mt-1">
                Semester 5 &bull; Section A &bull; Let's master something new today!
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Working Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#9e9a90] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search subjects, labs..."
                  className="pl-9 pr-8 py-2 rounded-2xl bg-[#faf9f5] border border-[#e6e3da] text-xs font-medium text-[#1a1918] placeholder-[#9e9a90] focus:outline-none focus:th-border w-64 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9e9a90] hover:text-[#1a1918]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsNotificationDrawerOpen(true)}
                className="relative p-2.5 rounded-2xl bg-[#faf9f5] border border-[#e6e3da] text-[#4f4c46] hover:text-[#1a1918] hover:bg-[#edeae2] transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4 stroke-[2.2]" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full th-bg ring-2 ring-white" />
                )}
              </button>

              <Link
                to="/student/profile"
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl bg-[#faf9f5] border border-[#e6e3da] hover:border-[#c7c3b6] transition-colors"
              >
                <div className="w-8 h-8 rounded-xl th-bg text-white font-black text-xs flex items-center justify-center">
                  {student.name.charAt(0)}
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-[#1a1918] block leading-tight">{student.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-[#78756c] font-mono">#{student.cohortRank} in Class</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Live Search Results Dropdown */}
          {searchQuery && (
            <div className="absolute left-6 right-6 top-full mt-2 bg-white rounded-2xl border border-[#e6e3da] shadow-xl p-3 z-30 divide-y divide-[#f4f2eb]">
              <div className="text-[11px] font-bold text-[#78756c] pb-2 px-2 flex justify-between">
                <span>Matching results for "{searchQuery}"</span>
                <span>{searchResults.length} found</span>
              </div>
              {searchResults.length === 0 ? (
                <div className="py-4 text-center text-xs text-[#78756c]">No labs or algorithms match your query.</div>
              ) : (
                searchResults.map((r, i) => (
                  <Link
                    key={i}
                    to={r.link}
                    onClick={() => setSearchQuery('')}
                    className="py-2.5 px-3 flex items-center justify-between hover:bg-[#faf9f5] rounded-xl transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#1a1918]">{r.title}</div>
                      <div className="text-[10px] text-[#78756c]">{r.subtitle}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md th-bg-subtle th-text">
                      {r.type} &rarr;
                    </span>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        {/* ── Eduhive Grid Row 1: Featured Course + Progress + Activity + Community ── */}
        <div className="grid grid-cols-12 gap-5">

          {/* Card A: Featured Skill / Continuous Lab Focus (Span 5) */}
          <div className="col-span-5 card-pop p-6 rounded-3xl bg-white border border-[#e6e3da]/80 eduhive-card-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full th-bg-subtle th-text border th-border-subtle uppercase tracking-wider">
                  Active Priority Track
                </span>
                <span className="text-xs font-mono font-bold text-[#78756c]">CS502 &bull; Lab 05</span>
              </div>
              <h2 className="text-lg font-black text-[#1a1918] tracking-tight leading-snug">
                Data Structures &amp; Virtual Memory
              </h2>
              
              {/* Meta tags with icons */}
              <div className="flex items-center gap-4 mt-3 text-xs font-semibold text-[#78756c]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 th-text" /> 1 hr 40 mnts
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#ffb23f]" /> 8 chapters
                </span>
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#f43f5e]" /> 142 solved
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f4f2eb]">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-[#78756c]">Module completion</span>
                <span className="th-text font-mono">60%</span>
              </div>
              <div className="w-full bg-[#f4f2eb] h-2.5 rounded-full overflow-hidden border border-[#e6e3da]">
                <div className="th-bg h-full rounded-full transition-all duration-700" style={{ width: '60%' }} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  to="/student/dsa-track"
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl th-bg text-white text-xs font-bold shadow-xs hover:opacity-95 transition-opacity"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Continue practice</span>
                </Link>
                <span className="text-[11px] font-medium text-[#9e9a90]">Daily target: 2/3 done</span>
              </div>
            </div>
          </div>

          {/* Card B: Progress Summary Card (Span 2) with WORKING Month/Week switcher */}
          <div className="col-span-2 card-pop p-5 rounded-3xl bg-white border border-[#e6e3da]/80 eduhive-card-shadow flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#1a1918]">Progress</span>
              <button
                type="button"
                onClick={() => setProgressPeriod(p => p === 'Month' ? 'Week' : 'Month')}
                className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#faf9f5] border border-[#e6e3da] text-[#1a1918] hover:th-border transition-colors cursor-pointer"
                title="Click to toggle Week / Month view"
              >
                {progressPeriod} &or;
              </button>
            </div>

            <div className="space-y-3.5 my-3">
              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] mt-1 shrink-0" />
                <div>
                  <div className="text-xs font-black text-[#1a1918]">
                    {progressPeriod === 'Month' ? '40 hours' : '12 hours'}
                  </div>
                  <div className="text-[10px] text-[#78756c]">Time invested</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb23f] mt-1 shrink-0" />
                <div>
                  <div className="text-xs font-black text-[#1a1918]">
                    {progressPeriod === 'Month' ? '18 labs' : '4 labs'}
                  </div>
                  <div className="text-[10px] text-[#78756c]">
                    {progressPeriod === 'Month' ? 'Completed (90%)' : 'Completed (Week)'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full th-bg mt-1 shrink-0" />
                <div>
                  <div className="text-xs font-black text-[#1a1918]">02 active</div>
                  <div className="text-[10px] text-[#78756c]">Continuous tasks</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#f4f2eb] text-[10px] font-bold text-[#3e7b54] flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14% vs last {progressPeriod.toLowerCase()}.
            </div>
          </div>

          {/* Card C: Your Activity (Streak & 2-row dots) (Span 2) */}
          <div className="col-span-2 card-pop p-5 rounded-3xl bg-white border border-[#e6e3da]/80 eduhive-card-shadow flex flex-col justify-between">
            <span className="text-xs font-black text-[#1a1918]">Your Activity</span>

            <div>
              <div className="text-2xl font-black text-[#1a1918] font-mono leading-none">
                17 <span className="text-xs font-bold text-[#78756c] font-sans">Days</span>
              </div>
              <p className="text-[11px] font-semibold text-[#78756c] mt-1">65 hours 20 minutes</p>
            </div>

            {/* 2-row Dot Matrix (Eduhive style) */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center gap-1.5 justify-between">
                {[...Array(7)].map((_, i) => (
                  <span key={`d1-${i}`} className="w-2.5 h-2.5 rounded-full bg-[#ffb23f] shadow-2xs" title={`Day ${i+1} active`} />
                ))}
              </div>
              <div className="flex items-center gap-1.5 justify-between">
                {[...Array(7)].map((_, i) => (
                  <span key={`d2-${i}`} className={`w-2.5 h-2.5 rounded-full ${i < 3 ? 'th-bg' : 'bg-[#e6e3da]'}`} title={`Day ${i+8}`} />
                ))}
              </div>
            </div>

            <span className="text-[10px] font-bold th-text block pt-1">Active streak alive 🔥</span>
          </div>

          {/* Card D: Keep Excelling / Cohort Community Banner (Span 3) */}
          <div className="col-span-3 card-pop p-5 rounded-3xl bg-[#1a1918] text-white flex flex-col justify-between relative overflow-hidden shadow-md">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full th-bg/30 blur-2xl pointer-events-none" />

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#ffb23f] block mb-1">
                ADTU CSE 2024-28
              </span>
              <h3 className="text-base font-black tracking-tight leading-snug text-white">
                Keep Learning New Things Everyday
              </h3>
              <p className="text-[11px] text-[#c7c3b6] mt-2 leading-relaxed">
                You are currently ranked <strong>#2 of 59</strong> in continuous lab assessments and DSA progress.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <Link
                to="/student/leaderboard"
                className="px-3.5 py-1.5 rounded-xl bg-white text-[#1a1918] text-xs font-black hover:bg-[#faf9f5] transition-colors"
              >
                Cohort Standing &rarr;
              </Link>
              <span className="text-xs font-mono font-bold th-text">2840 pts</span>
            </div>
          </div>

        </div>

        {/* ── Eduhive Grid Row 2: Study Statistics (Striped Bars) + Multi-Ring Tracker + Faculty/Mentors ── */}
        <div className="grid grid-cols-12 gap-5">

          {/* Card A: Study Statistics (Striped Bar Chart) with WORKING Tooltip & Toggle (Span 5) */}
          <div className="col-span-5 card-pop p-6 rounded-3xl bg-white border border-[#e6e3da]/80 eduhive-card-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-black text-[#1a1918]">Study Statistics</h3>
                <p className="text-[11px] text-[#78756c]">Daily continuous practice vs goals</p>
              </div>
              <button
                type="button"
                onClick={() => setStatsPeriod(p => p === 'Weekly' ? 'Monthly' : 'Weekly')}
                className="text-xs font-bold px-2.5 py-1 rounded-xl bg-[#faf9f5] border border-[#e6e3da] text-[#1a1918] hover:th-border transition-colors cursor-pointer"
                title="Toggle Weekly / Monthly"
              >
                {statsPeriod} &or;
              </button>
            </div>

            {/* Hatched Bar Chart */}
            <div className="h-44 pt-8 flex items-end justify-between gap-3 px-2 border-b border-[#f4f2eb] relative">
              {/* Dynamic Tooltip on selected day */}
              <div
                className="absolute top-1 bg-[#1a1918] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1.5 z-10 transition-all duration-200 pointer-events-none"
                style={{
                  left: `${(weeklyStats.findIndex(s => s.day === selectedStatDay) / (weeklyStats.length - 1)) * 75 + 10}%`
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full th-bg" />
                <span>{selectedStatDay}: {currentDayStat.activeHours}h</span>
                <span className="text-[#9e9a90]">&bull; Goal: {currentDayStat.goalHours}h</span>
              </div>

              {weeklyStats.map((item) => {
                const isSelected = item.day === selectedStatDay;
                return (
                  <button
                    key={item.day}
                    type="button"
                    onClick={() => setSelectedStatDay(item.day)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer focus:outline-none"
                  >
                    {/* Bar Container */}
                    <div className={`w-full max-w-[28px] h-full bg-[#f4f2eb] rounded-lg overflow-hidden flex flex-col justify-end relative border transition-colors ${
                      isSelected ? 'border-[#1a1918]' : 'border-[#e6e3da]/60'
                    }`}>
                      {/* Active Fill with Stripes */}
                      <div
                        className={`w-full rounded-b-lg transition-all duration-500 ${
                          isSelected
                            ? 'bg-stripes-accent shadow-xs'
                            : 'bg-stripes-goal group-hover:opacity-90'
                        }`}
                        style={{ height: `${item.percent}%` }}
                      />
                    </div>
                    <span className={`text-[11px] font-bold mt-2 transition-colors ${
                      isSelected ? 'th-text font-black scale-110' : 'text-[#78756c]'
                    }`}>
                      {item.day}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 mt-3 text-xs font-semibold text-[#78756c]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full th-bg" /> Active Hours
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e6e3da]" /> Target Goal
              </span>
            </div>
          </div>

          {/* Card B: Learn Tracking (Concentric Radial Rings) (Span 3) */}
          <div className="col-span-3 card-pop p-6 rounded-3xl bg-white border border-[#e6e3da]/80 eduhive-card-shadow flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#1a1918]">Learn Tracking</h3>
              <MoreVertical className="w-4 h-4 text-[#9e9a90]" />
            </div>

            {/* Multi-Ring SVG Visual */}
            <div className="relative flex items-center justify-center my-2">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                {/* Outer Ring: Month (Coral) */}
                <circle cx="60" cy="60" r="48" fill="none" stroke="#f4f2eb" strokeWidth="6" />
                <circle
                  cx="60" cy="60" r="48" fill="none"
                  stroke="var(--accent)" strokeWidth="6"
                  strokeDasharray="301.59" strokeDashoffset="75"
                  strokeLinecap="round"
                />

                {/* Middle Ring: Week (Yellow) */}
                <circle cx="60" cy="60" r="38" fill="none" stroke="#f4f2eb" strokeWidth="6" />
                <circle
                  cx="60" cy="60" r="38" fill="none"
                  stroke="#ffb23f" strokeWidth="6"
                  strokeDasharray="238.76" strokeDashoffset="45"
                  strokeLinecap="round"
                />

                {/* Inner Ring: Day (Rose) */}
                <circle cx="60" cy="60" r="28" fill="none" stroke="#f4f2eb" strokeWidth="6" />
                <circle
                  cx="60" cy="60" r="28" fill="none"
                  stroke="#f43f5e" strokeWidth="6"
                  strokeDasharray="175.93" strokeDashoffset="35"
                  strokeLinecap="round"
                />
              </svg>

              {/* Center Readout Card */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-base font-black text-[#1a1918] font-mono leading-none">16%</span>
                <span className="text-[9px] font-bold text-[#78756c] tracking-tight mt-0.5">Goal Dist.</span>
              </div>
            </div>

            {/* Legend with Dots */}
            <div className="flex items-center justify-around text-[10px] font-bold pt-2 border-t border-[#f4f2eb]">
              <span className="flex items-center gap-1 text-[#1a1918]">
                <span className="w-2 h-2 rounded-full th-bg" /> Month
              </span>
              <span className="flex items-center gap-1 text-[#1a1918]">
                <span className="w-2 h-2 rounded-full bg-[#ffb23f]" /> Week
              </span>
              <span className="flex items-center gap-1 text-[#1a1918]">
                <span className="w-2 h-2 rounded-full bg-[#f43f5e]" /> Day
              </span>
            </div>
          </div>

          {/* Card C: Top Mentors & Cohort Leaders (Span 4) */}
          <div className="col-span-4 card-pop p-6 rounded-3xl bg-white border border-[#e6e3da]/80 eduhive-card-shadow flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-black text-[#1a1918]">Faculty &amp; Leaders</h3>
              <Link to="/student/leaderboard" className="text-xs font-bold th-text hover:underline">
                View all
              </Link>
            </div>

            <div className="divide-y divide-[#f4f2eb]">
              {/* Advisor */}
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#3e7b54]/15 text-[#3e7b54] flex items-center justify-center font-bold text-xs shrink-0">
                    RS
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#1a1918] truncate">Dr. R. K. Sarma</div>
                    <div className="text-[10px] text-[#78756c] truncate">Faculty Advisor &bull; Assoc. Prof</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3e7b54]/10 text-[#3e7b54] shrink-0">
                  Faculty
                </span>
              </div>

              {/* Student #1 */}
              {topCohort[0] && (
                <div className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#c4ad8f] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {topCohort[0].name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#1a1918] truncate">{topCohort[0].name}</div>
                      <div className="text-[10px] text-[#78756c] truncate">Rank #1 &bull; 148 DSA</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-[#1a1918]">{topCohort[0].score} pts</span>
                </div>
              )}

              {/* Student #2 (You) */}
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full th-bg text-white flex items-center justify-center font-bold text-xs shrink-0 ring-2 th-ring">
                    {student.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-[#1a1918] truncate flex items-center gap-1.5">
                      <span>{student.name}</span>
                      <span className="text-[9px] th-bg text-white px-1.5 py-0.2 rounded font-black">YOU</span>
                    </div>
                    <div className="text-[10px] text-[#78756c] truncate">Rank #2 &bull; 142 DSA &bull; 18 Labs</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-black th-text">{student.score || 2840} pts</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-center text-[#9e9a90] font-medium">
              Evaluated based on automated lab tests and LeetCode tracks
            </div>
          </div>

        </div>

        {/* ── Eduhive Grid Row 3: Speedometer Gauge + Urgent Deadline Radar ── */}
        <div className="grid grid-cols-12 gap-5">

          {/* Semicircular Speedometer Gauge (Span 4) */}
          <div className="col-span-4 card-pop p-6 rounded-3xl bg-white border border-[#e6e3da]/80 eduhive-card-shadow flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black text-[#78756c] uppercase tracking-wider block">
                Learning Progress
              </span>
              <div className="text-xs font-bold text-[#3e7b54] flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> 11.2% &uarr;
              </div>
              <p className="text-[11px] text-[#78756c] mt-1">Compared to last month</p>
              <div className="mt-3 text-xs font-bold text-[#1a1918]">
                CGPA: <span className="text-base font-black th-text">{student.cgpa}</span> / 10.0
              </div>
            </div>

            {/* Radial Speedometer graphic */}
            <div className="relative flex flex-col items-center justify-center">
              <svg className="w-28 h-18 overflow-visible" viewBox="0 0 100 55">
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#f4f2eb"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="8"
                  strokeDasharray="125.6"
                  strokeDashoffset="32"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute top-7 text-center">
                <span className="text-xl font-black text-[#1a1918] font-mono leading-none">74%</span>
                <span className="text-[9px] font-bold text-[#9e9a90] block">Index</span>
              </div>
            </div>
          </div>

          {/* Urgent Deadline Radar (Span 8) */}
          <div className="col-span-8 card-pop p-6 rounded-3xl bg-white border border-[#e6e3da]/80 eduhive-card-shadow flex items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#b87728]/10 text-[#b87728] border border-[#b87728]/20 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#b87728] uppercase tracking-wider">
                    Urgent Deadline Radar
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#faf9f5] border border-[#e6e3da] text-[#78756c]">
                    {activeLab.courseCode}
                  </span>
                </div>
                <h4 className="text-base font-black text-[#1a1918] mt-1">{activeLab.title}</h4>
                <p className="text-xs text-[#78756c] mt-0.5 line-clamp-1">{activeLab.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right font-mono font-bold text-sm th-text bg-[#faf9f5] px-3 py-1.5 rounded-xl border border-[#e6e3da]">
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </div>
              <Link
                to="/student/list"
                className="px-4 py-2 rounded-xl th-bg text-white text-xs font-bold shadow-xs hover:opacity-95 transition-opacity"
              >
                Submit Solution &rarr;
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW: FULL STUDYZEN-INSPIRED MOBILE FLOW (< 1024px)            */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-5 pb-6">

        {/* ── StudyZen Hero Card: Gradient Focus Session ── */}
        <div className="card-pop p-5 rounded-[28px] th-bg text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/15 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div className="max-w-[70%]">
              <h2 className="text-lg font-black tracking-tight leading-snug">Data Structures</h2>
              <p className="text-xs text-white/80 mt-1 leading-relaxed">
                Today's Focus: 2 of 5 Sessions Complete Successfully
              </p>
            </div>
            
            {/* Visual Icon Badge (StudyZen 3D books counterpart) */}
            <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-sm shrink-0">
              <BookOpen className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 pt-2">
            <div className="w-full bg-black/15 h-2 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full transition-all duration-500" style={{ width: '60%' }} />
            </div>
          </div>

          {/* Learn more CTA button (White pill) */}
          <div className="mt-4 flex items-center justify-between">
            <Link
              to="/student/dsa-track"
              className="px-4 py-2 rounded-full bg-white text-[#1a1918] text-xs font-black shadow-xs active:scale-95 transition-transform inline-flex items-center gap-1.5"
            >
              <span>Learn more</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[11px] font-bold text-white/80 font-mono">142/300 Solved</span>
          </div>
        </div>

        {/* ── StudyZen "Today's Plan" Section with WORKING Checkbox Toggles ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-black text-[#1a1918]">Today's Plan</h3>
            <Link to="/student/list" className="text-xs font-bold th-text">
              See All
            </Link>
          </div>

          <div className="space-y-2.5">
            {/* Plan Item 1: DSA Practice */}
            <div className="card-pop p-4 rounded-2xl bg-white border border-[#e6e3da]/80 shadow-xs flex items-center justify-between gap-3">
              <div
                onClick={() => navigate('/student/dsa-track')}
                className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl th-bg-subtle th-text border th-border-subtle flex items-center justify-center shrink-0">
                  <Terminal className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h4 className={`text-xs font-black truncate ${completedPlans[1] ? 'line-through text-[#9e9a90]' : 'text-[#1a1918]'}`}>
                    Data Structures (BST)
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#78756c] font-medium mt-0.5">
                    <span>1h 30m</span>
                    <span>&bull;</span>
                    <span>Study</span>
                  </div>
                </div>
              </div>

              {/* Interactive circular completion toggle */}
              <button
                type="button"
                onClick={() => togglePlanItem(1)}
                className="relative w-9 h-9 flex items-center justify-center shrink-0 cursor-pointer focus:outline-none"
                title={completedPlans[1] ? 'Mark incomplete' : 'Mark complete'}
              >
                <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#f4f2eb" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="14" fill="none"
                    stroke={completedPlans[1] ? '#3e7b54' : 'var(--accent)'} strokeWidth="3"
                    strokeDasharray="87.96" strokeDashoffset={completedPlans[1] ? 0 : 35}
                    strokeLinecap="round"
                  />
                </svg>
                {completedPlans[1] ? (
                  <Check className="absolute w-3.5 h-3.5 text-[#3e7b54] stroke-[3]" />
                ) : (
                  <span className="absolute text-[9px] font-black th-text font-mono">60%</span>
                )}
              </button>
            </div>

            {/* Plan Item 2: OS Lab */}
            <div className="card-pop p-4 rounded-2xl bg-white border border-[#e6e3da]/80 shadow-xs flex items-center justify-between gap-3">
              <div
                onClick={() => navigate('/student/list')}
                className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#ffb23f]/15 text-[#b87728] border border-[#ffb23f]/30 flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h4 className={`text-xs font-black truncate ${completedPlans[2] ? 'line-through text-[#9e9a90]' : 'text-[#1a1918]'}`}>
                    Virtual Memory Lab 05
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#78756c] font-medium mt-0.5">
                    <span>45m</span>
                    <span>&bull;</span>
                    <span>Continuous Lab</span>
                  </div>
                </div>
              </div>

              {/* Interactive circular completion toggle */}
              <button
                type="button"
                onClick={() => togglePlanItem(2)}
                className="relative w-9 h-9 flex items-center justify-center shrink-0 cursor-pointer focus:outline-none"
                title={completedPlans[2] ? 'Mark incomplete' : 'Mark complete'}
              >
                <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#f4f2eb" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="14" fill="none"
                    stroke={completedPlans[2] ? '#3e7b54' : '#ffb23f'} strokeWidth="3"
                    strokeDasharray="87.96" strokeDashoffset={completedPlans[2] ? 0 : 0}
                    strokeLinecap="round"
                  />
                </svg>
                {completedPlans[2] ? (
                  <Check className="absolute w-3.5 h-3.5 text-[#3e7b54] stroke-[3]" />
                ) : (
                  <span className="absolute text-[9px] font-black text-[#3e7b54] font-mono">100%</span>
                )}
              </button>
            </div>

            {/* Plan Item 3: Computer Networks */}
            <div className="card-pop p-4 rounded-2xl bg-white border border-[#e6e3da]/80 shadow-xs flex items-center justify-between gap-3">
              <div
                onClick={() => navigate('/student/dsa-track')}
                className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#3e7b54]/15 text-[#3e7b54] border border-[#3e7b54]/30 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h4 className={`text-xs font-black truncate ${completedPlans[3] ? 'line-through text-[#9e9a90]' : 'text-[#1a1918]'}`}>
                    Problem Solving &amp; CN
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#78756c] font-medium mt-0.5">
                    <span>1h</span>
                    <span>&bull;</span>
                    <span>Practice</span>
                  </div>
                </div>
              </div>

              {/* Interactive circular completion toggle */}
              <button
                type="button"
                onClick={() => togglePlanItem(3)}
                className="relative w-9 h-9 flex items-center justify-center shrink-0 cursor-pointer focus:outline-none"
                title={completedPlans[3] ? 'Mark incomplete' : 'Mark complete'}
              >
                <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#f4f2eb" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="14" fill="none"
                    stroke={completedPlans[3] ? '#3e7b54' : '#f43f5e'} strokeWidth="3"
                    strokeDasharray="87.96" strokeDashoffset={completedPlans[3] ? 0 : 61}
                    strokeLinecap="round"
                  />
                </svg>
                {completedPlans[3] ? (
                  <Check className="absolute w-3.5 h-3.5 text-[#3e7b54] stroke-[3]" />
                ) : (
                  <span className="absolute text-[9px] font-black text-[#f43f5e] font-mono">30%</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── StudyZen AI Tip Card (Clickable to open AI modal) ── */}
        <div
          onClick={() => setIsAiModalOpen(true)}
          className="card-pop p-4 rounded-2xl bg-gradient-to-r from-white via-white to-[#faf9f5] border border-[#e6e3da] shadow-xs flex items-center gap-3.5 cursor-pointer active:scale-98 transition-transform"
        >
          <div className="w-11 h-11 rounded-2xl th-bg text-white flex items-center justify-center shrink-0 shadow-xs">
            <Bot className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider th-text block">
              SkillTracker AI Advisor
            </span>
            <p className="text-xs text-[#1a1918] font-semibold mt-0.5 leading-snug">
              You study best between 9-11 AM. Your OS Lab 05 deadline is in 4 hours!
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#9e9a90] shrink-0" />
        </div>

        {/* ── StudyZen 4-Stat Metric Cards Grid ── */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/student/overview" className="card-pop p-4 rounded-2xl bg-white border border-[#e6e3da]/80 shadow-xs hover:border-[#c7c3b6] transition-colors">
            <div className="flex items-center justify-between text-xs text-[#78756c]">
              <span className="text-[10px] font-bold uppercase">Study Time</span>
              <span className="text-[10px] font-bold text-[#3e7b54] bg-[#3e7b54]/10 px-1.5 py-0.2 rounded-full">
                +18%
              </span>
            </div>
            <div className="text-lg font-black text-[#1a1918] font-mono mt-1">12h 45m</div>
            <span className="text-[10px] text-[#78756c]">This week &rarr;</span>
          </Link>

          <Link to="/student/list" className="card-pop p-4 rounded-2xl bg-white border border-[#e6e3da]/80 shadow-xs hover:border-[#c7c3b6] transition-colors">
            <div className="flex items-center justify-between text-xs text-[#78756c]">
              <span className="text-[10px] font-bold uppercase">Completed</span>
              <span className="text-[10px] font-bold text-[#3e7b54] bg-[#3e7b54]/10 px-1.5 py-0.2 rounded-full">
                +12%
              </span>
            </div>
            <div className="text-lg font-black text-[#1a1918] font-mono mt-1">18 Labs</div>
            <span className="text-[10px] text-[#78756c]">90% syllabus &rarr;</span>
          </Link>

          <Link to="/student/leaderboard" className="card-pop p-4 rounded-2xl bg-white border border-[#e6e3da]/80 shadow-xs hover:border-[#c7c3b6] transition-colors">
            <div className="flex items-center justify-between text-xs text-[#78756c]">
              <span className="text-[10px] font-bold uppercase">Focus Score</span>
              <span className="text-[10px] font-bold text-[#3e7b54] bg-[#3e7b54]/10 px-1.5 py-0.2 rounded-full">
                +15%
              </span>
            </div>
            <div className="text-lg font-black th-text font-mono mt-1">86 / 100</div>
            <span className="text-[10px] text-[#78756c]">Rank #2 cohort &rarr;</span>
          </Link>

          <div className="card-pop p-4 rounded-2xl bg-white border border-[#e6e3da]/80 shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#78756c]">
              <span className="text-[10px] font-bold uppercase">Streak</span>
              <Flame className="w-3.5 h-3.5 text-[#ffb23f]" />
            </div>
            <div className="text-lg font-black text-[#1a1918] font-mono mt-1">17 Days</div>
            <span className="text-[10px] text-[#78756c]">Commit streak</span>
          </div>
        </div>

      </div>

      {/* ── AI Advisor Modal Dialog ── */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-[#e6e3da] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl th-bg text-white flex items-center justify-center">
                  <Bot className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#1a1918]">AI Study Recommendations</h3>
                  <p className="text-xs text-[#78756c]">ADTU Academic Advisor Intelligence</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f4f2eb] flex items-center justify-center text-[#78756c] hover:text-[#1a1918]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pt-2 text-xs text-[#4f4c46] leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-[#faf9f5] border border-[#e6e3da]">
                <strong className="text-[#1a1918] block mb-1">⚡ Peak Focus Window</strong>
                Your biometric study data indicates highest retention between <strong>9:00 AM – 11:30 AM</strong>.
              </div>

              <div className="p-3.5 rounded-2xl bg-[#faf9f5] border border-[#e6e3da]">
                <strong className="text-[#1a1918] block mb-1">🚨 Priority Continuous Lab</strong>
                <strong>CS502 Lab 05: Virtual Memory</strong> is due in 4 hours. Automated validation tests are currently passing 4/4 suites.
              </div>

              <div className="p-3.5 rounded-2xl bg-[#faf9f5] border border-[#e6e3da]">
                <strong className="text-[#1a1918] block mb-1">🎯 LeetCode Recommended Problem</strong>
                Solving <strong>#3 Longest Substring</strong> today will solidify your sliding-window pattern mastery before next week's internal exam.
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAiModalOpen(false);
                  navigate('/student/list');
                }}
                className="flex-1 py-2.5 rounded-xl th-bg text-white text-xs font-bold text-center shadow-xs"
              >
                Go to Priority Lab
              </button>
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-[#f4f2eb] text-[#1a1918] text-xs font-bold"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
