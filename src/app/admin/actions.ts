"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Use the admin client to query the admins table securely since it's protected by RLS
  const adminClient = createAdminClient();
  
  const { data: admin, error } = await adminClient
    .from("admins")
    .select("*")
    .eq("email", email)
    .eq("password_hash", password)
    .single();

  if (error || !admin) {
    return { error: "Identifiants incorrects" };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

// ---------------------------
// CMS Actions (Site Content)
// ---------------------------

export async function updateSiteContent(sectionKey: string, content: any) {
  // Check if admin is logged in (security measure on server actions)
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");
  if (!adminSession || adminSession.value !== "authenticated") {
    throw new Error("Non autorisé");
  }

  // Use the admin client to bypass RLS securely from the server
  const adminClient = createAdminClient();
  
  // Upsert the content
  const { error } = await adminClient
    .from("site_content")
    .upsert({ 
      section_key: sectionKey, 
      content: content 
    }, { onConflict: 'section_key' });

  if (error) {
    console.error("Error updating site_content:", error);
    return { success: false, error: "Erreur lors de la sauvegarde" };
  }

  // Purge Vercel cache for all public pages that might use this content
  revalidatePath("/", "layout");

  return { success: true };
}
