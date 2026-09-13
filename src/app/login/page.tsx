"use client";

import { useActionState } from "react";
import { login } from "../auth/actions";
import Link from "next/link";

export default function LoginPage() {
  const [error, action, isPending] = useActionState(async (state: any, formData: FormData) => {
    const result = await login(formData);
    if (result?.error) {
      return result.error;
    }
    return null;
  }, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-12 border-4 border-primary-dark shadow-[12px_12px_0px_0px_rgba(10,45,108,1)]">
        <div>
          <h2 className="mt-2 text-center text-4xl font-black text-primary-dark uppercase tracking-tighter">
            Connexion
          </h2>
          <p className="mt-4 text-center text-sm font-bold text-zinc-500">
            Accédez à votre espace joueur
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action={action}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-black text-primary-dark uppercase tracking-wider mb-2">Email</label>
              <input 
                name="email" 
                type="email" 
                required 
                className="appearance-none block w-full px-4 py-3 border-2 border-zinc-300 placeholder-zinc-400 text-primary-dark font-bold focus:outline-none focus:border-accent-purple focus:ring-0 transition-colors"
                placeholder="pongiste@arrastt.fr" 
              />
            </div>
            <div>
              <label className="block text-sm font-black text-primary-dark uppercase tracking-wider mb-2">Mot de passe</label>
              <input 
                name="password" 
                type="password" 
                required 
                className="appearance-none block w-full px-4 py-3 border-2 border-zinc-300 placeholder-zinc-400 text-primary-dark font-bold focus:outline-none focus:border-accent-purple focus:ring-0 transition-colors"
                placeholder="••••••••" 
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 font-bold text-sm" role="alert">
              <p>{error}</p>
            </div>
          )}

          <div>
            <button 
              type="submit" 
              disabled={isPending}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-black uppercase text-white bg-primary hover:bg-primary-dark focus:outline-none shadow-[6px_6px_0px_0px_rgba(24,115,211,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(24,115,211,1)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? "Connexion..." : "Se connecter"}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm font-bold text-zinc-500">
            Pas encore de compte ?{" "}
            <Link href="/register" className="text-accent-purple hover:text-primary transition-colors">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
