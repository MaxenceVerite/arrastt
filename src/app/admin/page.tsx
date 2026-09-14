export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-black text-primary-dark uppercase mb-8">Tableau de Bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 border-4 border-primary-dark shadow-[4px_4px_0px_0px_rgba(255,226,138,1)]">
          <h3 className="font-bold text-zinc-500 uppercase text-sm mb-2">Actualités</h3>
          <p className="text-4xl font-black text-primary-dark">2</p>
        </div>
        <div className="bg-white p-6 border-4 border-primary-dark shadow-[4px_4px_0px_0px_rgba(168,80,155,1)]">
          <h3 className="font-bold text-zinc-500 uppercase text-sm mb-2">Médias</h3>
          <p className="text-4xl font-black text-primary-dark">5</p>
        </div>
        <div className="bg-white p-6 border-4 border-primary-dark shadow-[4px_4px_0px_0px_rgba(24,115,211,1)]">
          <h3 className="font-bold text-zinc-500 uppercase text-sm mb-2">Admins</h3>
          <p className="text-4xl font-black text-primary-dark">1</p>
        </div>
      </div>

      <div className="bg-white p-8 border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)]">
        <h2 className="text-2xl font-black text-primary-dark uppercase mb-4">Bienvenue sur l'espace d'administration</h2>
        <p className="text-foreground/80 font-medium mb-6">
          Depuis cet espace totalement indépendant de l'espace joueur, vous pouvez :
        </p>
        <ul className="space-y-4 font-medium text-primary-dark">
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-yellow flex items-center justify-center font-bold">1</div>
            Gérer les actualités du club qui s'affichent sur la page d'accueil.
          </li>
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-purple text-white flex items-center justify-center font-bold">2</div>
            Modifier les images du site (carrousel, fond, etc) via la section "Gérer le site".
          </li>
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
            Uploader et réutiliser des images grâce à la "Médiathèque".
          </li>
        </ul>
      </div>
    </div>
  );
}
