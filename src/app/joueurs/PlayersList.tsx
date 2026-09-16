"use client";

import { useState, useMemo } from "react";

type Player = {
  id: string;
  first_name: string;
  last_name: string;
  points: number;
  license_number: string;
};

export default function PlayersList({ initialPlayers }: { initialPlayers: Player[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  // Trier tous les joueurs par points (déjà fait côté serveur, mais sécurité)
  const sortedPlayers = useMemo(() => {
    return [...initialPlayers].sort((a, b) => b.points - a.points);
  }, [initialPlayers]);

  // Filtrer en fonction de la recherche
  const filteredPlayers = useMemo(() => {
    if (!searchTerm) return sortedPlayers;
    const lowerSearch = searchTerm.toLowerCase();
    return sortedPlayers.filter(p => 
      p.first_name.toLowerCase().includes(lowerSearch) ||
      p.last_name.toLowerCase().includes(lowerSearch) ||
      p.license_number.includes(searchTerm)
    );
  }, [sortedPlayers, searchTerm]);

  // Pagination simple "Afficher plus"
  const displayedPlayers = filteredPlayers.slice(0, visibleCount);

  return (
    <div className="flex flex-col h-[750px] lg:sticky lg:top-32 bg-white border-4 border-primary-dark shadow-[6px_6px_0px_0px_rgba(24,115,211,1)] overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 bg-zinc-50 border-b-4 border-primary-dark flex items-center gap-3">
        <svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text"
          placeholder="Rechercher un joueur..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(20); // Reset pagination on search
          }}
          className="w-full bg-transparent border-none outline-none font-bold text-primary-dark placeholder:text-zinc-400"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="text-zinc-400 hover:text-red-500 font-bold">
            X
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex flex-col overflow-y-auto flex-1">
        {displayedPlayers.length > 0 ? (
          <>
            {displayedPlayers.map((player, idx) => {
              // Si on ne recherche pas, l'index réel est l'index global + 1. 
              // Si on recherche, on n'affiche pas le classement global pour éviter la confusion, ou on le recalcule.
              // Ici, on va retrouver la vraie position du joueur dans sortedPlayers
              const realRank = sortedPlayers.findIndex(p => p.id === player.id) + 1;

              return (
                <div key={player.id} className="flex items-center justify-between p-4 border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 flex items-center justify-center font-black text-sm rounded ${
                      realRank === 1 ? 'bg-yellow-400 text-yellow-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]' :
                      realRank === 2 ? 'bg-zinc-300 text-zinc-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]' :
                      realRank === 3 ? 'bg-amber-600 text-amber-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]' : 'text-zinc-400'
                    }`}>
                      {realRank}
                    </span>
                    <div>
                      <p className="font-black text-primary-dark leading-tight">{player.last_name} {player.first_name}</p>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{player.license_number}</p>
                    </div>
                  </div>
                  <span className="font-black text-primary bg-primary/10 px-3 py-1.5 rounded-md whitespace-nowrap">
                    {player.points} pts
                  </span>
                </div>
              );
            })}
            
            {visibleCount < filteredPlayers.length && (
              <button 
                onClick={() => setVisibleCount(prev => prev + 20)}
                className="p-4 text-center font-bold text-accent-purple hover:bg-zinc-50 transition-colors"
              >
                Afficher plus de joueurs
              </button>
            )}
          </>
        ) : (
          <div className="p-8 text-center flex flex-col items-center justify-center h-full text-zinc-500">
            <svg className="w-12 h-12 mb-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-bold text-lg">Aucun joueur trouvé</p>
            <p className="text-sm">Essayez de modifier votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}
