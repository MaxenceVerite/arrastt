"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar({ logoutAction }: { logoutAction: () => void }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") return true;
    if (path !== "/admin" && pathname.startsWith(path)) return true;
    return false;
  };

  const navLinkClass = (path: string) => 
    `px-4 py-3 font-bold rounded flex items-center gap-3 transition-colors ${
      isActive(path) ? "bg-white/20 text-accent-yellow" : "hover:bg-white/10"
    }`;

  const subNavLinkClass = (path: string) => 
    `px-4 py-2 font-bold rounded flex items-center gap-3 transition-colors text-sm ml-2 ${
      isActive(path) ? "bg-white/20 text-accent-yellow" : "hover:bg-white/10"
    }`;

  return (
    <aside className="w-64 bg-primary-dark text-white flex flex-col border-r-8 border-accent-yellow flex-shrink-0">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="font-black text-2xl uppercase tracking-tighter block hover:text-accent-yellow transition-colors">
          Admin <span className="text-accent-yellow">TT</span>
        </Link>
        <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-2">Arras Tennis de Table</p>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2">
        <Link href="/admin" className={navLinkClass("/admin")}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          Tableau de bord
        </Link>
        <Link href="/admin/news" className={navLinkClass("/admin/news")}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
          Actualités
        </Link>
        
        <div className="mt-4 mb-2 px-4 text-xs text-white/50 font-bold uppercase tracking-widest">Gérer le site</div>
        <Link href="/admin/site/home" className={subNavLinkClass("/admin/site/home")}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Accueil
        </Link>
        <Link href="/admin/site/club" className={subNavLinkClass("/admin/site/club")}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          La vie du club
        </Link>

        <Link href="/admin/medias" className={navLinkClass("/admin/medias")}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Médiathèque
        </Link>
      </nav>

      <div className="p-4 border-t border-white/10">
        <form action={logoutAction}>
          <button type="submit" className="w-full px-4 py-3 font-bold hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded flex items-center gap-3 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Déconnexion
          </button>
        </form>
        <Link href="/" className="w-full mt-2 px-4 py-3 font-bold hover:bg-white/10 rounded flex items-center gap-3 transition-colors text-white/70" target="_blank">
           Retour au site
        </Link>
      </div>
    </aside>
  );
}
