import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '../auth/actions'
import LicenseForm from './LicenseForm'

export default async function EspaceJoueurPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get metadata (includes first_name, last_name, and license_number if added)
  const metadata = user.user_metadata || {}
  const hasLicense = !!metadata.license_number

  // Mock FFTT Data
  const mockFfttData = {
    points: 1245,
    classement: "12",
    progression: "+15",
    victoires: 24,
    defaites: 12
  }

  return (
    <div className="flex flex-col w-full bg-zinc-50 min-h-screen">
      {/* Dashboard Header */}
      <section className="w-full bg-primary-dark border-b-[8px] border-accent-yellow pt-12 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Espace <span className="text-accent-yellow">Joueur</span>
            </h1>
            <p className="text-white/80 text-lg mt-2 font-medium">
              Bonjour, <span className="font-bold text-white uppercase">{metadata.first_name} {metadata.last_name}</span>
            </p>
          </div>
          <form action={logout}>
            <button className="bg-transparent border-2 border-white text-white font-bold uppercase px-6 py-2 hover:bg-white hover:text-primary-dark transition-colors text-sm">
              Déconnexion
            </button>
          </form>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!hasLicense ? (
          <div className="max-w-2xl bg-white border-4 border-primary shadow-[8px_8px_0px_0px_rgba(24,115,211,1)] p-8 md:p-12">
            <h2 className="text-2xl font-black text-primary-dark uppercase mb-4">Lier ma licence FFTT</h2>
            <p className="text-zinc-600 font-medium mb-8">
              Pour accéder à vos statistiques officielles et historiques de matchs, vous devez associer votre numéro de licence à 7 chiffres.
            </p>
            <LicenseForm />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Stats Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Profile Card */}
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(10,45,108,1)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-zinc-200 flex items-center justify-center text-primary-dark font-black text-2xl uppercase">
                    {metadata.first_name?.[0]}{metadata.last_name?.[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-primary-dark uppercase">{metadata.first_name} {metadata.last_name}</h3>
                    <p className="text-accent-purple font-bold">Licence N° {metadata.license_number}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-100 p-4 border-2 border-zinc-200">
                    <p className="text-xs font-bold text-zinc-500 uppercase">Points</p>
                    <p className="text-2xl font-black text-primary-dark">{mockFfttData.points}</p>
                  </div>
                  <div className="bg-zinc-100 p-4 border-2 border-zinc-200">
                    <p className="text-xs font-bold text-zinc-500 uppercase">Class.</p>
                    <p className="text-2xl font-black text-primary-dark">{mockFfttData.classement}</p>
                  </div>
                  <div className="bg-accent-yellow/20 p-4 border-2 border-accent-yellow col-span-2 flex justify-between items-center">
                    <p className="text-sm font-bold text-primary-dark uppercase">Progression</p>
                    <p className="text-xl font-black text-green-600">{mockFfttData.progression}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Historique Matchs Mock */}
              <div className="bg-white border-2 border-zinc-200 p-8">
                <h3 className="text-2xl font-black text-primary-dark uppercase mb-6 flex items-center gap-3">
                  <div className="w-3 h-8 bg-primary"></div>
                  Derniers matchs
                </h3>
                
                <div className="space-y-4">
                  {[
                    { adversaire: "DUPONT Pierre", class: "13", score: "V (3-1)", pts: "+4.5" },
                    { adversaire: "MARTIN Luc", class: "11", score: "V (3-0)", pts: "+1.2" },
                    { adversaire: "BERNARD Alain", class: "14", score: "D (1-3)", pts: "-2.1" },
                  ].map((match, i) => (
                    <div key={i} className="flex justify-between items-center p-4 border-b-2 border-zinc-100 hover:bg-zinc-50 transition-colors">
                      <div>
                        <p className="font-bold text-primary-dark">{match.adversaire}</p>
                        <p className="text-sm text-zinc-500 font-medium">Classé {match.class}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-black ${match.score.startsWith('V') ? 'text-green-600' : 'text-red-500'}`}>{match.score}</p>
                        <p className="text-sm font-bold text-zinc-400">{match.pts} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="mt-6 w-full text-center py-4 bg-zinc-100 hover:bg-zinc-200 text-primary-dark font-bold uppercase transition-colors">
                  Voir tout l'historique
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
