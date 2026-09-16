"use client";

import { useState } from "react";

export default function MatchCalendar({ matches }: { matches: any[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    // 0 = Sunday, 1 = Monday... but we want 0 = Monday
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; 
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const days = [];
  // Empty cells for the first row
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 md:h-32 border border-zinc-100 bg-zinc-50/50"></div>);
  }

  // Days with matches
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const dayMatches = matches.filter(m => m.match_date && m.match_date.startsWith(dateStr));
    const isToday = new Date().toISOString().split('T')[0] === dateStr;

    days.push(
      <div key={`day-${i}`} className={`h-24 md:h-32 border border-zinc-200 p-2 flex flex-col gap-1 overflow-y-auto transition-colors ${isToday ? 'bg-accent-yellow/10 border-accent-yellow' : 'bg-white hover:bg-zinc-50'}`}>
        <span className={`text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-accent-yellow text-primary-dark' : 'text-zinc-500'}`}>
          {i}
        </span>
        <div className="flex flex-col gap-1 mt-1">
          {dayMatches.map((match, idx) => (
            <div key={idx} className={`text-xs px-2 py-1 rounded border-l-2 truncate ${match.is_home ? 'bg-primary/10 border-primary text-primary-dark font-bold' : 'bg-zinc-100 border-zinc-400 text-zinc-600'}`} title={`Arras TT vs ${match.opponent_name}`}>
              {match.teams?.name?.split(' ')[0]} {match.is_home ? '(D)' : '(E)'}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)] overflow-hidden flex flex-col">
      {/* Calendar Header */}
      <div className="bg-primary-dark text-white p-4 flex justify-between items-center">
        <button onClick={prevMonth} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors font-bold rounded">
          &lt;
        </button>
        <h3 className="text-xl font-black uppercase tracking-widest text-accent-yellow">
          {monthNames[month]} {year}
        </h3>
        <button onClick={nextMonth} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors font-bold rounded">
          &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 p-4 bg-zinc-50">
        <div className="grid grid-cols-7 gap-px mb-2 text-center text-xs font-black uppercase text-zinc-400 tracking-wider">
          <div>Lun</div>
          <div>Mar</div>
          <div>Mer</div>
          <div>Jeu</div>
          <div>Ven</div>
          <div>Sam</div>
          <div>Dim</div>
        </div>
        <div className="grid grid-cols-7 gap-px bg-zinc-200 border border-zinc-200">
          {days}
        </div>
        <div className="mt-4 flex gap-4 text-xs font-bold text-zinc-500 justify-center">
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-primary/10 border-l-2 border-primary inline-block"></span> À Domicile (D)</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-zinc-100 border-l-2 border-zinc-400 inline-block"></span> À l'Extérieur (E)</div>
        </div>
      </div>
    </div>
  );
}
