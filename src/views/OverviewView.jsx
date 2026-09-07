import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  Calendar,
  Clock,
  BookOpen,
  TrendingUp,
  Flame,
  MoreVertical,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export const OverviewView = () => {
  const { student, labs, dsaProblems } = useStudent();
  const [timeRange, setTimeRange] = useState('Week');

  // StudyZen time periods
  const timeRanges = ['Day', 'Week', 'Month', 'All Time'];

  // StudyZen 7-day study timeline
  const studyHours = [
    { day: 'Sun', hours: 0.8 },
    { day: 'Mon', hours: 1.8 },
    { day: 'Tue', hours: 1.7 },
    { day: 'Wed', hours: 3.4, active: true },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 3.8 },
    { day: 'Sat', hours: 2.2 }
  ];

  return (
    <div className="space-y-5 sm:space-y-6 max-w-2xl mx-auto pb-6">

      {/* ── Header: Back button + Title + Calendar icon ── */}
      <div className="card-pop stagger-1 flex items-center justify-between py-2">
        <Link
          to="/student"
          className="w-10 h-10 rounded-2xl bg-white border border-[#e6e3da] flex items-center justify-center text-[#1a1918] hover:bg-[#faf9f5] transition-colors shadow-xs"
          title="Back to Dashboard"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
        </Link>

        <h1 className="text-xl font-black text-[#1a1918] tracking-tight">Overview</h1>

        <button
          type="button"
          className="w-10 h-10 rounded-2xl bg-white border border-[#e6e3da] flex items-center justify-center text-[#1a1918] hover:bg-[#faf9f5] transition-colors shadow-xs"
          title="Calendar"
        >
          <Calendar className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* ── Time Range Pill Switcher (StudyZen style) ── */}
      <div className="card-pop stagger-2 p-1 bg-[#f4f2eb] rounded-2xl flex items-center justify-between border border-[#e6e3da]/80">
        {timeRanges.map((range) => {
          const isActive = range === timeRange;
          return (
            <button
              key={range}
              type="button"
              onClick={() => setTimeRange(range)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                isActive
                  ? 'th-bg text-white shadow-xs'
                  : 'text-[#78756c] hover:text-[#1a1918]'
              }`}
            >
              {range}
            </button>
          );
        })}
      </div>

      {/* ── 4 Metric Summary Cards (StudyZen Screen 2) ── */}
      <div className="card-pop stagger-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Card 1: Study Time */}
        <div className="p-4 rounded-2xl bg-white border border-[#e6e3da]/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl th-bg-subtle th-text flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-[#3e7b54] bg-[#3e7b54]/10 px-1.5 py-0.2 rounded-full">
              18%
            </span>
          </div>
          <div className="mt-3">
            <div className="text-base font-black text-[#1a1918] font-mono leading-none">12h 45m</div>
            <span className="text-[10px] font-medium text-[#78756c] mt-1 block">Study Time</span>
          </div>
        </div>

        {/* Card 2: Sessions */}
        <div className="p-4 rounded-2xl bg-white border border-[#e6e3da]/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#2b7fff]/10 text-[#2b7fff] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-[#3e7b54] bg-[#3e7b54]/10 px-1.5 py-0.2 rounded-full">
              12%
            </span>
          </div>
          <div className="mt-3">
            <div className="text-base font-black text-[#1a1918] font-mono leading-none">18</div>
            <span className="text-[10px] font-medium text-[#78756c] mt-1 block">Sessions</span>
          </div>
        </div>

        {/* Card 3: Focus Score */}
        <div className="p-4 rounded-2xl bg-white border border-[#e6e3da]/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#3e7b54]/10 text-[#3e7b54] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-[#3e7b54] bg-[#3e7b54]/10 px-1.5 py-0.2 rounded-full">
              15%
            </span>
          </div>
          <div className="mt-3">
            <div className="text-base font-black text-[#1a1918] font-mono leading-none">86</div>
            <span className="text-[10px] font-medium text-[#78756c] mt-1 block">Focus Score</span>
          </div>
        </div>

        {/* Card 4: Streak */}
        <div className="p-4 rounded-2xl bg-white border border-[#e6e3da]/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#ffb23f]/10 text-[#ffb23f] flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-[#ffb23f] bg-[#ffb23f]/10 px-1.5 py-0.2 rounded-full">
              🔥
            </span>
          </div>
          <div className="mt-3">
            <div className="text-base font-black text-[#1a1918] font-mono leading-none">17</div>
            <span className="text-[10px] font-medium text-[#78756c] mt-1 block">Streak Days</span>
          </div>
        </div>
      </div>

      {/* ── Study Time Line + Bar Chart ── */}
      <div className="card-pop stagger-4 p-5 sm:p-6 rounded-3xl bg-white border border-[#e6e3da]/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-[#1a1918]">Study Time (Hours)</h3>
          <MoreVertical className="w-4 h-4 text-[#9e9a90]" />
        </div>

        {/* Interactive Line Chart with Bar underpinnings */}
        <div className="relative h-48 pt-6 pb-2">
          {/* Tooltip on active point */}
          <div className="absolute top-2 left-[55%] -translate-x-1/2 bg-[#1a1918] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md z-10">
            2.5 Hours
          </div>

          <div className="h-36 flex items-end justify-between gap-2 border-b border-[#f4f2eb] px-2">
            {studyHours.map((item) => {
              const maxH = 4.0;
              const barHeightPct = (item.hours / maxH) * 100;
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div
                    className="w-full max-w-[14px] rounded-t-md transition-all duration-300"
                    style={{
                      height: `${barHeightPct}%`,
                      background: item.active
                        ? 'linear-gradient(180deg, var(--accent) 0%, rgba(217,119,87,0.15) 100%)'
                        : 'linear-gradient(180deg, rgba(217,119,87,0.3) 0%, rgba(217,119,87,0.05) 100%)'
                    }}
                  />
                  <span className="text-[10px] font-bold text-[#78756c] mt-2 group-hover:th-text">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Subject Breakdown (Radial Segmented Sunburst Ring) ── */}
      <div className="card-pop stagger-5 p-5 sm:p-6 rounded-3xl bg-white border border-[#e6e3da]/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black text-[#1a1918]">Subject Breakdown</h3>
          <SlidersHorizontal className="w-4 h-4 text-[#9e9a90]" />
        </div>

        {/* Circular Sunburst Segmented Ring */}
        <div className="relative flex items-center justify-center my-4">
          <svg className="w-44 h-44 -rotate-90" viewBox="0 0 120 120">
            {/* Background ring */}
            <circle cx="60" cy="60" r="46" fill="none" stroke="#f4f2eb" strokeWidth="10" />
            
            {/* Segment 1: Data Structures (4h 30m = 40%) */}
            <circle
              cx="60" cy="60" r="46" fill="none"
              stroke="var(--accent)" strokeWidth="10"
              strokeDasharray="289.02" strokeDashoffset="173.4"
              strokeLinecap="round"
            />

            {/* Segment 2: Discrete / OS (3h 00m = 32%) */}
            <circle
              cx="60" cy="60" r="46" fill="none"
              stroke="#7c3aed" strokeWidth="10"
              strokeDasharray="289.02" strokeDashoffset="210"
              transform="rotate(144 60 60)"
              strokeLinecap="round"
            />

            {/* Segment 3: Solvify / CN (2h 45m = 28%) */}
            <circle
              cx="60" cy="60" r="46" fill="none"
              stroke="#10b981" strokeWidth="10"
              strokeDasharray="289.02" strokeDashoffset="220"
              transform="rotate(259 60 60)"
              strokeLinecap="round"
            />
          </svg>

          {/* Center Text Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-black text-[#1a1918] font-mono leading-none">12h 45m</span>
            <span className="text-[10px] font-bold text-[#78756c] mt-1">Total Study</span>
          </div>
        </div>

        {/* Subject Breakdown Legend (StudyZen Screen 2 style) */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#f4f2eb]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full th-bg" />
              <span className="text-[11px] font-bold text-[#1a1918]">Structures</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#78756c]">4h 30m</span>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#7c3aed]" />
              <span className="text-[11px] font-bold text-[#1a1918]">Discrete</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#78756c]">3h 00m</span>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="text-[11px] font-bold text-[#1a1918]">Solvify</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#78756c]">2h 45m</span>
          </div>
        </div>
      </div>

    </div>
  );
};
