"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { usePathname } from "next/navigation";

export default function ClientHeader({ user, firstName }: { user: any, firstName: string | undefined }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Accueil", href: "/" },
    { name: "Le Planning", href: "/planning" },
    { name: "La vie du club", href: "/club" },
    { name: "Les équipes", href: "/equipes" },
    { name: "Inscriptions & infos", href: "/inscriptions" },
    { name: "Photos & vidéos", href: "/medias" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-[4px] border-accent-yellow bg-primary-dark shadow-xl overflow-hidden relative">
        <div className="container mx-auto flex h-28 items-center justify-between px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="relative flex items-center h-full ml-4 md:ml-8">
            {/* Le fond biseauté forme maintenant un parallélogramme centré sur le logo */}
            <div className="absolute top-0 bottom-0 left-[-15px] right-[-15px] bg-white transform -skew-x-[20deg] z-0 border-r-[6px] border-l-[6px] border-accent-purple shadow-[8px_0px_0px_0px_rgba(255,226,138,1)]"></div>
            
            <Link href="/" className="relative flex items-center gap-4 group z-10 h-full py-2">
              <div className="relative h-20 w-48 md:h-24 md:w-56 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo_arras_tt.png"
                alt="Logo ArrasTT"
                fill
                sizes="(max-width: 768px) 200px, 250px"
                className="object-contain"
                priority
              />
            </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <NavLinks />

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <Link 
                  href="/espace-joueur" 
                  className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-primary-dark font-bold uppercase transition-colors border-2 border-white/20 hover:border-white"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  {firstName ? `Espace de ${firstName}` : "Espace Joueur"}
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-primary-dark font-bold uppercase transition-colors border-2 border-white/20 hover:border-white"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                  Connexion
                </Link>
              )}
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="lg:hidden text-accent-yellow hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-24 z-40 bg-primary-dark/95 backdrop-blur-md lg:hidden flex flex-col items-center pt-8 overflow-y-auto border-t-2 border-accent-yellow">
          <nav className="flex flex-col gap-6 items-center w-full px-6">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
              return (
                <Link 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-black uppercase tracking-wider w-full text-center py-4 border-b-2 ${
                    isActive ? "text-accent-yellow border-accent-yellow" : "text-white border-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="mt-8 w-full">
              {user ? (
                <Link 
                  href="/espace-joueur" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-accent-yellow w-full flex justify-center items-center gap-3 text-primary-dark font-black uppercase px-6 py-4 shadow-[6px_6px_0px_0px_rgba(10,45,108,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(10,45,108,1)] transition-all"
                >
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  {firstName ? `Espace de ${firstName}` : "Espace Joueur"}
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-white w-full flex justify-center text-primary-dark font-black uppercase px-6 py-4 shadow-[6px_6px_0px_0px_rgba(10,45,108,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(10,45,108,1)] transition-all"
                >
                  Connexion
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
