import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import ClubCarousel from "./ClubCarousel";
import { createPublicClient } from "@/utils/supabase/server";

export const revalidate = 3600;

export default async function ClubPage() {
  const supabase = createPublicClient();
  const { data: clubInfo } = await supabase.from('club_info').select('*').single();
  
  // Fetch club carousel images
  const { data: clubCarouselData } = await supabase
    .from('site_content')
    .select('content')
    .eq('section_key', 'club_carousel')
    .single();
    
  const carouselImages = clubCarouselData?.content || [];

  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden">
      <Script src="https://platform.twitter.com/widgets.js" strategy="afterInteractive" />

      {/* Hero Section */}
      <section className="relative w-full bg-primary-dark border-b-[8px] border-accent-yellow py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
            Le <span className="text-accent-yellow">Club</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto font-medium">
            Découvrez l'histoire, les installations et les personnes qui font battre le cœur d'Arras TT au quotidien.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-primary/20 rounded-full blur-3xl mix-blend-screen transform -rotate-12"></div>
        </div>
      </section>

      {/* Main Layout: Left (Info & News) / Right (Socials) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: History, Bureau, News */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            
            {/* Histoire & Valeurs & Localisation */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-12 bg-primary"></div>
                <h2 className="text-4xl font-black text-primary-dark uppercase">Le Club</h2>
              </div>
              <div className="prose prose-lg prose-zinc max-w-none text-foreground/80 font-medium leading-relaxed mb-8">
                <p>
                  Fondé avec la passion du ping, l'<strong>{clubInfo?.nom || 'Arras Tennis de Table'}</strong> s'est imposé comme l'un des clubs majeurs de la région. De la formation des plus jeunes à notre équipe fanion, nous cultivons le dépassement de soi dans un esprit de franche camaraderie.
                </p>
                <p>
                  Notre salle spécifique, la <strong>{clubInfo?.nomsalle || 'Salle Vandamme'}</strong>, nous permet de vous accueillir tous les jours dans des conditions de jeu optimales.
                </p>
              </div>

              {clubInfo && (
                <div className="bg-zinc-50 border-2 border-zinc-200 p-6 flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h3 className="font-black text-xl text-primary-dark uppercase mb-4 border-b-2 border-accent-yellow pb-2 inline-block">Localisation</h3>
                    <p className="font-bold text-foreground/80">
                      {clubInfo.adressesalle1}<br/>
                      {clubInfo.adressesalle2 && <>{clubInfo.adressesalle2}<br/></>}
                      {clubInfo.codepsalle} {clubInfo.villesalle}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-xl text-primary-dark uppercase mb-4 border-b-2 border-accent-purple pb-2 inline-block">Contact FFTT</h3>
                    <p className="font-bold text-foreground/80">
                      {clubInfo.prenomcor} {clubInfo.nomcor}<br/>
                      <a href={`mailto:${clubInfo.mailcor}`} className="text-primary hover:underline">{clubInfo.mailcor}</a><br/>
                      <a href={`tel:${clubInfo.telcor}`} className="text-primary hover:underline">{clubInfo.telcor}</a>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Le Bureau */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-12 bg-accent-purple"></div>
                <h2 className="text-4xl font-black text-primary-dark uppercase">Le Bureau</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { role: "PRÉSIDENTE", name: "ELISE DECHERF" },
                  { role: "VICE-PRÉSIDENT", name: "FREDERIC MERCIER" },
                  { role: "VICE-PRÉSIDENT", name: "HERVE RYCZKO" },
                  { role: "VICE-PRÉSIDENTE", name: "SABRINA VIGNIER DIT VIGNY" },
                  { role: "TRÉSORIER", name: "GEORGES LAMBECQ" },
                  { role: "SECRÉTAIRE", name: "ERIC OLIVIER" },
                ].map((member, i) => (
                  <div key={i} className="bg-white border-2 border-zinc-200 p-6 flex flex-col items-center text-center hover:border-accent-purple transition-colors shadow-sm">
                    <div className="w-20 h-20 bg-zinc-200 rounded-full mb-4 flex items-center justify-center text-zinc-400">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <h3 className="font-bold text-lg text-primary-dark">{member.name}</h3>
                    <p className="text-accent-purple font-black text-sm uppercase">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Social Feeds */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <h3 className="text-2xl font-black text-primary-dark uppercase border-b-2 border-zinc-200 pb-2">Suivez-nous</h3>
            
            <div className="flex flex-col gap-8 sticky top-32">
              {/* FACEBOOK */}
              <div className="border-4 border-primary-dark bg-primary-dark text-white p-4 shadow-[6px_6px_0px_0px_rgba(24,115,211,1)]">
                <h4 className="font-black uppercase text-lg mb-4 text-accent-yellow flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </h4>
                <div className="bg-white rounded overflow-hidden flex justify-center">
                  <iframe 
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FArrasTT&tabs=timeline&width=340&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" 
                    width="340" 
                    height="400" 
                    style={{ border: 'none', overflow: 'hidden' }} 
                    scrolling="no" 
                    frameBorder="0" 
                    allowFullScreen={true} 
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                  </iframe>
                </div>
              </div>

              {/* X (TWITTER) */}
              <div className="border-4 border-black bg-black text-white p-4 shadow-[6px_6px_0px_0px_rgba(168,80,155,1)]">
                <h4 className="font-black uppercase text-lg mb-4 text-white flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X (Twitter)
                </h4>
                <div className="bg-white rounded overflow-hidden">
                   <a className="twitter-timeline" data-height="400" data-theme="light" href="https://twitter.com/arras_tt?ref_src=twsrc%5Etfw">Tweets by @arras_tt</a> 
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* UX Friendly Carousel Component (Client Side) */}
      <ClubCarousel images={carouselImages} />
      
      {/* Hide scrollbar styles embedded for convenience */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
