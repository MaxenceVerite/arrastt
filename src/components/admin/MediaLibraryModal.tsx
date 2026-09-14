"use client";

import { useState } from "react";
import Image from "next/image";

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function MediaLibraryModal({ isOpen, onClose, onSelect }: MediaLibraryModalProps) {
  // In a real app, this would fetch from supabase.storage.from('medias').list()
  const [medias] = useState([
    { name: "devanture_salle_vandamme.jpg", url: "/medias/devanture_salle_vandamme.jpg" },
    { name: "image_club_arrastt_1.jpg", url: "/medias/image_club_arrastt_1.jpg" },
    { name: "image_club_arrastt_2.jpg", url: "/medias/image_club_arrastt_2.jpg" },
    { name: "image_club_arrastt_3.jpg", url: "/medias/image_club_arrastt_3.jpg" },
    { name: "image_club_arrastt_4.jpg", url: "/medias/image_club_arrastt_4.jpg" },
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col border-4 border-primary-dark shadow-[12px_12px_0px_0px_rgba(255,226,138,1)] overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-4 border-primary-dark bg-zinc-50">
          <h2 className="text-2xl font-black text-primary-dark uppercase">Médiathèque</h2>
          <button onClick={onClose} className="text-primary-dark hover:text-red-500 font-black text-xl">X</button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {medias.map((media, idx) => (
              <div 
                key={idx} 
                className="group relative aspect-square border-4 border-transparent hover:border-primary cursor-pointer transition-colors"
                onClick={() => {
                  onSelect(media.url);
                  onClose();
                }}
              >
                <Image src={media.url} alt={media.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                <div className="absolute inset-0 bg-primary/80 text-white font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  Sélectionner
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t-4 border-primary-dark bg-zinc-50 flex justify-between items-center">
           <p className="text-sm font-bold text-zinc-500">Cliquez sur une image pour l'ajouter</p>
           <button onClick={onClose} className="bg-zinc-200 text-zinc-700 font-bold uppercase px-6 py-2 hover:bg-zinc-300 transition-colors">Annuler</button>
        </div>
      </div>
    </div>
  );
}
