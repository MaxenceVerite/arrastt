import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import NavLinks from './NavLinks';

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const firstName = user?.user_metadata?.first_name;

  return (
    <header className="sticky top-0 z-50 w-full border-b-[4px] border-accent-yellow bg-primary-dark shadow-xl">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-16 w-40 bg-white rounded-br-3xl rounded-tl-3xl shadow-lg transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105 p-2">
            <Image
              src="/logo_arras_tt.png"
              alt="Logo ArrasTT"
              fill
              sizes="(max-width: 768px) 150px, 200px"
              className="object-contain p-1"
              priority
            />
          </div>
        </Link>
        
        {/* Navigation - Client Component for active state */}
        <NavLinks />

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link 
                href="/espace-joueur" 
                className="bg-accent-yellow text-primary-dark font-black uppercase px-6 py-2 shadow-[4px_4px_0px_0px_rgba(10,45,108,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(10,45,108,1)] transition-all flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                {firstName ? `Espace de ${firstName}` : "Espace Joueur"}
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="bg-white border-2 border-primary-dark text-primary-dark font-black uppercase px-6 py-2 shadow-[4px_4px_0px_0px_rgba(10,45,108,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(10,45,108,1)] transition-all"
              >
                Connexion
              </Link>
            )}
          </div>
          <button className="lg:hidden text-accent-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
