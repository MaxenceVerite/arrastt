"use client";

import { useState } from "react";
import Image from "next/image";

export default function AdminMedias() {
  const [isUploading, setIsUploading] = useState(false);
  
  // Dummy data representing files in Supabase Storage bucket 'medias'
  const [medias, setMedias] = useState([
    { name: "devanture_salle_vandamme.jpg", url: "/medias/devanture_salle_vandamme.jpg" },
    { name: "image_club_arrastt_1.jpg", url: "/medias/image_club_arrastt_1.jpg" },
    { name: "image_club_arrastt_2.jpg", url: "/medias/image_club_arrastt_2.jpg" },
    { name: "image_club_arrastt_3.jpg", url: "/medias/image_club_arrastt_3.jpg" },
    { name: "image_club_arrastt_4.jpg", url: "/medias/image_club_arrastt_4.jpg" },
  ]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, upload to Supabase storage here
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      setTimeout(() => {
        alert("Fichier uploadé dans la médiathèque !");
        setIsUploading(false);
      }, 1000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black text-primary-dark uppercase">Médiathèque</h1>
        <label className="bg-accent-yellow text-primary-dark font-black uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(255,226,138,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,226,138,1)] transition-all cursor-pointer">
          {isUploading ? "Envoi..." : "Uploader une image"}
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
        </label>
      </div>

      <div className="bg-white p-8 border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)]">
        <p className="text-foreground/80 font-medium mb-8">
          Toutes les images envoyées ici peuvent être réutilisées à l'infini dans vos actualités ou pour modifier le site.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {medias.map((media, idx) => (
            <div key={idx} className="flex flex-col gap-2 group">
              <div className="relative aspect-square border-2 border-zinc-200 overflow-hidden cursor-pointer group-hover:border-primary transition-colors">
                <Image src={media.url} alt={media.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="text-xs font-bold text-zinc-500 truncate" title={media.name}>{media.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
