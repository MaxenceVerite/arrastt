import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8 border-t border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="flex flex-col items-start gap-4">
            <div className="relative h-16 w-40 bg-white rounded-xl p-2 shadow-md">
              <Image
                src="/logo_arras_tt.png"
                alt="Logo ArrasTT"
                fill
                sizes="150px"
                className="object-contain p-2"
              />
            </div>
            <p className="text-white/70 text-sm max-w-xs mt-4">
              Club de Tennis de Table d'Arras. Rejoignez-nous pour partager la passion du ping, de la compétition au loisir.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-black uppercase text-white mb-4 border-b-2 border-zinc-800 pb-2">Navigation</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link href="/" className="hover:text-accent-yellow transition-colors">Accueil</Link></li>
              <li><Link href="/club" className="hover:text-accent-yellow transition-colors">Le Club</Link></li>
              <li><Link href="/saison" className="hover:text-accent-yellow transition-colors">La Saison</Link></li>
              <li><Link href="/joueurs" className="hover:text-accent-yellow transition-colors">Les Joueurs</Link></li>
              <li><Link href="/inscriptions" className="hover:text-accent-yellow transition-colors">Inscriptions</Link></li>
              <li><Link href="/medias" className="hover:text-accent-yellow transition-colors">Médias</Link></li>
              <li><Link href="/contact" className="hover:text-accent-yellow transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-accent-yellow">Contact</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Salle de Tennis de Table<br />Complexe Sportif, Arras</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:contact@arrastt.fr" className="hover:text-white transition-colors">contact@arrastt.fr</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Arras TT. Tous droits réservés.</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/partenaires" className="hover:text-white transition-colors">Partenaires</Link>
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link href="/cgu" className="hover:text-white transition-colors">CGU</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
