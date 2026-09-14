export default function Confidentialite() {
  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden min-h-screen">
      <section className="relative w-full border-b-[8px] border-primary py-24 bg-primary-dark overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-purple opacity-20 blur-3xl rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-lg">
            Politique de <br/><span className="text-accent-yellow">Confidentialité</span>
          </h1>
          <p className="text-white text-lg md:text-xl font-medium max-w-2xl mx-auto border-b-4 border-accent-purple inline-block pb-2">
            Gestion et protection de vos données personnelles
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-5xl">
        <div className="bg-white border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(168,80,155,1)] p-8 md:p-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="flex flex-col gap-4">
              <div className="bg-primary/10 p-4 w-max rounded-lg">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h2 className="text-2xl font-black text-primary-dark uppercase">Collecte des données</h2>
              <p className="text-foreground/80 font-medium">Dans le cadre de l'utilisation de notre site, notamment via l'espace joueur ou le formulaire de contact, nous sommes amenés à collecter certaines données : nom, prénom, adresse e-mail, numéro de licence, historique de matchs et de classements.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-accent-purple/10 p-4 w-max rounded-lg">
                <svg className="w-8 h-8 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h2 className="text-2xl font-black text-primary-dark uppercase">Utilisation et Protection</h2>
              <p className="text-foreground/80 font-medium">Vos données sont utilisées exclusivement pour la gestion de votre profil joueur, la communication interne au club et les nécessités liées aux compétitions de la Fédération Française de Tennis de Table (FFTT). Nous nous engageons à ne jamais vendre ou transmettre vos données à des fins commerciales.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-accent-yellow/20 p-4 w-max rounded-lg">
                <svg className="w-8 h-8 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
              </div>
              <h2 className="text-2xl font-black text-primary-dark uppercase">Vos droits</h2>
              <p className="text-foreground/80 font-medium">Conformément à la réglementation européenne (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données personnelles.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-black/5 p-4 w-max rounded-lg">
                <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h2 className="text-2xl font-black text-primary-dark uppercase">Contact DPO</h2>
              <p className="text-foreground/80 font-medium">Pour exercer vos droits ou pour toute question relative au traitement de vos données, vous pouvez nous contacter directement par email à l'adresse <strong>contact@arrastt.fr</strong> en joignant une copie de votre pièce d'identité.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
