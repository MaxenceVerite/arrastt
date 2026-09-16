"use server";

import { createAdminClient } from "@/utils/supabase/admin";

export async function getMedias() {
  const supabase = createAdminClient();
  
  try {
    const { data, error } = await supabase.storage.from('medias').list('');
    
    if (error) {
      console.error("Error fetching medias from Supabase:", error);
      return [];
    }

    if (!data) return [];

    return data
      .filter(file => file.name !== '.emptyFolderPlaceholder' && !file.name.startsWith('.'))
      .map(file => {
        const { data: publicUrlData } = supabase.storage.from('medias').getPublicUrl(file.name);
        return {
          name: file.name,
          url: publicUrlData.publicUrl
        };
      });
  } catch (error) {
    console.error("Failed to list medias from Supabase", error);
    return [];
  }
}

export async function uploadMedia(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    return { success: false, error: 'Aucun fichier fourni' };
  }

  const supabase = createAdminClient();
  
  // Clean filename to avoid issues
  const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  
  try {
    const { data, error } = await supabase.storage
      .from('medias')
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error("Error uploading to Supabase Storage", error);
      return { success: false, error: "Erreur lors de l'enregistrement" };
    }

    const { data: publicUrlData } = supabase.storage.from('medias').getPublicUrl(data.path);

    return { success: true, url: publicUrlData.publicUrl };
  } catch (error) {
    console.error("Error saving file to Supabase", error);
    return { success: false, error: "Erreur lors de l'enregistrement" };
  }
}
