import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Nos Partenaires | Arras TT",
  description: "Découvrez les partenaires qui soutiennent Arras Tennis de Table.",
};

type Partner = {
  id: string;
  title: string;
  image: string;
  description: string;
  url?: string;
};

export default async function PartenairesPage() {
  const supabase = await createClient();

  // Fetch partners
  const { data } = await supabase
    .from("site_content")
    .select("content")
    .eq("section_key", "partners")
    .single();

  const partners: Partner[] = data?.content ? (data.content as Partner[]) : [];

  return (
    <div className="min-h-screen bg-zinc-50 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-12 border-l-8 border-primary pl-6">
          <h1 className="text-4xl md:text-5xl font-black text-primary-dark uppercase tracking-tighter">
            Nos <span className="text-primary">Partenaires</span>
          </h1>
          <p className="mt-4 text-xl text-zinc-600 font-medium max-w-2xl">
            Ils nous font confiance et nous soutiennent dans notre développement et notre passion pour le tennis de table.
          </p>
        </div>

        {partners.length === 0 ? (
          <div className="bg-white p-12 text-center border-4 border-zinc-200">
            <p className="text-xl text-zinc-500 font-bold">Bientôt de nouveaux partenaires à découvrir ici.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => {
              const CardWrapper = partner.url ? 'a' : 'div';
              const wrapperProps = partner.url ? { href: partner.url, target: "_blank", rel: "noopener noreferrer" } : {};
              
              return (
              <CardWrapper 
                {...wrapperProps}
                key={partner.id} 
                id={`partner-${partner.id}`}
                className={`bg-white border-4 border-zinc-100 transition-colors shadow-sm group scroll-mt-32 flex flex-col ${partner.url ? 'hover:border-primary/50 cursor-pointer' : 'hover:border-primary/50'}`}
              >
                {/* Image container */}
                <div className="aspect-[3/2] relative p-8 border-b-2 border-zinc-100 bg-white flex items-center justify-center group-hover:bg-zinc-50 transition-colors">
                  {partner.image ? (
                    <Image 
                      src={partner.image} 
                      alt={`Logo ${partner.title}`} 
                      fill 
                      className="object-contain p-6 transition-all duration-300 group-hover:scale-105" 
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-100 flex items-center justify-center font-black text-zinc-300 uppercase tracking-widest text-2xl group-hover:bg-zinc-200 transition-colors">
                      {partner.title}
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-primary-dark uppercase mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {partner.title}
                  </h3>
                  
                  {partner.description && (
                    <p className="text-zinc-600 font-medium line-clamp-4 mt-auto">
                      {partner.description}
                    </p>
                  )}

                  {partner.url && (
                    <div className="mt-4 pt-4 border-t-2 border-zinc-100 text-primary font-black uppercase text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      Visiter le site web <span className="text-lg">→</span>
                    </div>
                  )}
                </div>
              </CardWrapper>
            )})}
          </div>
        )}
        
        {/* Call to action */}
        <div className="mt-20 bg-primary-dark p-8 md:p-12 text-center text-white border-b-8 border-accent-yellow">
          <h2 className="text-3xl font-black uppercase mb-4">Devenir Partenaire ?</h2>
          <p className="text-lg text-white/80 font-medium max-w-2xl mx-auto mb-8">
            Vous souhaitez associer l'image de votre entreprise à Arras TT et soutenir nos projets sportifs ?
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-accent-yellow text-primary-dark font-black uppercase px-8 py-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all"
          >
            Contactez-nous
          </Link>
        </div>
      </div>
    </div>
  );
}
