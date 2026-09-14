export default function CGU() {
  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden min-h-screen">
      <section className="relative w-full border-b-[8px] border-primary py-24 bg-primary-dark overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent-purple opacity-20 blur-3xl rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-lg">
            Conditions Générales <br/><span className="text-accent-yellow">d'Utilisation</span>
          </h1>
          <p className="text-white text-lg md:text-xl font-medium max-w-2xl mx-auto border-b-4 border-accent-purple inline-block pb-2">
            Règles et modalités d'utilisation du site Arras TT
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-5xl">
        <div className="bg-white border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(10,45,108,1)] p-8 md:p-12">
          
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent-yellow flex items-center justify-center font-black text-2xl text-primary-dark">1</div>
                <h2 className="text-3xl font-black text-primary-dark uppercase">Objet</h2>
              </div>
              <div className="text-foreground/80 font-medium leading-relaxed pl-16 border-l-4 border-zinc-100">
                <p>Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions dans lesquelles d'une part, l'association <strong>Arras TT</strong> met à la disposition de ses utilisateurs le site internet, et d'autre part, la manière par laquelle l'utilisateur accède au site et utilise ses services.</p>
                <p className="mt-4">Toute connexion au site est subordonnée au respect des présentes conditions. Pour l'utilisateur, le simple accès au site de l'éditeur implique l'acceptation de l'ensemble des conditions décrites ci-après.</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent-purple flex items-center justify-center font-black text-2xl text-white">2</div>
                <h2 className="text-3xl font-black text-primary-dark uppercase">Accès au site</h2>
              </div>
              <div className="text-foreground/80 font-medium leading-relaxed pl-16 border-l-4 border-zinc-100">
                <p>Le site est accessible gratuitement à tout utilisateur disposant d'un accès à internet. Tous les coûts afférents à l'accès au site, que ce soient les frais matériels, logiciels ou d'accès à internet sont exclusivement à la charge de l'utilisateur. Il est seul responsable du bon fonctionnement de son équipement informatique ainsi que de son accès à internet.</p>
                <p className="mt-4">L'association met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès de qualité au site, mais n'est tenue à aucune obligation d'y parvenir. L'association ne peut, en outre, être tenue responsable de tout dysfonctionnement du réseau ou des serveurs ou de tout autre événement échappant au contrôle raisonnable, qui empêcherait ou dégraderait l'accès au site.</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary flex items-center justify-center font-black text-2xl text-white">3</div>
                <h2 className="text-3xl font-black text-primary-dark uppercase">Propriété intellectuelle</h2>
              </div>
              <div className="text-foreground/80 font-medium leading-relaxed pl-16 border-l-4 border-zinc-100">
                <p>La structure générale du site Arras TT, ainsi que les textes, graphiques, images, sons et vidéos la composant, sont la propriété de l'association ou de ses partenaires. Toute représentation et/ou reproduction et/ou exploitation partielle ou totale de ce site, par quelque procédé que ce soit, sans l'autorisation préalable et par écrit de l'association est strictement interdite et serait susceptible de constituer une contrefaçon au sens des articles L 335-2 et suivants du Code de la propriété intellectuelle.</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-black flex items-center justify-center font-black text-2xl text-white">4</div>
                <h2 className="text-3xl font-black text-primary-dark uppercase">Responsabilité</h2>
              </div>
              <div className="text-foreground/80 font-medium leading-relaxed pl-16 border-l-4 border-zinc-100">
                <p>Les informations diffusées sur le site Arras TT proviennent de sources réputées fiables. Toutefois, l'association ne peut garantir l'exactitude ou la pertinence de ces données. En outre, les informations mises à disposition sur ce site le sont uniquement à titre purement informatif et ne sauraient constituer en aucun cas un conseil ou une recommandation de quelque nature que ce soit.</p>
                <p className="mt-4">En conséquence, l'utilisation des informations et contenus disponibles sur l'ensemble du site, ne sauraient en aucun cas engager la responsabilité de l'association, à quelque titre que ce soit.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
