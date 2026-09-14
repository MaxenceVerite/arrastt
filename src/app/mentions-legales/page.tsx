export default function MentionsLegales() {
  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden min-h-screen">
      <section className="relative w-full border-b-[8px] border-primary py-24 bg-primary-dark overflow-hidden flex items-center justify-center">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-yellow opacity-20 blur-3xl rounded-full pointer-events-none transform translate-x-1/2 translate-y-1/2"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-lg">
            Mentions <span className="text-accent-yellow">Légales</span>
          </h1>
          <p className="text-white text-lg md:text-xl font-medium max-w-2xl mx-auto border-b-4 border-accent-purple inline-block pb-2">
            Informations légales concernant l'éditeur du site
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-4xl">
        <div className="bg-white border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)] p-8 md:p-12 flex flex-col gap-10">
          
          <div className="border-l-8 border-accent-yellow pl-6">
            <h2 className="text-2xl font-black text-primary-dark uppercase mb-4">Éditeur du site</h2>
            <div className="text-foreground/80 font-medium space-y-2">
              <p>Le site <strong>Arras TT</strong> est édité par l'association sportive Arras Tennis de Table.</p>
              <p><strong>Siège social :</strong> Salle Vandamme, Rue Camille Corot, 62000 Arras, France.</p>
              <p><strong>Email :</strong> contact@arrastt.fr</p>
              <p><strong>Association loi 1901</strong>, déclarée à la préfecture du Pas-de-Calais.</p>
            </div>
          </div>

          <div className="border-l-8 border-primary pl-6">
            <h2 className="text-2xl font-black text-primary-dark uppercase mb-4">Directeur de la publication</h2>
            <div className="text-foreground/80 font-medium space-y-2">
              <p><strong>Directeur de la publication :</strong> Le Bureau Directeur d'Arras TT.</p>
              <p>Ce site a été conçu et développé pour répondre aux besoins d'information et de gestion sportive du club.</p>
            </div>
          </div>

          <div className="border-l-8 border-accent-purple pl-6">
            <h2 className="text-2xl font-black text-primary-dark uppercase mb-4">Hébergement</h2>
            <div className="text-foreground/80 font-medium space-y-2">
              <p>Le site est hébergé par <strong>Vercel Inc.</strong></p>
              <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
              <p><strong>Contact hébergeur :</strong> privacy@vercel.com</p>
            </div>
          </div>

          <div className="bg-zinc-50 border-2 border-zinc-200 p-6 mt-4 text-sm text-foreground/70 font-medium text-center italic">
            Pour toute demande de retrait de contenu ou de droit de réponse, merci de nous contacter à l'adresse email indiquée ci-dessus.
          </div>

        </div>
      </section>
    </div>
  );
}
