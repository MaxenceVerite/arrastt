"use client";

import { useState } from "react";
import Image from "next/image";

export default function MediasPage() {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  // Mock data for the masonry gallery
  const medias = Array.from({ length: 15 }).map((_, i) => {
    // Determine pseudo-randomly if it's a video or photo based on index
    const isVideo = i % 5 === 0;
    
    // Calculate aspect ratio classes to create the masonry staggered effect
    const aspectClass = 
      i % 4 === 0 ? "aspect-square" : 
      i % 3 === 0 ? "aspect-[3/4]" : 
      "aspect-video";

    return {
      id: i,
      type: isVideo ? "video" : "photo",
      title: isVideo ? "Rallye exceptionnel équipe 1" : "Tournoi Régional",
      src: isVideo 
        ? "https://videos.pexels.com/video-files/5538743/5538743-uhd_2732_1440_25fps.mp4" 
        : `https://picsum.photos/seed/arras${i}/800/1000`,
      aspectClass,
    };
  });

  return (
    <div className="flex flex-col w-full bg-zinc-50 overflow-x-hidden min-h-screen">
      
      {/* Header Section */}
      <section className="relative w-full bg-primary-dark pt-16 pb-24 border-b-[8px] border-accent-purple overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full z-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-accent-yellow rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-primary rounded-full blur-3xl mix-blend-screen"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            Photos <span className="text-accent-purple">&</span> Vidéos
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Revivez les meilleurs moments du club : compétitions, entraînements, et événements de l'Arras TT.
          </p>
          
          {/* Filters (Mock UI) */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button className="bg-white text-primary-dark font-black uppercase px-6 py-2 rounded-full shadow-lg">Tous</button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold uppercase px-6 py-2 rounded-full transition-colors border border-white/20">Tournois</button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold uppercase px-6 py-2 rounded-full transition-colors border border-white/20">Championnat</button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold uppercase px-6 py-2 rounded-full transition-colors border border-white/20">Vidéos</button>
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {medias.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedMedia(item)}
              className={`relative group w-full ${item.aspectClass} overflow-hidden rounded-2xl bg-zinc-200 break-inside-avoid border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
            >
              {item.type === "photo" ? (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <>
                  <video 
                    src={item.src}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loop
                    muted
                    playsInline
                    autoPlay={false} 
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                  {/* Brutalist Video Badge */}
                  <div className="absolute top-4 right-4 bg-accent-yellow text-primary-dark font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-primary-dark shadow-[3px_3px_0px_0px_rgba(10,45,108,1)] z-10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    Vidéo
                  </div>
                  {/* Big Play icon that appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                     <div className="w-16 h-16 bg-primary-dark/80 backdrop-blur-sm border-2 border-accent-yellow text-accent-yellow flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,226,138,1)]">
                       <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                     </div>
                  </div>
                </>
              )}
              
              {/* Overlay with info on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load more button */}
        <div className="mt-16 flex justify-center">
          <button className="bg-primary-dark hover:bg-primary text-white font-black uppercase px-8 py-4 shadow-[6px_6px_0px_0px_rgba(255,226,138,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(255,226,138,1)] transition-all">
            Charger plus de médias
          </button>
        </div>
      </section>

      {/* Lightbox / Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm">
          {/* Close button */}
          <button 
            onClick={() => setSelectedMedia(null)}
            className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white text-primary-dark font-black flex items-center justify-center hover:bg-accent-yellow transition-colors border-2 border-primary-dark shadow-[4px_4px_0px_0px_rgba(255,226,138,1)] z-[60]"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="relative w-full max-w-5xl max-h-[85vh] h-full flex flex-col items-center justify-center">
            {selectedMedia.type === "photo" ? (
              <div className="relative w-full h-full">
                <Image
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <video 
                src={selectedMedia.src}
                className="w-full h-full object-contain border-4 border-zinc-800"
                controls
                autoPlay
              />
            )}
            
            {/* Title / Description */}
            <div className="absolute bottom-[-2rem] text-center w-full text-white">
              <p className="font-bold text-lg md:text-xl uppercase tracking-wider">
                {selectedMedia.title}
              </p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
