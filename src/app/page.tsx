import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { createPublicClient } from "@/utils/supabase/server";

export const revalidate = 3600;

export default async function Home() {
  const supabase = createPublicClient();
  const { data: matches } = await supabase.from('team_matches').select('*, teams(name)').order('match_date', { ascending: false });
  
  const { data: partnersData } = await supabase.from("site_content").select("content").eq("section_key", "partners").single();
  const partners = partnersData?.content ? (partnersData.content as any[]) : [];
  
  const now = new Date();
  const recentMatches = matches?.filter(m => m.match_date && new Date(m.match_date) < now).slice(0, 5) || [];
  const upcomingHomeMatches = matches?.filter(m => m.match_date && new Date(m.match_date) >= now && m.is_home).sort((a, b) => new Date(a.match_date).getTime() - new Date(b.match_date).getTime()).slice(0, 5) || [];

  const { data: allNews } = await supabase
    .from('news')
    .select('*, news_comments(count)')
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false });

  const featuredNews = allNews && allNews.length > 0 ? allNews[0] : null;
  const remainingNews = allNews && allNews.length > 1 ? allNews.slice(1, 6) : [];

  const formatCategory = (cat: string) => {
    switch (cat) {
      case 'results': return 'Résultats';
      case 'tournament': return 'Tournoi';
      case 'general': return 'Vie du club';
      default: return cat;
    }
  };

  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden">
      <Script src="https://platform.twitter.com/widgets.js" strategy="afterInteractive" />
      
      {/* Brutalist Hero Section with Full Background Video */}
      <section className="relative w-full border-b-[8px] border-primary min-h-[70vh] flex items-center overflow-hidden">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            src="/medias/video_fond_presentation.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay: Solid blue on left, fading to transparent on right. Darker on mobile for text readability. */}
          <div className="absolute inset-0 bg-primary-dark/80 md:bg-gradient-to-r md:from-primary-dark md:via-primary-dark/80 md:to-primary-dark/20"></div>
        </div>

        {/* Text Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent-purple opacity-30 blur-3xl rounded-full pointer-events-none"></div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter mb-6 relative drop-shadow-xl">
              Arras <span className="text-accent-yellow">TT</span>
              <br/>
              <span className="text-blue-400 text-5xl md:text-7xl block mt-2">Tennis de Table</span>
            </h1>
            
            <p className="text-white text-lg md:text-xl font-medium max-w-xl border-l-4 border-accent-purple pl-6 py-2 mb-10 relative drop-shadow-md">
              Bienvenue sur le site internet du club de tennis de table d'Arras. <br/>
              Plus de 100 licencié(e)s, 10 équipes en compétition, et une passion commune.
            </p>
            
            <div className="flex flex-wrap gap-6 relative">
              <Link href="/inscriptions" className="bg-accent-yellow text-primary-dark font-black uppercase px-8 py-4 shadow-[6px_6px_0px_0px_rgba(24,115,211,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(24,115,211,1)] transition-all">
                Rejoindre le club
              </Link>
              <Link href="#actualites" className="bg-transparent border-4 border-white text-white font-black uppercase px-8 py-4 hover:bg-white hover:text-primary-dark transition-colors backdrop-blur-sm">
                À la une
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid (Split layout like the original site but modern) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Main News & Info */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* A LA UNE */}
            {featuredNews && (
            <div id="actualites">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-12 bg-accent-yellow"></div>
                <h2 className="text-4xl font-black text-primary-dark uppercase">À La Une</h2>
              </div>
              
              <div className="bg-white border-2 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)] group overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2 bg-zinc-200 aspect-video md:aspect-auto relative border-b-2 md:border-b-0 md:border-r-2 border-primary-dark">
                  {featuredNews.image_url ? (
                    <Image src={featuredNews.image_url} alt={featuredNews.title} fill className="object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-primary/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                        <span className="font-black text-3xl text-primary-dark rotate-[-5deg]">{featuredNews.title}</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center bg-white relative">
                  {featuredNews.is_featured && (
                    <div className="absolute top-4 right-4 text-accent-yellow text-4xl" title="À la une">★</div>
                  )}
                  <span className="inline-block bg-accent-purple text-white text-xs font-bold px-3 py-1 uppercase tracking-widest w-max mb-4">
                    {formatCategory(featuredNews.category)}
                  </span>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-zinc-500 text-sm font-bold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                      {featuredNews.news_comments?.[0]?.count || 0}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-primary-dark leading-tight mb-4 group-hover:text-primary transition-colors">
                    {featuredNews.title}
                  </h3>
                  <p className="text-foreground/70 font-medium mb-6 line-clamp-3">
                    {featuredNews.content}
                  </p>
                  <Link href={`/actualites/${featuredNews.slug}`} className="font-bold text-primary flex items-center gap-2 hover:gap-4 transition-all">
                    Lire la suite <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
            )}

            {/* FIL D'ACTUALITÉS COMPLET */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-12 bg-primary"></div>
                <h2 className="text-4xl font-black text-primary-dark uppercase">Fil d'actualités</h2>
              </div>
              
              <div className="flex flex-col gap-6">
                {remainingNews.map((news) => (
                  <div key={news.id} className="border-l-8 border-primary bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col md:flex-row gap-6 relative">
                     {news.is_featured && (
                        <div className="absolute top-2 right-2 text-accent-yellow text-2xl" title="À la une">★</div>
                     )}
                     <div className="md:w-32 flex-shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-zinc-100 pb-4 md:pb-0 md:pr-4">
                        <span className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2">{new Date(news.published_at).toLocaleDateString('fr-FR')}</span>
                        <span className="bg-primary/10 text-primary-dark font-black text-xs uppercase px-3 py-1 inline-block mb-3">{formatCategory(news.category)}</span>
                        <div className="flex items-center gap-1 text-zinc-500 text-xs font-bold">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                          {news.news_comments?.[0]?.count || 0}
                        </div>
                     </div>
                     <div className="flex-grow">
                        <h3 className="text-xl font-black text-primary-dark mb-2 leading-tight hover:text-primary transition-colors cursor-pointer pr-6">
                          <Link href={`/actualites/${news.slug}`}>{news.title}</Link>
                        </h3>
                        <p className="text-foreground/80 font-medium mb-4 line-clamp-2">{news.content}</p>
                        <Link href={`/actualites/${news.slug}`} className="font-black text-primary flex items-center gap-2 hover:gap-4 transition-all uppercase text-xs tracking-wider">
                          Lire la suite <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                     </div>
                  </div>
                ))}
                {remainingNews.length === 0 && !featuredNews && (
                  <div className="p-8 text-center bg-white border-2 border-zinc-200">
                    <p className="text-zinc-500 font-bold">Aucune actualité pour le moment.</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center mt-8">
                <button className="bg-primary-dark text-white font-black uppercase px-8 py-4 shadow-[4px_4px_0px_0px_rgba(168,80,155,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(168,80,155,1)] transition-all">
                  Charger plus d'actualités
                </button>
              </div>
            </div>
            
          </div>

          {/* RIGHT COLUMN: Sidebar (Calendar, Events, FB, X) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* FACEBOOK & X (TWITTER) WIDGETS */}
            <div className="flex flex-col gap-6">
              {/* FACEBOOK */}
              <div className="border-4 border-primary-dark bg-primary-dark text-white p-6 shadow-[6px_6px_0px_0px_rgba(255,226,138,1)]">
                <h3 className="font-black uppercase text-xl mb-4 text-accent-yellow flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </h3>
                <div className="bg-white rounded overflow-hidden flex justify-center w-full py-4">
                  <iframe 
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FArrasTT&tabs=timeline&width=340&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" 
                    width="340" 
                    height="400" 
                    style={{ border: 'none', overflow: 'hidden', maxWidth: '100%' }} 
                    scrolling="no" 
                    frameBorder="0" 
                    allowFullScreen={true} 
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                  </iframe>
                </div>
              </div>

              {/* X (TWITTER) */}
              <div className="border-4 border-black bg-black text-white p-6 shadow-[6px_6px_0px_0px_rgba(168,80,155,1)]">
                <h3 className="font-black uppercase text-xl mb-4 text-white flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X (Twitter)
                </h3>
                <div className="bg-white rounded overflow-hidden">
                   <a className="twitter-timeline" data-height="400" data-theme="light" href="https://twitter.com/arras_tt?ref_src=twsrc%5Etfw">Tweets by @arras_tt</a> 
                </div>
              </div>
            </div>

            {/* PROCHAINS MATCHS A DOMICILE */}
            <div className="border-2 border-zinc-200 bg-zinc-50 p-6">
              <h3 className="font-black uppercase text-xl mb-6 text-primary-dark border-b-2 border-accent-yellow pb-2 flex items-center gap-2">
                <svg className="w-6 h-6 text-accent-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Prochains Matchs à Domicile
              </h3>
              <div className="flex flex-col gap-4">
                {upcomingHomeMatches.map(match => (
                  <div key={match.id} className="border-l-4 border-accent-yellow pl-4 flex flex-col gap-1">
                    <span className="text-xs font-bold text-zinc-500 uppercase">
                      {new Date(match.match_date).toLocaleDateString('fr-FR')} - {(match.teams as any)?.name}
                    </span>
                    <span className="font-black text-primary-dark">Arras TT reçoit {match.opponent_name}</span>
                  </div>
                ))}
                {upcomingHomeMatches.length === 0 && (
                  <div className="py-4 text-zinc-500 font-medium italic">Aucun match à domicile prévu prochainement.</div>
                )}
              </div>
            </div>

            {/* DERNIERS RESULTATS */}
            <div className="border-2 border-primary bg-white p-6">
              <h3 className="font-black uppercase text-xl mb-6 text-primary-dark flex justify-between items-center border-b-2 border-primary pb-2">
                Derniers Résultats
              </h3>
              <div className="flex flex-col gap-4">
                {recentMatches.map(match => (
                  <div key={match.id} className="flex justify-between items-center border-b border-zinc-100 pb-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-500 uppercase">{(match.teams as any)?.name}</span>
                      <span className="font-black text-primary-dark truncate max-w-[180px]">vs {match.opponent_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {match.score_arras !== null && match.score_opponent !== null ? (
                        <div className="flex items-center gap-1 font-black">
                          <span className={match.result === 'victory' ? 'text-green-600' : ''}>{match.score_arras}</span>
                          <span className="text-zinc-300">-</span>
                          <span className={match.result === 'defeat' ? 'text-red-600' : ''}>{match.score_opponent}</span>
                        </div>
                      ) : (
                        <span className="text-zinc-400 font-bold text-xs italic">N/A</span>
                      )}
                    </div>
                  </div>
                ))}
                {recentMatches.length === 0 && (
                  <div className="py-4 text-zinc-500 font-medium italic">Aucun résultat récent.</div>
                )}
              </div>
              <div className="mt-6 text-center">
                 <Link href="/equipe" className="text-primary font-black uppercase text-sm hover:underline">Voir tout le sportif</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PARTENAIRES (Marquee style) */}
      <section className="bg-white py-12 border-t-[8px] border-primary-dark overflow-hidden">
        <div className="w-full flex justify-center mb-8">
          <span className="bg-primary-dark text-white font-black text-xs uppercase tracking-widest px-4 py-1">
            Ils nous soutiennent
          </span>
        </div>
        
        {/* Infinite Marquee Container */}
        <div className="relative flex w-full overflow-hidden whitespace-nowrap">
          {partners.length > 0 && (
            <div className="animate-marquee flex whitespace-nowrap items-center w-[200%]">
              {[1, 2].map((loop) => (
                <div key={loop} className="flex items-center justify-around w-1/2 gap-16 px-8">
                  {partners.map((partner) => (
                    <Link 
                      key={partner.id} 
                      href={`/partenaires#partner-${partner.id}`}
                      className="opacity-60 hover:opacity-100 transition-all duration-300 flex items-center justify-center relative h-16 w-32"
                    >
                      {partner.image ? (
                        <Image src={partner.image} alt={partner.title} fill className="object-contain" sizes="128px" />
                      ) : (
                        <div className="font-black text-xl tracking-tighter truncate w-full text-center">{partner.title}</div>
                      )}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
