import { createClient } from "@/utils/supabase/server";
import MediasGallery from "./MediasGallery";

export const revalidate = 60; // Revalidate every minute

export default async function MediasPage() {
  const supabase = await createClient();
  
  // Fetch media from CMS (site_content)
  const { data: mediaContent } = await supabase
    .from('site_content')
    .select('content')
    .eq('section_key', 'medias_page_images')
    .single();

  const mediasUrls = mediaContent?.content || [];

  return (
    <div className="flex flex-col w-full bg-zinc-50 overflow-x-hidden min-h-screen">
      
      {/* Header Section */}
      <section className="relative w-full bg-primary-dark pt-16 pb-24 border-b-[8px] border-accent-purple overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full z-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-accent-yellow rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-primary rounded-full blur-3xl mix-blend-screen"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            Photos <span className="text-accent-purple">&</span> Vidéos
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Revivez les meilleurs moments du club : compétitions, entraînements, et événements de l'Arras TT.
          </p>
        </div>
      </section>

      <MediasGallery mediasUrls={mediasUrls} />
      
    </div>
  );
}
