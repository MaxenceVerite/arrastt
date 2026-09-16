"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ClubCarousel({ images: initialImages = [] }: { images?: any[] }) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Parse images for backward compatibility and fallback
  const fallbackImages = [
    { url: "/medias/devanture_salle_vandamme.jpg", caption: "" },
    { url: "/medias/image_club_arrastt_1.jpg", caption: "" },
    { url: "/medias/image_club_arrastt_2.jpg", caption: "" },
    { url: "/medias/image_club_arrastt_3.jpg", caption: "" },
    { url: "/medias/image_club_arrastt_4.jpg", caption: "" },
  ];

  const parsedImages = initialImages.length > 0 
    ? initialImages.map(img => typeof img === 'string' ? { url: img, caption: "" } : img)
    : fallbackImages;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="bg-zinc-900 py-16 border-t-[8px] border-accent-purple overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase">En images</h2>
            <div className="flex gap-4">
              <button 
                onClick={scrollLeft} 
                className="w-12 h-12 flex items-center justify-center bg-white hover:bg-accent-yellow text-primary-dark shadow-[4px_4px_0px_0px_rgba(168,80,155,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(168,80,155,1)] transition-all"
                aria-label="Défiler à gauche"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button 
                onClick={scrollRight} 
                className="w-12 h-12 flex items-center justify-center bg-white hover:bg-accent-yellow text-primary-dark shadow-[4px_4px_0px_0px_rgba(168,80,155,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(168,80,155,1)] transition-all"
                aria-label="Défiler à droite"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        </div>
        
        <div ref={carouselRef} className="w-full flex overflow-x-auto snap-x snap-mandatory pb-8 px-4 sm:px-6 lg:px-8 hide-scrollbar gap-6 scroll-smooth">
          {parsedImages.map((item, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedMedia(item.url)}
              className="relative w-[85vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] aspect-[4/3] flex-shrink-0 snap-center rounded-2xl overflow-hidden border-2 border-white/10 group cursor-pointer hover:border-accent-yellow transition-colors"
            >
              <Image 
                src={item.url} 
                alt={`Photo du club ${i + 1}`} 
                fill 
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              {item.caption && (
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between">
                    {item.caption}
                    <svg className="w-6 h-6 text-accent-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm">
          <button 
            onClick={() => setSelectedMedia(null)}
            className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white text-primary-dark font-black flex items-center justify-center hover:bg-accent-yellow transition-colors border-2 border-primary-dark shadow-[4px_4px_0px_0px_rgba(255,226,138,1)] z-[60]"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="relative w-full max-w-5xl max-h-[85vh] h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={selectedMedia}
                alt="Image agrandie"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
