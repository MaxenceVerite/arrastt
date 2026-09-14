"use client";

import { useState } from "react";
import Image from "next/image";
import { loginAdmin } from "../actions";

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await loginAdmin(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(255,226,138,1)] border-4 border-primary-dark relative">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-xl shadow-lg border-2 border-primary-dark">
          <Image src="/logo_arras_tt.png" alt="Logo" width={100} height={50} className="object-contain" />
        </div>

        <h1 className="text-3xl font-black text-primary-dark uppercase text-center mt-6 mb-2">Administration</h1>
        <p className="text-center text-foreground/60 mb-8 font-medium">Espace réservé au Bureau Directeur</p>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 font-medium">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold text-primary-dark uppercase mb-2">Email Admin</label>
            <input 
              type="email" 
              name="email" 
              required 
              defaultValue="admin@arrastt.fr"
              className="w-full p-4 border-2 border-zinc-300 focus:border-primary focus:outline-none transition-colors" 
              placeholder="votre@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-primary-dark uppercase mb-2">Mot de passe</label>
            <input 
              type="password" 
              name="password" 
              required 
              defaultValue="admin123"
              className="w-full p-4 border-2 border-zinc-300 focus:border-primary focus:outline-none transition-colors" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary-dark text-white font-black uppercase py-4 shadow-[4px_4px_0px_0px_rgba(255,226,138,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,226,138,1)] transition-all mt-4 flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
