import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full border-b-[8px] border-primary py-24 bg-primary-dark overflow-hidden flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple opacity-20 blur-3xl rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-yellow opacity-10 blur-3xl rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-lg">
            Nous <span className="text-accent-yellow">Contacter</span>
          </h1>
          <p className="text-white text-lg md:text-xl font-medium max-w-2xl mx-auto border-b-4 border-accent-purple inline-block pb-2">
            Une question ? Envie de nous rejoindre ? N'hésitez pas à nous écrire ou à venir nous voir directement à la salle.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Contact Infos & Form */}
          <div className="flex flex-col gap-10">
            {/* Contact Details */}
            <div className="bg-white border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)] p-8 md:p-10 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-accent-yellow border-4 border-primary-dark rotate-12 group-hover:rotate-45 transition-transform duration-300"></div>
              
              <h2 className="text-3xl font-black text-primary-dark uppercase mb-8 border-l-8 border-primary pl-4">Coordonnées</h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary-dark">Adresse</h3>
                    <p className="text-foreground/80 font-medium mt-1">
                      Salle Vandamme<br/>
                      Rue Camille Corot<br/>
                      62000 Arras
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent-purple/10 p-3 rounded-lg text-accent-purple">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary-dark">Email</h3>
                    <a href="mailto:contact@arrastt.fr" className="text-primary hover:text-accent-purple font-medium mt-1 inline-block transition-colors">
                      contact@arrastt.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent-yellow/20 p-3 rounded-lg text-primary-dark">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary-dark">Téléphone</h3>
                    <a href="tel:+33000000000" className="text-foreground/80 hover:text-primary font-medium mt-1 inline-block transition-colors">
                      06 XX XX XX XX
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick message form (optional visualization) */}
            <div className="bg-zinc-50 border-2 border-zinc-200 p-8 md:p-10">
              <h2 className="text-2xl font-black text-primary-dark uppercase mb-6">Envoyer un message</h2>
              <form className="flex flex-col gap-4">
                <input type="text" placeholder="Votre nom" className="p-4 border-2 border-zinc-300 focus:border-primary focus:outline-none transition-colors" />
                <input type="email" placeholder="Votre email" className="p-4 border-2 border-zinc-300 focus:border-primary focus:outline-none transition-colors" />
                <textarea rows={4} placeholder="Votre message" className="p-4 border-2 border-zinc-300 focus:border-primary focus:outline-none transition-colors resize-none"></textarea>
                <button type="button" className="bg-primary-dark text-white font-black uppercase py-4 shadow-[4px_4px_0px_0px_rgba(255,226,138,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,226,138,1)] transition-all mt-2">
                  Envoyer
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Google Maps & Image */}
          <div className="flex flex-col gap-10">
            {/* Google Maps Embed */}
            <div className="border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(168,80,155,1)] overflow-hidden bg-white group">
              <h2 className="text-3xl font-black text-primary-dark uppercase m-8 border-l-8 border-accent-purple pl-4">Nous trouver</h2>
              <div className="relative w-full aspect-video bg-zinc-200">
                <iframe 
                  src="https://maps.google.com/maps?q=Salle+Vandamme,+rue+Camille+Corot,+Arras,+France&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 transition-all duration-500"
                ></iframe>
              </div>
            </div>

            {/* Salle Photo */}
            <div className="relative w-full aspect-video border-4 border-white shadow-xl overflow-hidden group">
              <Image 
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/medias/devanture_salle_vandamme.jpg`} 
                alt="Devanture Salle Vandamme" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-black text-white uppercase drop-shadow-md">
                  Salle Vandamme
                </h3>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
