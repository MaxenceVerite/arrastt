"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addComment(newsId: string, content: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Vous devez être connecté pour commenter." };
  }

  if (!content || content.trim().length === 0) {
    return { success: false, error: "Le commentaire ne peut pas être vide." };
  }

  const { error } = await supabase.from("news_comments").insert({
    news_id: newsId,
    user_id: user.id,
    content: content.trim(),
  });

  if (error) {
    console.error("Erreur lors de l'ajout du commentaire:", error);
    return { success: false, error: "Une erreur est survenue lors de l'ajout du commentaire." };
  }

  revalidatePath("/");
  revalidatePath("/actualites/[slug]", "page");
  return { success: true };
}
