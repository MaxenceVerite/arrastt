"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getNews, deleteNews } from "./actions";

export default function AdminNewsList() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatCategory = (cat: string) => {
    switch (cat) {
      case 'results': return 'Résultats';
      case 'tournament': return 'Tournoi';
      case 'general': return 'Vie du club';
      default: return cat;
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const data = await getNews();
      setNewsList(data || []);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")) {
      const res = await deleteNews(id);
      if (res.success) {
        setNewsList(newsList.filter(news => news.id !== id));
      } else {
        alert(res.error);
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center font-bold">Chargement...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black text-primary-dark uppercase">Actualités</h1>
        <Link 
          href="/admin/news/create"
          className="bg-accent-yellow text-primary-dark font-black uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(255,226,138,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,226,138,1)] transition-all"
        >
          Créer une actualité
        </Link>
      </div>

      <div className="bg-white border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)]">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-100 border-b-4 border-primary-dark uppercase text-sm font-black text-primary-dark">
              <th className="p-4">Titre</th>
              <th className="p-4">Catégorie</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-zinc-500 font-bold">Aucune actualité trouvée.</td>
              </tr>
            )}
            {newsList.map((news) => (
              <tr key={news.id} className="border-b border-zinc-200 hover:bg-zinc-50 font-medium">
                <td className="p-4 text-primary-dark font-bold">
                  {news.is_featured && <span className="text-accent-yellow mr-2" title="À la une">★</span>}
                  {news.title}
                </td>
                <td className="p-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 text-xs font-black uppercase">{formatCategory(news.category)}</span>
                </td>
                <td className="p-4 text-zinc-500">{new Date(news.published_at).toLocaleDateString("fr-FR")}</td>
                <td className="p-4 text-right space-x-2">
                  <Link href={`/admin/news/edit/${news.id}`} className="text-blue-500 font-bold hover:underline">Éditer</Link>
                  <button onClick={() => handleDelete(news.id)} className="text-red-500 font-bold hover:underline ml-2">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
