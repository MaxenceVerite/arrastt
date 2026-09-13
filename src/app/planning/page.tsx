export default function PlanningPage() {
  const schedule = [
    { day: "Lundi", sessions: [{ time: "18h30 - 20h00", name: "Jeunes - Débutants", type: "Dirigé", color: "bg-primary" }, { time: "20h00 - 22h00", name: "Adultes - Loisir", type: "Libre", color: "bg-accent-purple" }] },
    { day: "Mardi", sessions: [{ time: "19h00 - 21h00", name: "Adultes - Compétition", type: "Dirigé", color: "bg-primary-dark" }] },
    { day: "Mercredi", sessions: [{ time: "14h00 - 16h00", name: "Jeunes - Loisir", type: "Libre", color: "bg-accent-purple" }, { time: "16h00 - 18h00", name: "Jeunes - Perfectionnement", type: "Dirigé", color: "bg-primary" }] },
    { day: "Jeudi", sessions: [{ time: "18h30 - 20h30", name: "Adultes - Loisir & Compétition", type: "Libre", color: "bg-accent-purple" }] },
    { day: "Vendredi", sessions: [{ time: "18h00 - 20h30", name: "Entraînement Libre (Tous niveaux)", type: "Libre", color: "bg-accent-purple" }] },
    { day: "Samedi", sessions: [{ time: "14h00 - 18h00", name: "Rencontres Championnat Jeunes", type: "Compétition", color: "bg-accent-yellow" }] },
    { day: "Dimanche", sessions: [{ time: "09h00 - 13h00", name: "Rencontres Championnat Adultes", type: "Compétition", color: "bg-accent-yellow" }] },
  ];

  return (
    <div className="flex flex-col w-full bg-zinc-50 min-h-screen">
      <section className="relative w-full bg-primary-dark pt-16 pb-24 border-b-[8px] border-accent-yellow overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            Le <span className="text-accent-yellow">Planning</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium">
            Retrouvez tous les horaires d'ouvertures de la salle Vandamme pour les entraînements et les compétitions.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          
          <div className="flex flex-wrap gap-4 mb-4 justify-center md:justify-start">
            <div className="flex items-center gap-2 font-bold text-sm uppercase"><div className="w-4 h-4 bg-primary"></div> Dirigé</div>
            <div className="flex items-center gap-2 font-bold text-sm uppercase"><div className="w-4 h-4 bg-accent-purple"></div> Libre</div>
            <div className="flex items-center gap-2 font-bold text-sm uppercase"><div className="w-4 h-4 bg-accent-yellow"></div> Compétition</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {schedule.map((dayData, i) => (
              <div key={i} className="flex flex-col border-2 border-primary-dark bg-white">
                <div className="bg-primary-dark text-white font-black uppercase text-center py-3 border-b-2 border-primary-dark">
                  {dayData.day}
                </div>
                <div className="p-2 flex flex-col gap-2 min-h-[200px]">
                  {dayData.sessions.map((session, j) => (
                    <div key={j} className={`p-3 border-2 border-transparent hover:border-black transition-colors ${session.color} flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                      <span className={`${session.color === 'bg-accent-yellow' ? 'text-primary-dark' : 'text-white'} font-black text-sm uppercase mb-2`}>{session.time}</span>
                      <span className={`${session.color === 'bg-accent-yellow' ? 'text-primary-dark' : 'text-white/90'} font-bold text-xs`}>{session.name}</span>
                    </div>
                  ))}
                  {dayData.sessions.length === 0 && (
                    <div className="text-center text-zinc-400 font-bold uppercase text-xs py-10">Fermé</div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
