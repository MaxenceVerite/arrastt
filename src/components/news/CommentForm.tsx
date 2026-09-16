"use client";

import { useState } from "react";
import { addComment } from "@/app/actualites/actions";

export default function CommentForm({ newsId }: { newsId: string }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError("");

    const result = await addComment(newsId, content);

    if (result.success) {
      setContent("");
    } else {
      setError(result.error || "Une erreur est survenue.");
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 p-6 bg-zinc-50 border-2 border-zinc-200">
      <h3 className="text-xl font-black text-primary-dark uppercase">Laisser un commentaire</h3>
      
      {error && <div className="text-red-500 font-bold bg-red-50 p-3 border border-red-200">{error}</div>}
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Votre commentaire..."
        className="w-full p-4 border-2 border-zinc-300 focus:border-primary focus:outline-none transition-colors font-medium resize-y"
        rows={4}
        disabled={isSubmitting}
      />
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="bg-primary-dark text-white font-black uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(255,226,138,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,226,138,1)] transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Envoi..." : "Publier"}
        </button>
      </div>
    </form>
  );
}
