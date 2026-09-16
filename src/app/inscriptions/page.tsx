import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 60;

export default async function InscriptionsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('site_content')
    .select('content')
    .eq('section_key', 'inscriptions_documents')
    .single();

  const documents = data?.content || [
    { category: "Administratifs", title: "PIÈCES À FOURNIR POUR DEMANDE DE LICENCE 2026-2027", url: "#" },
    { category: "Administratifs", title: "AUTO QUESTIONNAIRE MAJEUR_LICENCE DÉCOUVERTE 2026-2027", url: "#" },
    { category: "Administratifs", title: "DEMANDE DE LICENCE DÉCOUVERTE 2026-2027", url: "#" },
    { category: "Administratifs", title: "FICHE DE RENSEIGNEMENT MINEUR 2026-2027", url: "#" },
    { category: "Administratifs", title: "AUTO QUESTIONNAIRE MINEUR 2026-2027", url: "#" },
    { category: "Administratifs", title: "CERTIFICAT MÉDICAL 2026-2027", url: "#" },
    { category: "Administratifs", title: "ADHÉSION OU RENOUVELLEMENT LICENCE SAISON 2026-2027", url: "#" },
    { category: "Divers", title: "CHARTE DU CLUB", url: "#" }
  ];

  const adminDocs = documents.filter((d: any) => d.category === "Administratifs");
  const diversDocs = documents.filter((d: any) => d.category === "Divers");

  return (
    <div className="flex flex-col w-full bg-zinc-50 overflow-x-hidden min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full bg-primary-dark pt-16 pb-24 border-b-[8px] border-accent-yellow overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            Inscriptions <span className="text-accent-yellow">&</span> Infos
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Toutes les informations pratiques pour rejoindre l'Arras TT : tarifs, horaires d'entraînements et documents à fournir.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Tarifs & Documents */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Tarifs */}
            <div className="bg-white border-4 border-primary p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(24,115,211,1)]">
              <h2 className="text-3xl font-black text-primary-dark uppercase mb-8 flex items-center gap-4">
                <div className="w-4 h-8 bg-accent-yellow"></div>
                Tarifs Saison 2026-2027
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Carte Tarif Loisir */}
                <div className="border-2 border-zinc-200 p-6 hover:border-primary transition-colors flex flex-col h-full">
                  <span className="bg-zinc-200 text-zinc-600 text-xs font-black uppercase tracking-widest px-3 py-1 w-max mb-4">Loisir</span>
                  <h3 className="text-2xl font-black text-primary-dark mb-2">Licence Loisir</h3>
                  <div className="text-4xl font-black text-primary mb-4">80€ <span className="text-lg text-zinc-400 font-bold">/an</span></div>
                  <ul className="space-y-2 mb-8 flex-1">
                    <li className="flex items-center gap-2 font-medium text-zinc-600">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      Accès aux créneaux libres
                    </li>
                    <li className="flex items-center gap-2 font-medium text-zinc-600">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      Prêt de matériel
                    </li>
                    <li className="flex items-center gap-2 font-medium text-zinc-600">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                      Pas de compétition
                    </li>
                  </ul>
                </div>

                {/* Carte Tarif Compétition */}
                <div className="border-4 border-accent-purple p-6 bg-accent-purple/5 flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-4 right-[-35px] bg-accent-yellow text-primary-dark font-black text-xs uppercase py-1 px-10 rotate-45">Populaire</div>
                  <span className="bg-accent-purple text-white text-xs font-black uppercase tracking-widest px-3 py-1 w-max mb-4">Compétition</span>
                  <h3 className="text-2xl font-black text-primary-dark mb-2">Licence Compétition</h3>
                  <div className="text-4xl font-black text-accent-purple mb-4">120€ <span className="text-lg text-zinc-400 font-bold">/an</span></div>
                  <ul className="space-y-2 mb-8 flex-1">
                    <li className="flex items-center gap-2 font-medium text-zinc-600">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      Accès aux créneaux libres & dirigés
                    </li>
                    <li className="flex items-center gap-2 font-medium text-zinc-600">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      Championnat par équipes
                    </li>
                    <li className="flex items-center gap-2 font-medium text-zinc-600">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      Critériums & Tournois
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-zinc-100 border-l-4 border-primary-dark text-sm font-medium text-zinc-600">
                <span className="font-bold text-primary-dark">Réductions :</span> Tarif préférentiel de -15€ pour les étudiants et demandeurs d'emploi. Les pass'sport sont acceptés.
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white border-2 border-zinc-200 p-8 md:p-12">
              <h2 className="text-3xl font-black text-primary-dark uppercase mb-8 flex items-center gap-4">
                <div className="w-4 h-8 bg-accent-purple"></div>
                Documents
              </h2>
              
              <div className="space-y-4">
                {adminDocs.length > 0 && (
                  <>
                    <h3 className="font-bold text-lg text-primary/60 border-b-2 border-zinc-100 pb-2 mb-4">Administratifs</h3>
                    {adminDocs.map((doc: any, idx: number) => (
                      <div key={`admin-${idx}`} className="flex items-center gap-6 p-4 border-2 border-zinc-100 hover:border-primary transition-colors bg-white">
                        <div className="w-12 h-16 bg-red-600 rounded-sm flex items-center justify-center shrink-0 relative overflow-hidden shadow-sm">
                           <div className="absolute top-0 right-0 w-4 h-4 bg-white/30 rounded-bl-sm"></div>
                           <span className="text-white font-black text-[10px] uppercase mt-2">PDF</span>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                          <h4 className="font-bold text-sm text-primary-dark">{doc.title}</h4>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-xs font-black text-primary-dark bg-accent-yellow px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(10,45,108,0.2)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(10,45,108,0.2)] transition-all">Télécharger le document</a>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {diversDocs.length > 0 && (
                  <>
                    <h3 className="font-bold text-lg text-primary/60 border-b-2 border-zinc-100 pb-2 mt-8 mb-4">Divers</h3>
                    {diversDocs.map((doc: any, idx: number) => (
                      <div key={`divers-${idx}`} className="flex items-center gap-6 p-4 border-2 border-zinc-100 hover:border-primary transition-colors bg-white">
                        <div className="w-12 h-16 bg-red-600 rounded-sm flex items-center justify-center shrink-0 relative overflow-hidden shadow-sm">
                           <div className="absolute top-0 right-0 w-4 h-4 bg-white/30 rounded-bl-sm"></div>
                           <span className="text-white font-black text-[10px] uppercase mt-2">PDF</span>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                          <h4 className="font-bold text-sm text-primary-dark">{doc.title}</h4>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-xs font-black text-primary-dark bg-accent-yellow px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(10,45,108,0.2)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(10,45,108,0.2)] transition-all">Télécharger le document</a>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT: Horaires & Contact */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Horaires */}
            <div className="bg-black border-4 border-black text-white p-8 shadow-[8px_8px_0px_0px_rgba(255,226,138,1)] sticky top-32">
              <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3 text-accent-yellow">
                Horaires
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg border-b-2 border-zinc-800 pb-2 mb-3">Entraînement Dirigé</h4>
                  <ul className="space-y-2 text-sm font-medium text-zinc-300">
                    <li className="flex justify-between"><span className="text-white">Mardi</span> <span>18h30 - 20h30</span></li>
                    <li className="flex justify-between"><span className="text-white">Jeudi</span> <span>18h30 - 20h30</span></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg border-b-2 border-zinc-800 pb-2 mb-3">Jeu Libre</h4>
                  <ul className="space-y-2 text-sm font-medium text-zinc-300">
                    <li className="flex justify-between"><span className="text-white">Mercredi</span> <span>14h00 - 17h00</span></li>
                    <li className="flex justify-between"><span className="text-white">Vendredi</span> <span>14h00 - 17h00</span></li>
                  </ul>
                </div>
                
                <div className="pt-4 border-t-2 border-zinc-800">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Lieu</p>
                  <p className="font-bold">Salle Vandamme</p>
                  <p className="text-sm text-zinc-400">Rue de la République, 62000 Arras</p>
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </section>
      
    </div>
  );
}
