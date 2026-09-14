"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { name: "Accueil", href: "/" },
    { name: "La vie du club", href: "/club" },
    { name: "Les équipes", href: "/equipes" },
    { name: "Inscriptions & infos", href: "/inscriptions" },
    { name: "Photos & vidéos", href: "/medias" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8 ml-8 xl:ml-0">
      {links.map((link) => {
        const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
        
        return (
          <Link 
            key={link.name}
            href={link.href} 
            className={`text-sm font-black uppercase transition-all hover:-translate-y-1 ${
              isActive 
                ? "text-accent-yellow border-b-4 border-accent-yellow pb-1" 
                : "text-white hover:text-accent-yellow"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
