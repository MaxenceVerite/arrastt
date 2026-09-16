"use client";

import { useState, useEffect } from "react";
import { updateSiteContent } from "../../actions";
import MediaLibraryModal from "@/components/admin/MediaLibraryModal";
import { createClient } from "@/utils/supabase/client";

export type InscriptionDocument = { category: string; title: string; url: string };

export default function AdminSiteInscriptionsCMS() {
  const [documents, setDocuments] = useState<InscriptionDocument[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    async function loadDocs() {
      const { data } = await supabase
        .from('site_content')
        .select('content')
        .eq('section_key', 'inscriptions_documents')
        .single();
        
      if (data && data.content) {
        setDocuments(data.content);
      } else {
        // Fallback mock
        setDocuments([
          { category: "Administratifs", title: "PIÈCES À FOURNIR POUR DEMANDE DE LICENCE 2026-2027", url: "" },
          { category: "Divers", title: "CHARTE DU CLUB", url: "" },
        ]);
      }
      setIsLoading(false);
    }
    loadDocs();
  }, [supabase]);

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileSelect = (url: string) => {
    if (editingIndex !== null) {
      // Modifying existing document
      setDocuments(prev => {
        const newDocs = [...prev];
        newDocs[editingIndex].url = url;
        return newDocs;
      });
      setEditingIndex(null);
    } else {
      // Adding new document
      setDocuments(prev => [...prev, { category: "Administratifs", title: "NOUVEAU DOCUMENT", url }]);
    }
  };

  const handleChange = (index: number, field: keyof InscriptionDocument, value: string) => {
    setDocuments(prev => {
      const newDocs = [...prev];
      newDocs[index] = { ...newDocs[index], [field]: value };
      return newDocs;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateSiteContent('inscriptions_documents', documents);
    
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
        <h1 className="text-4xl font-black text-primary-dark uppercase">Inscriptions</h1>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-white font-black uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(24,115,211,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(24,115,211,1)] transition-all flex items-center gap-2"
        >
          {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </div>

      <div className="bg-white p-8 border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)] mb-8">
        <h2 className="text-2xl font-black text-primary-dark uppercase mb-2">Documents à télécharger</h2>
        <p className="text-foreground/80 font-medium mb-6">
          Gérez ici les documents (PDF) qui sont proposés au téléchargement sur la page publique <strong>/inscriptions</strong>.
        </p>

        <div className="space-y-4 mb-8">
          {documents.map((doc, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border-2 border-zinc-200 bg-zinc-50 items-start md:items-center">
              
              <div className="w-12 h-16 bg-red-600 rounded-sm flex items-center justify-center shrink-0 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-4 h-4 bg-white/30 rounded-bl-sm"></div>
                <span className="text-white font-black text-[10px] uppercase mt-2">PDF</span>
              </div>

              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Fichier</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={doc.url ? doc.url.split('/').pop() : "Aucun fichier"}
                      className="w-full px-3 py-2 border-2 border-zinc-200 bg-zinc-100 focus:outline-none font-bold text-zinc-500 truncate"
                    />
                    <button 
                      onClick={() => {
                        setEditingIndex(i);
                        setIsModalOpen(true);
                      }}
                      className="bg-primary text-white font-bold px-4 py-2 hover:bg-primary-dark transition-colors text-sm uppercase shrink-0 whitespace-nowrap"
                    >
                      Changer
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Titre du document</label>
                  <input
                    type="text"
                    value={doc.title}
                    onChange={(e) => handleChange(i, 'title', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-zinc-200 focus:border-primary focus:outline-none font-bold text-primary-dark"
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Catégorie</label>
                  <select
                    value={doc.category}
                    onChange={(e) => handleChange(i, 'category', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-zinc-200 focus:border-primary focus:outline-none font-bold text-primary-dark"
                  >
                    <option value="Administratifs">Administratifs</option>
                    <option value="Divers">Divers</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0 self-stretch justify-center">
                <button 
                  onClick={() => removeDocument(i)}
                  className="bg-red-500 text-white font-bold px-4 py-2 hover:bg-red-600 transition-colors text-sm uppercase"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="w-full py-4 border-4 border-dashed border-zinc-300 bg-zinc-50 hover:bg-zinc-100 hover:border-primary transition-colors text-zinc-500 hover:text-primary font-bold uppercase flex items-center justify-center gap-2"
          onClick={() => {
            setEditingIndex(null);
            setIsModalOpen(true);
          }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Ajouter un document
        </button>
      </div>
      
      <MediaLibraryModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }} 
        onSelect={handleFileSelect}
        allowedType="pdf" 
      />
    </div>
  );
}
