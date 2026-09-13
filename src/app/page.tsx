import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden">
      <Script src="https://platform.twitter.com/widgets.js" strategy="afterInteractive" />
      
      {/* Brutalist Hero Section */}
      <section className="relative w-full border-b-[8px] border-primary">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[70vh]">
          {/* Text Content */}
          <div className="lg:col-span-7 bg-primary-dark p-8 md:p-16 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple opacity-20 blur-3xl"></div>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter mb-6">
              Arras <span className="text-accent-yellow">TT</span>
              <br/>
              <span className="text-primary text-5xl md:text-7xl block mt-2">Le Ping Sans Limite</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-medium max-w-xl border-l-4 border-accent-purple pl-6 py-2 mb-8">
              Bienvenue sur le site internet du club de tennis de table d'Arras. <br/>
              Plus de 100 licencié(e)s, 10 équipes en compétition, et une passion commune.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/inscriptions" className="bg-accent-yellow text-primary-dark font-black uppercase px-8 py-4 shadow-[6px_6px_0px_0px_rgba(24,115,211,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(24,115,211,1)] transition-all">
                Rejoindre le club
              </Link>
              <Link href="/actualites" className="bg-transparent border-4 border-white text-white font-black uppercase px-8 py-4 hover:bg-white hover:text-primary-dark transition-colors">
                À la une
              </Link>
            </div>
          </div>
          
          {/* Featured Image/Shape area */}
          <div className="lg:col-span-5 bg-zinc-100 relative min-h-[400px] flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent-purple opacity-10"></div>
            {/* Racket Shape Abstraction */}
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute top-10 left-10 w-full h-full bg-accent-yellow rounded-full mix-blend-multiply animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-full h-full bg-primary rounded-full mix-blend-multiply"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white rounded-3xl shadow-2xl p-4 flex flex-col justify-center items-center text-center rotate-3">
                <h3 className="font-black text-2xl text-primary-dark uppercase mb-2">Entraînements</h3>
                <p className="font-bold text-accent-purple">Saison 2026-2027</p>
                <div className="mt-4 text-sm font-medium text-left space-y-2 text-primary-dark/80">
                  <p><span className="font-bold text-primary-dark">Mar & Jeu :</span> 18h30 - 20h30 (Dirigé)</p>
                  <p><span className="font-bold text-primary-dark">Mer & Ven :</span> 14h - 17h / Libre</p>
                </div>
                <div className="mt-4 bg-primary-dark text-white text-xs font-bold px-4 py-2 rounded">
                  Salle Vandamme
                </div>
              </div>
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
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-12 bg-accent-yellow"></div>
                <h2 className="text-4xl font-black text-primary-dark uppercase">À La Une</h2>
              </div>
              
              <div className="bg-white border-2 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)] group overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2 bg-zinc-200 aspect-video md:aspect-auto relative border-b-2 md:border-b-0 md:border-r-2 border-primary-dark">
                  {/* Image placeholder */}
                  <div className="absolute inset-0 bg-primary/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                    <span className="font-black text-3xl text-primary-dark rotate-[-5deg]">Nouveau Planning</span>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center bg-white">
                  <span className="inline-block bg-accent-purple text-white text-xs font-bold px-3 py-1 uppercase tracking-widest w-max mb-4">Annonce</span>
                  <h3 className="text-2xl font-black text-primary-dark leading-tight mb-4 group-hover:text-primary transition-colors">Changements d'horaires pour les jeunes</h3>
                  <p className="text-foreground/70 font-medium mb-6">L'entraînement du lundi passe au mardi, à 19h au lieu de 18h30. Merci de prendre note de ces modifications pour la saison.</p>
                  <Link href="/actualites/planning" className="font-bold text-primary flex items-center gap-2 hover:gap-4 transition-all">
                    Lire la suite <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* DERNIÈRES NEWS (Grid) */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-4 h-12 bg-primary"></div>
                <h2 className="text-4xl font-black text-primary-dark uppercase">Dernières News</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Fermeture Salle Vandamme", cat: "Infos", date: "il y a 2 mois", color: "bg-primary" },
                  { title: "Résultats Championnat de France", cat: "Résultats", date: "il y a 2 mois", color: "bg-accent-purple" },
                  { title: "Classement équipes 2e phase", cat: "Équipes", date: "il y a 2 mois", color: "bg-accent-yellow" },
                  { title: "Tournoi Achicourt", cat: "Tournoi", date: "il y a 3 mois", color: "bg-primary-dark" }
                ].map((news, i) => (
                  <div key={i} className="border-2 border-zinc-200 hover:border-primary transition-colors p-4 flex gap-4 bg-white">
                    <div className={`w-24 h-24 ${news.color} flex-shrink-0 flex items-center justify-center p-2 text-center`}>
                       <span className="text-white text-xs font-black rotate-[-10deg]">{news.cat}</span>
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <h4 className="font-bold text-primary-dark leading-snug hover:text-primary cursor-pointer">{news.title}</h4>
                      <span className="text-xs font-bold text-zinc-400 uppercase">{news.date}</span>
                    </div>
                  </div>
                ))}
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

            {/* PROCHAINS EVENEMENTS */}
            <div className="border-2 border-zinc-200 bg-zinc-50 p-6">
              <h3 className="font-black uppercase text-xl mb-6 text-primary-dark border-b-2 border-accent-yellow pb-2">Prochains Événements</h3>
              <div className="py-8 text-center text-zinc-500 font-medium italic">
                Aucun événement à afficher pour le moment.
              </div>
            </div>

            {/* CALENDRIER */}
            <div className="border-2 border-primary bg-white p-6">
              <h3 className="font-black uppercase text-xl mb-6 text-primary-dark flex justify-between items-center">
                Calendrier
                <span className="text-primary text-sm font-bold bg-primary/10 px-2 py-1 rounded">Sept 2026</span>
              </h3>
              {/* Fake Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2 font-bold text-zinc-400">
                <div>Lu</div><div>Ma</div><div>Me</div><div>Je</div><div>Ve</div><div>Sa</div><div>Di</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                <div className="p-2 text-zinc-300">31</div>
                {[1,2,3,4].map(d => <div key={d} className="p-2">{d}</div>)}
                <div className="p-2 bg-primary text-white font-bold">5</div>
                <div className="p-2 bg-primary text-white font-bold">6</div>
                {[7,8,9,10,11,12].map(d => <div key={d} className="p-2">{d}</div>)}
                <div className="p-2 border-2 border-accent-purple text-accent-purple font-bold">13</div>
                {[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(d => <div key={d} className="p-2">{d}</div>)}
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
          {/* Inner scrolling track (duplicated content for seamless loop) */}
          <div className="animate-marquee flex whitespace-nowrap items-center w-[200%]">
            {[1, 2].map((loop) => (
              <div key={loop} className="flex items-center justify-around w-1/2 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 gap-16 px-8">
                <div className="font-black text-3xl tracking-tighter">VILLE D'ARRAS</div>
                <div className="font-black text-2xl italic text-primary">SPORTSREGIONS</div>
                <div className="font-black text-2xl text-accent-purple">PAS-DE-CALAIS</div>
                <div className="font-black text-2xl uppercase border-2 border-black px-4 py-1">Service Civique</div>
                <div className="font-black text-3xl tracking-wider text-zinc-400">CORA</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
