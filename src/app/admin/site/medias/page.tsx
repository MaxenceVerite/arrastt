"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { updateSiteContent } from "../../actions";
import MediaLibraryModal from "@/components/admin/MediaLibraryModal";
import { createClient } from "@/utils/supabase/client";

export type MediaItem = { url: string; caption: string };

export default function AdminSiteMediasCMS() {
  const [carouselImages, setCarouselImages] = useState<MediaItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function loadMedias() {
      const { data } = await supabase
        .from('site_content')
        .select('content')
        .eq('section_key', 'medias_page_images')
        .single();
        
      if (data && data.content) {
        // Convert old string format to new object format if needed
        const formattedData = data.content.map((item: any) => 
          typeof item === 'string' ? { url: item, caption: "" } : item
        );
        setCarouselImages(formattedData);
      } else {
        // Fallback mock if nothing exists
        setCarouselImages([
          { url: "/medias/devanture_salle_vandamme.jpg", caption: "" },
          { url: "/medias/image_club_arrastt_1.jpg", caption: "" },
          { url: "/medias/image_club_arrastt_2.jpg", caption: "" },
          { url: "/medias/image_club_arrastt_3.jpg", caption: "" },
          { url: "/medias/image_club_arrastt_4.jpg", caption: "" }
        ]);
      }
      setIsLoading(false);
    }
    loadMedias();
  }, [supabase]);

  const removeImage = (index: number) => {
    setCarouselImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddImage = (url: string) => {
    setCarouselImages(prev => [...prev, { url, caption: "" }]);
  };

  const handleCaptionChange = (index: number, newCaption: string) => {
    setCarouselImages(prev => {
      const newImages = [...prev];
      newImages[index].caption = newCaption;
      return newImages;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateSiteContent('medias_page_images', carouselImages);
    
    if (result.success) {
      alert("Modifications enregistrées. Le site public a été mis à jour !");
    } else {
      alert(result.error || "Une erreur est survenue");
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return <div className="p-8 text-center font-bold">Chargement...</div>;
  }

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
        <h2 className="text-2xl font-black text-primary-dark uppercase mb-2">Images "Médias"</h2>
        <p className="text-foreground/80 font-medium mb-6">
          Ces images s'affichent sur la page publique <strong>/medias</strong>. Cliquez sur le X pour en retirer une, ou ajoutez-en depuis la médiathèque. L'ordre défini ici sera respecté sur la page.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {carouselImages.map((item, i) => (
            <div key={i} className="flex flex-col gap-2 relative group">
              <div className="relative aspect-[4/3] border-4 border-zinc-200">
                <Image src={item.url} alt={`Image ${i}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                <button 
                  onClick={() => removeImage(i)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white font-black rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
                >
                  X
                </button>
              </div>
              <input
                type="text"
                placeholder="Légende de l'image..."
                value={item.caption}
                onChange={(e) => handleCaptionChange(i, e.target.value)}
                className="w-full px-3 py-2 border-2 border-zinc-200 focus:border-primary focus:outline-none text-sm font-medium"
              />
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
        allowedType="image" 
      />
    </div>
  );
}
