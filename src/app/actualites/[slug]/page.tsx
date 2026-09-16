import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import CommentForm from "@/components/news/CommentForm";

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const decodedSlug = decodeURIComponent(slug);

  const supabase = await createClient();
  
  // Fetch news
  const { data: article } = await supabase
    .from("news")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (!article) {
    notFound();
  }

  // Fetch comments
  const { data: comments } = await supabase
    .from("news_comments")
    .select("*, profiles(first_name, last_name)")
    .eq("news_id", article.id)
    .order("created_at", { ascending: true });

  const { data: { user } } = await supabase.auth.getUser();

  const formatCategory = (cat: string) => {
    switch (cat) {
      case 'results': return 'Résultats';
      case 'tournament': return 'Tournoi';
      case 'general': return 'Vie du club';
      default: return cat;
    }
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
                <span className="bg-primary/20 text-primary px-3 py-1">{formatCategory(article.category)}</span>
                <span className="text-zinc-400">{new Date(article.published_at).toLocaleDateString('fr-FR')}</span>
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
          {article.image_url && (
            <div className="w-full aspect-[21/9] relative border-4 border-primary-dark shadow-[12px_12px_0px_0px_rgba(255,226,138,1)] overflow-hidden">
               <Image src={article.image_url} alt={article.title} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            </div>
          )}

          {/* Text Content */}
          <div 
            className="text-lg font-medium text-foreground/80 leading-relaxed [&>br]:mb-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Comments Section */}
          <div className="mt-12 pt-8 border-t-4 border-zinc-200">
            <h2 className="text-3xl font-black text-primary-dark uppercase mb-8">Commentaires ({comments?.length || 0})</h2>
            
            <div className="flex flex-col gap-6">
              {comments?.map((comment) => (
                <div key={comment.id} className="bg-white p-6 border-2 border-zinc-100 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <span className="font-bold text-primary-dark uppercase">
                      {(comment.profiles as any)?.first_name} {(comment.profiles as any)?.last_name}
                    </span>
                    <span className="text-xs font-bold text-zinc-400">
                      {new Date(comment.created_at).toLocaleDateString('fr-FR')} à {new Date(comment.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-foreground/80 font-medium whitespace-pre-wrap mt-2">{comment.content}</p>
                </div>
              ))}
              {comments?.length === 0 && (
                <p className="text-zinc-500 font-medium italic">Aucun commentaire pour le moment. Soyez le premier !</p>
              )}
            </div>

            {user ? (
              <CommentForm newsId={article.id} />
            ) : (
              <div className="mt-8 p-6 bg-zinc-50 border-2 border-zinc-200 text-center flex flex-col items-center gap-4">
                <p className="font-bold text-primary-dark uppercase">Veuillez vous connecter pour laisser un commentaire.</p>
                <Link href="/login" className="bg-accent-yellow text-primary-dark font-black uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(24,115,211,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(24,115,211,1)] transition-all">
                  Se connecter
                </Link>
              </div>
            )}
          </div>

        </div>
      </section>
      
    </div>
  );
}
