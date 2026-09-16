"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import MediaLibraryModal from "@/components/admin/MediaLibraryModal";
import { getNewsById, updateNews } from "../actions";
import { useRouter } from "next/navigation";

export default function AdminNewsEdit({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("results");
  const [content, setContent] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const newsItem = await getNewsById(params.id);
        if (newsItem) {
          setTitle(newsItem.title);
          setCategory(newsItem.category);
          setContent(newsItem.content);
          setImage(newsItem.image_url);
          setIsFeatured(newsItem.is_featured);
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    }
    load();
  }, [params.id]);

  const handleSelectMedia = (url: string) => {
    setImage(url);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("Le titre et le contenu sont requis");
    
    setIsSaving(true);
    const result = await updateNews(params.id, { title, category, content, image_url: image, is_featured: isFeatured });
    if (result.success) {
      router.push("/admin/news");
    } else {
      alert(result.error);
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center font-bold">Chargement...</div>;

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

      <form onSubmit={handleSave} className="bg-white p-8 border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)] flex flex-col gap-6">
        
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

        <div className="flex items-center gap-3 bg-zinc-50 p-4 border-2 border-zinc-200">
          <input 
            type="checkbox" 
            id="isFeatured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="w-6 h-6 accent-accent-yellow cursor-pointer"
          />
          <label htmlFor="isFeatured" className="font-bold text-primary-dark uppercase cursor-pointer flex items-center gap-2">
            Mettre "À la une" <span className="text-accent-yellow text-xl">★</span>
          </label>
          <p className="text-sm text-zinc-500 font-medium ml-4">Cette actualité s'affichera en premier sur la page d'accueil.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-primary-dark uppercase mb-2">Catégorie</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 border-2 border-zinc-300 focus:border-primary focus:outline-none transition-colors font-medium appearance-none bg-white"
            >
              <option value="results">Résultats</option>
              <option value="tournament">Tournoi</option>
              <option value="general">Vie du club</option>
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
          <button type="submit" disabled={isSaving} className="bg-primary-dark text-white font-black uppercase px-8 py-4 shadow-[4px_4px_0px_0px_rgba(255,226,138,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,226,138,1)] transition-all disabled:opacity-50">
            {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
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
