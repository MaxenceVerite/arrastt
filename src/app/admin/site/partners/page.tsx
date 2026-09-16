"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { updateSiteContent } from "../../actions";
import MediaLibraryModal from "@/components/admin/MediaLibraryModal";
import { createClient } from "@/utils/supabase/client";

type Partner = {
  id: string;
  title: string;
  image: string;
  description: string;
  url?: string;
};

export default function AdminSitePartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function loadPartners() {
      const { data } = await supabase
        .from("site_content")
        .select("content")
        .eq("section_key", "partners")
        .single();
      
      if (data?.content) {
        setPartners(data.content as Partner[]);
      }
      setIsLoading(false);
    }
    loadPartners();
  }, [supabase]);

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const handleDragEnter = (index: number) => {
    setDragOverItemIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedItemIndex !== null && dragOverItemIndex !== null && draggedItemIndex !== dragOverItemIndex) {
      const newPartners = [...partners];
      const draggedItem = newPartners[draggedItemIndex];
      newPartners.splice(draggedItemIndex, 1);
      newPartners.splice(dragOverItemIndex, 0, draggedItem);
      setPartners(newPartners);
    }
    setDraggedItemIndex(null);
    setDragOverItemIndex(null);
  };

  const handleAddImage = (url: string) => {
    if (editingId) {
      setPartners(prev => prev.map(p => p.id === editingId ? { ...p, image: url } : p));
      setEditingId(null);
    } else {
      const newPartner: Partner = {
        id: crypto.randomUUID(),
        title: "Nouveau Partenaire",
        image: url,
        description: "",
        url: "",
      };
      setPartners(prev => [...prev, newPartner]);
    }
  };

  const removePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  const updatePartner = (id: string, field: keyof Partner, value: string) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateSiteContent('partners', partners);
    
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
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black text-primary-dark uppercase">Gérer les partenaires</h1>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-white font-black uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(24,115,211,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(24,115,211,1)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </div>

      <div className="bg-white p-8 border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)] mb-8">
        <p className="text-foreground/80 font-medium mb-6">
          Ces partenaires s'affichent dans la banderole défilante sur la page d'accueil, et sur la page publique <strong>/partenaires</strong>. 
          Ajoutez un logo depuis la médiathèque pour créer un nouveau partenaire.
        </p>

        <div className="space-y-6">
          {partners.map((partner, index) => (
            <div 
              key={partner.id} 
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`flex flex-col md:flex-row gap-6 p-4 md:pl-12 border-2 relative group transition-colors ${dragOverItemIndex === index ? 'border-primary border-dashed bg-primary/5 scale-[1.02]' : 'border-zinc-200 bg-zinc-50 hover:border-primary/30'}`}
            >
              {/* Poignée de drag & drop */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab text-zinc-400 hover:text-primary opacity-50 group-hover:opacity-100 hidden md:flex items-center justify-center p-2" title="Glisser pour réorganiser">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z" fill="currentColor"/><path d="M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12Z" fill="currentColor"/><path d="M8 18C8 19.1046 7.10457 20 6 20C4.89543 20 4 19.1046 4 18C4 16.8954 4.89543 16 6 16C7.10457 16 8 16.8954 8 18Z" fill="currentColor"/><path d="M20 6C20 7.10457 19.1046 8 18 8C16.8954 8 16 7.10457 16 6C16 4.89543 16.8954 4 18 4C19.1046 4 20 4.89543 20 6Z" fill="currentColor"/><path d="M20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12Z" fill="currentColor"/><path d="M20 18C20 19.1046 19.1046 20 18 20C16.8954 20 16 19.1046 16 18C16 16.8954 16.8954 16 18 16C19.1046 16 20 16.8954 20 18Z" fill="currentColor"/></svg>
              </div>

              <button 
                onClick={() => removePartner(partner.id)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white font-black rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
                title="Supprimer ce partenaire"
              >
                X
              </button>
              
              <div 
                className="relative w-full md:w-48 aspect-[3/2] border-2 border-dashed border-zinc-300 bg-white hover:border-primary cursor-pointer flex-shrink-0"
                onClick={() => {
                  setEditingId(partner.id);
                  setIsModalOpen(true);
                }}
                title="Modifier le logo"
              >
                {partner.image ? (
                  <Image src={partner.image} alt={partner.title} fill className="object-contain p-4" sizes="(max-width: 768px) 100vw, 200px" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                    <span className="text-sm font-bold uppercase">Changer logo</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-4 flex flex-col justify-center">
                <div>
                  <label className="block text-xs font-black uppercase text-zinc-500 mb-1 tracking-wider">Titre du partenaire</label>
                  <input 
                    type="text" 
                    value={partner.title} 
                    onChange={(e) => updatePartner(partner.id, 'title', e.target.value)}
                    className="w-full border-2 border-zinc-300 p-2 font-bold focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Nom de l'entreprise / sponsor"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-zinc-500 mb-1 tracking-wider">Description (optionnelle)</label>
                  <textarea 
                    value={partner.description || ""} 
                    onChange={(e) => updatePartner(partner.id, 'description', e.target.value)}
                    className="w-full border-2 border-zinc-300 p-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                    placeholder="Quelques mots sur ce partenariat..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-zinc-500 mb-1 tracking-wider">Lien web (URL) (optionnel)</label>
                  <input 
                    type="url" 
                    value={partner.url || ""} 
                    onChange={(e) => updatePartner(partner.id, 'url', e.target.value)}
                    className="w-full border-2 border-zinc-300 p-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="https://www.exemple.com"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button 
            className="w-full py-8 border-4 border-dashed border-zinc-300 bg-zinc-50 hover:bg-zinc-100 hover:border-primary transition-colors text-zinc-500 hover:text-primary font-black uppercase text-lg flex flex-col items-center gap-2"
            onClick={() => {
              setEditingId(null);
              setIsModalOpen(true);
            }}
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Ajouter un partenaire
          </button>
        </div>
      </div>
      
      <MediaLibraryModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }} 
        onSelect={handleAddImage} 
      />
    </div>
  );
}
