import Image from "next/image";
import Link from "next/link";

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "Article";
  const decodedSlug = decodeURIComponent(slug);

  // Mock data for the article. In a real app, fetch from Supabase based on slug
  const article = {
    title: decodedSlug.replace(/-/g, " "),
    category: "Club",
    date: "14 Septembre 2026",
    content: `
      C'est une excellente nouvelle pour le club, les efforts portent leurs fruits ! Lors du dernier rassemblement, nos équipes ont montré une détermination sans faille. 
      <br/><br/>
      Dès le début de la compétition, l'ambiance était électrique. Les joueurs se sont surpassés, soutenus par un public toujours aussi fervent. Nous remercions particulièrement les coachs qui ont fait un travail formidable tout au long de la semaine pour préparer physiquement et mentalement nos compétiteurs.
      <br/><br/>
      La suite de la saison s'annonce prometteuse. Restez connectés pour suivre les prochains résultats, et n'oubliez pas de venir encourager l'équipe 1 le week-end prochain à la Salle Vandamme !
    `,
    image: "/medias/image_club_arrastt_1.jpg",
  };

  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden min-h-screen">
      
      {/* Hero Header for Article */}
      <section className="relative w-full border-b-[8px] border-primary min-h-[40vh] bg-primary-dark overflow-hidden flex items-center">
        
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-yellow opacity-10 blur-3xl rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-12 flex flex-col md:flex-row gap-8 items-center">
          
          <div className="md:w-2/3 flex flex-col gap-4">
             <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white">
                <Link href="/" className="hover:text-accent-yellow transition-colors">Accueil</Link>
                <span className="text-zinc-500">/</span>
                <span className="bg-primary/20 text-primary px-3 py-1">{article.category}</span>
                <span className="text-zinc-400">{article.date}</span>
             </div>
             
             <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-lg capitalize">
               {article.title}
             </h1>
          </div>
          
        </div>
      </section>

      {/* Main Article Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          {/* Main Image */}
          <div className="w-full aspect-[21/9] relative border-4 border-primary-dark shadow-[12px_12px_0px_0px_rgba(255,226,138,1)] overflow-hidden">
             <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          {/* Text Content */}
          <div 
            className="text-lg font-medium text-foreground/80 leading-relaxed [&>br]:mb-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Call to action / Footer of article */}
          <div className="border-t-4 border-zinc-200 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-4">
               <span className="font-bold text-primary-dark uppercase">Partager :</span>
               <button className="w-10 h-10 bg-primary-dark text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors">f</button>
               <button className="w-10 h-10 bg-primary-dark text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors">X</button>
             </div>
             <Link href="/#actualites" className="font-black text-primary uppercase hover:underline">
               ← Retour aux actualités
             </Link>
          </div>

        </div>
      </section>
      
    </div>
  );
}
