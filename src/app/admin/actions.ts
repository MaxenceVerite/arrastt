"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = createClient();
  
  const { data: admin, error } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .eq("password_hash", password)
    .single();

  if (error || !admin) {
    return { error: "Identifiants incorrects" };
  }

  cookies().set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  cookies().delete("admin_session");
  redirect("/admin/login");
}

// ---------------------------
// CMS Actions (Site Content)
// ---------------------------

export async function updateSiteContent(sectionKey: string, content: any) {
  // Check if admin is logged in (security measure on server actions)
  const adminSession = cookies().get("admin_session");
  if (!adminSession || adminSession.value !== "authenticated") {
    throw new Error("Non autorisé");
  }

  const supabase = createClient();
  
  // Upsert the content
  const { error } = await supabase
    .from("site_content")
    .upsert({ 
      section_key: sectionKey, 
      content: content 
    }, { onConflict: 'section_key' });

  if (error) {
    console.error("Error updating site_content:", error);
    return { success: false, error: "Erreur lors de la sauvegarde" };
  }

  return { success: true };
}
