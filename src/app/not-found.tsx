import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-zinc-50 p-4">
      <div className="border-8 border-primary-dark p-12 text-center bg-white shadow-[16px_16px_0px_0px_rgba(168,80,155,1)] max-w-2xl">
        <h1 className="text-8xl font-black text-primary mb-4 tracking-tighter">404</h1>
        <h2 className="text-3xl font-black text-primary-dark uppercase mb-6">Page introuvable</h2>
        <p className="text-lg text-zinc-600 font-medium mb-8">
          La balle est sortie de la table ! La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-accent-yellow text-primary-dark font-black uppercase px-8 py-4 shadow-[6px_6px_0px_0px_rgba(24,115,211,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(24,115,211,1)] transition-all"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
