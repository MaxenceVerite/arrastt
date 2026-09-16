import { createClient } from "@/utils/supabase/server";
import Script from "next/script";
import PlayersList from "./PlayersList";

export const revalidate = 60; // Revalidate every minute if necessary

export default async function JoueursPage() {
  const supabase = await createClient();
  
  // Fetch data
  const { data: teams } = await supabase.from('teams').select('*').order('name');
  const { data: players } = await supabase.from('players').select('*'); // Get all players

  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden min-h-screen">
      <Script src="https://platform.twitter.com/widgets.js" strategy="afterInteractive" />
      
      {/* Hero Section */}
      <section className="relative w-full bg-primary-dark border-b-[8px] border-accent-purple py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
            Les <span className="text-accent-purple">Joueurs</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto font-medium">
            Retrouvez le classement de tous les joueurs du club et nos différentes équipes engagées en championnat.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Teams */}
          <div className="lg:col-span-6 flex flex-col gap-16">
            
            {/* Nos Equipes */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-12 bg-primary"></div>
                <h2 className="text-4xl font-black text-primary-dark uppercase">Nos Équipes</h2>
              </div>
              
              {teams && teams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teams.map((team) => {
                    const cleanName = team.name.replace(/\s*-\s*PHASE\s*\d/i, '');
                    const isPhase2 = /PHASE 2/i.test(team.name);
                    
                    return (
                      <div key={team.id} className="relative overflow-hidden bg-primary-dark text-white border-4 border-accent-yellow shadow-[6px_6px_0px_0px_rgba(255,226,138,1)] p-6 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(255,226,138,1)] transition-all flex flex-col justify-between min-h-[160px] group">
                        {/* Ping Pong SVG Watermark */}
                        <svg className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 transform -rotate-12 group-hover:scale-110 group-hover:text-white/10 transition-all duration-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2c-3.3 0-6 2.7-6 6 0 1.9 0.9 3.6 2.3 4.7l-4 8.7c-0.2 0.4 0 0.9 0.4 1.1 0.4 0.2 0.9 0 1.1-0.4l4-8.7c0.7 0.4 1.5 0.6 2.2 0.6 3.3 0 6-2.7 6-6s-2.7-6-6-6zM14 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
                          <circle cx="9" cy="6" r="1.5" />
                        </svg>
                        
                        <div className="relative z-10 flex flex-col h-full justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-black text-3xl uppercase tracking-tighter leading-none">{cleanName}</h3>
                            <span className="bg-accent-yellow text-primary-dark font-black text-xs px-2 py-1 uppercase tracking-widest border-2 border-primary-dark shrink-0">
                              Phase {isPhase2 ? '2' : '1'}
                            </span>
                          </div>
                          
                          <div className="mt-8 border-t-2 border-white/10 pt-4">
                            <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Division</p>
                            <p className="font-bold text-lg text-accent-yellow leading-tight">{team.division}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-foreground/70 italic">Aucune équipe synchronisée pour le moment.</p>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Leaderboard */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <h3 className="text-4xl font-black text-primary-dark uppercase border-b-4 border-zinc-200 pb-4 mb-4">
              Tous les joueurs <span className="text-xl text-zinc-400 normal-case font-bold">({players?.length || 0})</span>
            </h3>
            
            <PlayersList initialPlayers={players || []} />
            
          </div>
        </div>
      </section>
    </div>
  );
}
