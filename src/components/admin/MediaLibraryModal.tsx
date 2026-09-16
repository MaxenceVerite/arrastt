"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getMedias, uploadMedia } from "@/app/admin/medias/actions";

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  allowedType?: "all" | "image" | "pdf";
}

export default function MediaLibraryModal({ isOpen, onClose, onSelect, allowedType = "all" }: MediaLibraryModalProps) {
  const [medias, setMedias] = useState<{name: string, url: string}[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"image" | "pdf">("image");

  useEffect(() => {
    if (isOpen) {
      if (allowedType === "pdf") setActiveTab("pdf");
      else if (allowedType === "image") setActiveTab("image");
      
      loadMedias();
    }
  }, [isOpen, allowedType]);

  const loadMedias = async () => {
    const fetched = await getMedias();
    setMedias(fetched);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      
      const result = await uploadMedia(formData);
      if (result.success && result.url) {
        await loadMedias();
        onSelect(result.url);
        onClose();
      } else {
        alert(result.error || "Erreur lors de l'upload");
      }
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col border-4 border-primary-dark shadow-[12px_12px_0px_0px_rgba(255,226,138,1)] overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-4 border-primary-dark bg-zinc-50 flex-wrap gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <h2 className="text-2xl font-black text-primary-dark uppercase">Médiathèque</h2>
            {allowedType === "all" && (
              <div className="flex bg-zinc-200 p-1">
                <button 
                  className={`px-4 py-1 font-bold text-sm uppercase transition-colors ${activeTab === 'image' ? 'bg-primary text-white shadow-sm' : 'text-zinc-600 hover:text-primary'}`}
                  onClick={() => setActiveTab('image')}
                >
                  Images
                </button>
                <button 
                  className={`px-4 py-1 font-bold text-sm uppercase transition-colors ${activeTab === 'pdf' ? 'bg-primary text-white shadow-sm' : 'text-zinc-600 hover:text-primary'}`}
                  onClick={() => setActiveTab('pdf')}
                >
                  Documents
                </button>
              </div>
            )}
          </div>
          <button onClick={onClose} className="text-primary-dark hover:text-red-500 font-black text-xl">X</button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {medias.filter(m => activeTab === 'pdf' ? m.name.toLowerCase().endsWith('.pdf') : !m.name.toLowerCase().endsWith('.pdf')).map((media, idx) => (
              <div 
                key={idx} 
                className="group relative aspect-square border-4 border-transparent hover:border-primary cursor-pointer transition-colors bg-zinc-100"
                onClick={() => {
                  onSelect(media.url);
                  onClose();
                }}
              >
                {media.name.toLowerCase().endsWith('.pdf') ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 text-red-500 font-black p-4 text-center">
                    <span className="text-4xl mb-2">PDF</span>
                    <span className="text-xs truncate w-full px-2">{media.name}</span>
                  </div>
                ) : (
                  <Image src={media.url} alt={media.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                )}
                <div className="absolute inset-0 bg-primary/80 text-white font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-center px-2">
                  Sélectionner
                </div>
              </div>
            ))}
            
            {medias.filter(m => activeTab === 'pdf' ? m.name.toLowerCase().endsWith('.pdf') : !m.name.toLowerCase().endsWith('.pdf')).length === 0 && (
              <div className="col-span-full py-12 text-center text-zinc-500 font-bold">
                Aucun fichier trouvé dans cette catégorie.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t-4 border-primary-dark bg-zinc-50 flex justify-between items-center flex-wrap gap-4">
           <p className="text-sm font-bold text-zinc-500">Cliquez sur une image pour l'ajouter</p>
           <div className="flex items-center gap-4">
             <label className="bg-primary text-white font-bold uppercase px-4 py-2 hover:bg-primary-dark transition-colors cursor-pointer text-sm disabled:opacity-50 whitespace-nowrap">
               {isUploading ? "Upload en cours..." : (activeTab === "pdf" ? "Uploader un PDF" : "Uploader une image")}
               <input type="file" className="hidden" accept={activeTab === "pdf" ? "application/pdf" : "image/*"} onChange={handleUpload} disabled={isUploading} />
             </label>
             <button onClick={onClose} className="bg-zinc-200 text-zinc-700 font-bold uppercase px-6 py-2 hover:bg-zinc-300 transition-colors">Annuler</button>
           </div>
        </div>
      </div>
    </div>
  );
}
