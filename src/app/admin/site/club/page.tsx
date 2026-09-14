"use client";

import { useState } from "react";
import Image from "next/image";
import { updateSiteContent } from "../../actions";
import MediaLibraryModal from "@/components/admin/MediaLibraryModal";

export default function AdminSiteClubCMS() {
  const [carouselImages, setCarouselImages] = useState([
    "/medias/devanture_salle_vandamme.jpg",
    "/medias/image_club_arrastt_1.jpg",
    "/medias/image_club_arrastt_2.jpg",
    "/medias/image_club_arrastt_3.jpg",
    "/medias/image_club_arrastt_4.jpg"
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeImage = (index: number) => {
    setCarouselImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddImage = (url: string) => {
    setCarouselImages(prev => [...prev, url]);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateSiteContent('club_carousel', carouselImages);
    
    if (result.success) {
      alert("Modifications enregistrées. Le site public a été mis à jour !");
    } else {
      alert(result.error || "Une erreur est survenue");
    }
    setIsSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black text-primary-dark uppercase">Gérer le site</h1>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-white font-black uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(24,115,211,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(24,115,211,1)] transition-all flex items-center gap-2"
        >
          {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </div>

      <div className="bg-white p-8 border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)] mb-8">
        <h2 className="text-2xl font-black text-primary-dark uppercase mb-2">Carrousel "La vie du club"</h2>
        <p className="text-foreground/80 font-medium mb-6">
          Ces images s'affichent sur la page publique <strong>/club</strong>. Cliquez sur le X pour en retirer une, ou ajoutez-en depuis la médiathèque.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {carouselImages.map((src, i) => (
            <div key={i} className="relative aspect-[4/3] border-4 border-zinc-200 group">
              <Image src={src} alt={`Image ${i}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
              <button 
                onClick={() => removeImage(i)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white font-black rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform flex items-center justify-center opacity-0 group-hover:opacity-100"
              >
                X
              </button>
            </div>
          ))}
          
          <button 
            className="flex flex-col items-center justify-center gap-2 aspect-[4/3] border-4 border-dashed border-zinc-300 bg-zinc-50 hover:bg-zinc-100 hover:border-primary transition-colors text-zinc-500 hover:text-primary font-bold uppercase text-sm"
            onClick={() => setIsModalOpen(true)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Ajouter
          </button>
        </div>
      </div>
      
      <MediaLibraryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelect={handleAddImage} 
      />
    </div>
  );
}
