"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getMedias, uploadMedia } from "./actions";

export default function AdminMedias() {
  const [isUploading, setIsUploading] = useState(false);
  const [medias, setMedias] = useState<{name: string, url: string}[]>([]);
  const [activeTab, setActiveTab] = useState<"image" | "pdf">("image");

  useEffect(() => {
    loadMedias();
  }, []);

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
      if (result.success) {
        await loadMedias();
        alert("Fichier uploadé dans la médiathèque !");
      } else {
        alert(result.error || "Erreur lors de l'upload");
      }
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <h1 className="text-4xl font-black text-primary-dark uppercase">Médiathèque</h1>
          <div className="flex bg-zinc-200 p-1">
            <button 
              className={`px-4 py-2 font-bold text-sm uppercase transition-colors ${activeTab === 'image' ? 'bg-primary text-white shadow-[2px_2px_0px_0px_rgba(24,115,211,1)]' : 'text-zinc-600 hover:text-primary'}`}
              onClick={() => setActiveTab('image')}
            >
              Images
            </button>
            <button 
              className={`px-4 py-2 font-bold text-sm uppercase transition-colors ${activeTab === 'pdf' ? 'bg-primary text-white shadow-[2px_2px_0px_0px_rgba(24,115,211,1)]' : 'text-zinc-600 hover:text-primary'}`}
              onClick={() => setActiveTab('pdf')}
            >
              Documents (PDF)
            </button>
          </div>
        </div>
        <label className="bg-accent-yellow text-primary-dark font-black uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(255,226,138,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,226,138,1)] transition-all cursor-pointer">
          {isUploading ? "Envoi..." : (activeTab === "pdf" ? "Uploader un PDF" : "Uploader une image")}
          <input type="file" className="hidden" accept={activeTab === "pdf" ? "application/pdf" : "image/*"} onChange={handleUpload} disabled={isUploading} />
        </label>
      </div>

      <div className="bg-white p-8 border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)]">
        <p className="text-foreground/80 font-medium mb-8">
          Toutes les images envoyées ici peuvent être réutilisées à l'infini dans vos actualités ou pour modifier le site.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {medias.filter(m => activeTab === 'pdf' ? m.name.toLowerCase().endsWith('.pdf') : !m.name.toLowerCase().endsWith('.pdf')).map((media, idx) => (
            <div key={idx} className="flex flex-col gap-2 group">
              <div className="relative aspect-square border-2 border-zinc-200 overflow-hidden cursor-pointer group-hover:border-primary transition-colors bg-zinc-50">
                {media.name.toLowerCase().endsWith('.pdf') ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-red-500 font-black p-4 text-center">
                    <span className="text-5xl mb-2">PDF</span>
                  </div>
                ) : (
                  <Image src={media.url} alt={media.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>
              <p className="text-xs font-bold text-zinc-500 truncate" title={media.name}>{media.name}</p>
            </div>
          ))}

          {medias.filter(m => activeTab === 'pdf' ? m.name.toLowerCase().endsWith('.pdf') : !m.name.toLowerCase().endsWith('.pdf')).length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-500 font-bold">
              Aucun fichier trouvé dans cette catégorie.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
