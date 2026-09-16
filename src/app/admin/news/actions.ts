"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Security check
async function checkAuth() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");
  if (!adminSession || adminSession.value !== "authenticated") {
    console.error("Auth check failed. Cookies available:", cookieStore.getAll());
    return false;
  }
  return true;
}

export async function getNews() {
  const isAuth = await checkAuth();
  if (!isAuth) return [];
  const adminClient = createAdminClient();
  const { data, error } = await adminClient.from("news").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }
  return data;
}

export async function getNewsById(id: string) {
  const isAuth = await checkAuth();
  if (!isAuth) return null;
  const adminClient = createAdminClient();
  const { data, error } = await adminClient.from("news").select("*").eq("id", id).single();
  if (error) {
    console.error("Error fetching news by id:", error);
    return null;
  }
  return data;
}

export async function createNews(newsData: any) {
  const isAuth = await checkAuth();
  if (!isAuth) return { success: false, error: "Non autorisé" };
  const adminClient = createAdminClient();
  
  // Create a slug from title
  const slug = newsData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  const { error } = await adminClient.from("news").insert({
    title: newsData.title,
    slug: slug + '-' + Date.now().toString().slice(-4), // ensure uniqueness
    content: newsData.content,
    category: newsData.category,
    image_url: newsData.image_url,
    is_featured: newsData.is_featured || false,
    published_at: new Date().toISOString()
  });

  if (error) {
    console.error("Error creating news:", error);
    return { success: false, error: "Erreur lors de la création: " + error.message };
  }

  revalidatePath("/");
  revalidatePath("/actualites");
  return { success: true };
}

export async function updateNews(id: string, newsData: any) {
  const isAuth = await checkAuth();
  if (!isAuth) return { success: false, error: "Non autorisé" };
  const adminClient = createAdminClient();
  
  const { error } = await adminClient.from("news").update({
    title: newsData.title,
    content: newsData.content,
    category: newsData.category,
    image_url: newsData.image_url,
    is_featured: newsData.is_featured || false,
  }).eq("id", id);

  if (error) {
    console.error("Error updating news:", error);
    return { success: false, error: "Erreur lors de la mise à jour: " + error.message };
  }

  revalidatePath("/");
  revalidatePath("/actualites");
  return { success: true };
}

export async function deleteNews(id: string) {
  const isAuth = await checkAuth();
  if (!isAuth) return { success: false, error: "Non autorisé" };
  const adminClient = createAdminClient();
  
  const { error } = await adminClient.from("news").delete().eq("id", id);
  if (error) {
    console.error("Error deleting news:", error);
    return { success: false, error: "Erreur lors de la suppression: " + error.message };
  }

  revalidatePath("/");
  revalidatePath("/actualites");
  return { success: true };
}
