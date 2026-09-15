import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Script from "next/script";

export const revalidate = 60; // Revalidate every minute if necessary

export default async function EquipePage() {
  const supabase = await createClient();
  
  // Fetch data
  const { data: teams } = await supabase.from('teams').select('*').order('name');
  const { data: matches } = await supabase.from('team_matches').select('*, teams(name)').order('match_date', { ascending: false });
  const { data: players } = await supabase.from('players').select('*').order('points', { ascending: false }).limit(20);

  // Group matches by past and future
  const now = new Date();
  const pastMatches = matches?.filter(m => m.match_date && new Date(m.match_date) < now) || [];
  const futureMatches = matches?.filter(m => m.match_date && new Date(m.match_date) >= now).sort((a, b) => new Date(a.match_date).getTime() - new Date(b.match_date).getTime()) || [];

  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden min-h-screen">
      <Script src="https://platform.twitter.com/widgets.js" strategy="afterInteractive" />
      
      {/* Hero Section */}
      <section className="relative w-full bg-primary-dark border-b-[8px] border-accent-purple py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
            L'<span className="text-accent-purple">Équipe</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto font-medium">
            Retrouvez tous les résultats, les équipes engagées en championnat et le classement de nos joueurs.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Teams & Matches */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            
            {/* Nos Equipes */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-12 bg-primary"></div>
                <h2 className="text-4xl font-black text-primary-dark uppercase">Nos Équipes</h2>
              </div>
              
              {teams && teams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teams.map((team) => (
                    <div key={team.id} className="bg-white border-2 border-primary-dark shadow-[4px_4px_0px_0px_rgba(10,45,108,1)] p-6 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(10,45,108,1)] transition-all">
                      <h3 className="font-black text-2xl text-primary-dark uppercase mb-2">{team.name}</h3>
                      <div className="flex flex-col gap-1">
                        <span className="bg-primary/10 text-primary font-bold px-3 py-1 inline-block w-max text-sm">{team.division}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-foreground/70 italic">Aucune équipe synchronisée pour le moment.</p>
              )}
            </div>

            {/* Calendrier & Résultats */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-12 bg-accent-yellow"></div>
                <h2 className="text-4xl font-black text-primary-dark uppercase">Derniers Résultats</h2>
              </div>
              
              <div className="flex flex-col gap-4">
                {pastMatches.slice(0, 8).map(match => (
                  <div key={match.id} className={`border-l-8 p-4 bg-white shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 ${
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
                        <div className="flex items-center gap-2 font-black text-2xl">
                          <span className={match.result === 'victory' ? 'text-green-600' : ''}>{match.score_arras}</span>
                          <span className="text-zinc-300">-</span>
                          <span className={match.result === 'defeat' ? 'text-red-600' : ''}>{match.score_opponent}</span>
                        </div>
                      ) : (
                        <span className="text-zinc-400 font-bold italic">Score en attente</span>
                      )}
                    </div>
                  </div>
                ))}
                {pastMatches.length === 0 && <p className="text-foreground/70 italic">Aucun résultat récent.</p>}
              </div>
            </div>

            {/* Prochains Matchs */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-12 bg-accent-purple"></div>
                <h2 className="text-4xl font-black text-primary-dark uppercase">Prochains Matchs</h2>
              </div>
              
              <div className="flex flex-col gap-4">
                {futureMatches.slice(0, 8).map(match => (
                  <div key={match.id} className="border-2 border-zinc-200 p-4 bg-zinc-50 flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary">
                        {new Date(match.match_date).toLocaleDateString('fr-FR')} - {(match.teams as any)?.name}
                      </span>
                      <span className="font-black text-lg text-primary-dark">
                        Arras TT {match.is_home ? 'reçoit' : 'se déplace chez'} {match.opponent_name}
                      </span>
                    </div>
                    {match.is_home && (
                      <span className="bg-accent-yellow text-primary-dark font-black text-xs uppercase px-3 py-1 shadow-[2px_2px_0px_0px_rgba(10,45,108,1)]">
                        À Domicile
                      </span>
                    )}
                  </div>
                ))}
                {futureMatches.length === 0 && <p className="text-foreground/70 italic">Aucun match à venir.</p>}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Leaderboard */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <h3 className="text-2xl font-black text-primary-dark uppercase border-b-2 border-zinc-200 pb-2">Top 20 Joueurs</h3>
            
            <div className="bg-white border-4 border-primary-dark shadow-[6px_6px_0px_0px_rgba(24,115,211,1)] overflow-hidden">
              {players && players.length > 0 ? (
                <div className="flex flex-col">
                  {players.map((player, idx) => (
                    <div key={player.id} className={`flex items-center justify-between p-4 ${idx !== players.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 flex items-center justify-center font-black text-sm rounded ${
                          idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                          idx === 1 ? 'bg-zinc-300 text-zinc-700' :
                          idx === 2 ? 'bg-amber-600 text-amber-100' : 'text-zinc-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-black text-primary-dark leading-tight truncate max-w-[150px]">{player.last_name} {player.first_name}</p>
                          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{player.license_number}</p>
                        </div>
                      </div>
                      <span className="font-black text-primary bg-primary/10 px-2 py-1 rounded whitespace-nowrap">{player.points} pts</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-zinc-500 italic font-medium">Aucun joueur classé.</div>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
