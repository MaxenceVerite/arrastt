import { createClient } from "@/utils/supabase/server";
import Script from "next/script";
import MatchCalendar from "./MatchCalendar";

export const revalidate = 60; // Revalidate every minute if necessary

export default async function SaisonPage() {
  const supabase = await createClient();
  
  // Fetch matches
  const { data: matches } = await supabase.from('team_matches').select('*, teams(name)').order('match_date', { ascending: false });

  // Group matches by past and future
  const now = new Date();
  const pastMatches = matches?.filter(m => m.match_date && new Date(m.match_date) < now) || [];

  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden min-h-screen">
      <Script src="https://platform.twitter.com/widgets.js" strategy="afterInteractive" />
      
      {/* Hero Section */}
      <section className="relative w-full bg-primary-dark border-b-[8px] border-accent-yellow py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
            La <span className="text-accent-yellow">Saison</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto font-medium">
            Calendrier des rencontres, derniers résultats et agenda des événements du club.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          
          {/* TOP/LEFT COLUMN: Calendrier */}
          <div className="xl:col-span-8 flex flex-col gap-16">
            
            {/* Calendrier des Matchs */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-12 bg-accent-purple"></div>
                <h2 className="text-4xl font-black text-primary-dark uppercase">Calendrier</h2>
              </div>
              
              <MatchCalendar matches={matches || []} />
            </div>

            {/* Derniers Résultats */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-12 bg-accent-yellow"></div>
                <h2 className="text-4xl font-black text-primary-dark uppercase">Derniers Résultats</h2>
              </div>
              
              <div className="flex flex-col gap-4">
                {pastMatches.slice(0, 15).map(match => (
                  <div key={match.id} className={`border-l-8 p-4 bg-white shadow-[4px_4px_0px_0px_rgba(228,228,231,1)] flex flex-col md:flex-row justify-between md:items-center gap-4 ${
                    match.result === 'victory' ? 'border-green-500' : match.result === 'defeat' ? 'border-red-500' : 'border-zinc-400'
                  }`}>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-500">
                        {new Date(match.match_date).toLocaleDateString('fr-FR')} - {(match.teams as any)?.name}
                      </span>
                      <span className="font-black text-lg text-primary-dark">
                        Arras TT {match.is_home ? 'reçoit' : 'se déplace chez'} {match.opponent_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      {match.score_arras !== null && match.score_opponent !== null ? (
                        <div className="flex items-center gap-2 font-black text-3xl">
                          <span className={match.result === 'victory' ? 'text-green-600' : ''}>{match.score_arras}</span>
                          <span className="text-zinc-300">-</span>
                          <span className={match.result === 'defeat' ? 'text-red-600' : ''}>{match.score_opponent}</span>
                        </div>
                      ) : (
                        <span className="text-zinc-400 font-bold italic border-2 border-dashed border-zinc-200 px-4 py-2">Score en attente</span>
                      )}
                    </div>
                  </div>
                ))}
                {pastMatches.length === 0 && <p className="text-foreground/70 italic">Aucun résultat récent.</p>}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Infos */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-primary p-8 text-white shadow-[8px_8px_0px_0px_rgba(10,45,108,1)]">
              <h3 className="text-2xl font-black uppercase mb-4 text-accent-yellow">Venez nous supporter !</h3>
              <p className="font-medium mb-6">
                Les matchs à domicile se déroulent à la salle spécifique. L'entrée est gratuite et l'ambiance garantie !
              </p>
              <div className="flex flex-col gap-2 font-bold text-sm">
                <span className="bg-white/20 p-2 rounded">📍 Complexe Sportif, Arras</span>
                <span className="bg-white/20 p-2 rounded">🍺 Buvette sur place</span>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
