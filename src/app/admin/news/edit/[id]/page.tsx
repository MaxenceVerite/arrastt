"use client";

import Link from "next/link";
import { useState } from "react";
import MediaLibraryModal from "@/components/admin/MediaLibraryModal";

export default function AdminNewsEdit({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the news item by params.id from Supabase here
  const [title, setTitle] = useState("Victoire de l'équipe 1");
  const [category, setCategory] = useState("Résultats");
  const [content, setContent] = useState("C'est une belle victoire pour notre équipe première qui s'impose 8-6 lors de cette journée.");
  const [image, setImage] = useState<string | null>("/medias/image_club_arrastt_2.jpg");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectMedia = (url: string) => {
    setImage(url);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black text-primary-dark uppercase">Éditer l'actualité</h1>
        <Link 
          href="/admin/news"
          className="text-primary-dark font-bold hover:underline uppercase"
        >
          Annuler
        </Link>
      </div>

      <form className="bg-white p-8 border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)] flex flex-col gap-6">
        
        <div>
          <label className="block text-sm font-bold text-primary-dark uppercase mb-2">Titre de l'actualité</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 border-2 border-zinc-300 focus:border-primary focus:outline-none transition-colors font-medium" 
            placeholder="Ex: Victoire de l'équipe 1" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-primary-dark uppercase mb-2">Catégorie</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 border-2 border-zinc-300 focus:border-primary focus:outline-none transition-colors font-medium appearance-none bg-white"
            >
              <option>Résultats</option>
              <option>Tournoi</option>
              <option>Vie du club</option>
            </select>
          </div>
          <div>
             <label className="block text-sm font-bold text-primary-dark uppercase mb-2">Image d'illustration</label>
             {image ? (
                <div className="flex items-center gap-4 border-2 border-primary p-2">
                   <img src={image} alt="preview" className="w-16 h-16 object-cover" />
                   <button type="button" onClick={() => setImage(null)} className="text-red-500 font-bold text-sm uppercase hover:underline">Retirer</button>
                </div>
             ) : (
                <button type="button" onClick={() => setIsModalOpen(true)} className="w-full p-4 border-2 border-dashed border-primary text-primary font-bold uppercase hover:bg-primary/5 transition-colors">
                  Choisir dans la Médiathèque
                </button>
             )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-primary-dark uppercase mb-2">Contenu</label>
          <textarea 
            rows={10} 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 border-2 border-zinc-300 focus:border-primary focus:outline-none transition-colors font-medium resize-y" 
            placeholder="Rédigez votre article ici..."
          />
        </div>

        <div className="pt-4 border-t border-zinc-200 flex justify-end">
          <button type="button" className="bg-primary-dark text-white font-black uppercase px-8 py-4 shadow-[4px_4px_0px_0px_rgba(255,226,138,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,226,138,1)] transition-all">
            Enregistrer les modifications
          </button>
        </div>
      </form>

      <MediaLibraryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelect={handleSelectMedia} 
      />
    </div>
  );
}
