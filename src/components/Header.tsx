import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[4px] border-accent-yellow bg-primary-dark shadow-xl">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-16 w-40 bg-white rounded-br-3xl rounded-tl-3xl shadow-lg transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105 p-2">
            <Image
              src="/logo_arras_tt.png"
              alt="Logo ArrasTT"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold uppercase tracking-wider text-white">
          <Link href="/" className="hover:text-accent-yellow hover:-translate-y-1 transition-all">Accueil</Link>
          <Link href="/club" className="hover:text-accent-yellow hover:-translate-y-1 transition-all">La vie du club</Link>
          <Link href="/equipes" className="hover:text-accent-yellow hover:-translate-y-1 transition-all">Les équipes</Link>
          <Link href="/inscriptions" className="hover:text-accent-yellow hover:-translate-y-1 transition-all">Inscriptions & Infos</Link>
          <Link href="/evenements" className="hover:text-accent-yellow hover:-translate-y-1 transition-all text-accent-yellow">Vide-Grenier</Link>
          <Link href="/medias" className="hover:text-accent-yellow hover:-translate-y-1 transition-all">Photos & Vidéos</Link>
          <Link href="/contact" className="hover:text-accent-yellow hover:-translate-y-1 transition-all">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link 
            href="/espace-joueur" 
            className="hidden md:inline-flex items-center justify-center bg-accent-purple px-6 py-3 text-sm font-black uppercase text-white shadow-[4px_4px_0px_0px_rgba(255,226,138,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,226,138,1)]"
          >
            Espace Joueur
          </Link>
          <button className="lg:hidden text-accent-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
