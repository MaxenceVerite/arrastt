"use client";

import { useActionState } from "react";
import { linkLicense } from "../auth/actions";

export default function LicenseForm() {
  const [error, action, isPending] = useActionState(async (state: any, formData: FormData) => {
    const result = await linkLicense(formData);
    if (result?.error) {
      return result.error;
    }
    return null;
  }, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div>
        <label htmlFor="license_number" className="block text-sm font-black text-primary-dark uppercase tracking-wider mb-2">
          Numéro de licence
        </label>
        <div className="flex">
          <input 
            type="text" 
            id="license_number"
            name="license_number" 
            placeholder="Ex: 6200001"
            maxLength={7}
            pattern="[0-9]{7}"
            required
            className="flex-1 appearance-none px-4 py-3 border-2 border-zinc-300 placeholder-zinc-400 text-primary-dark font-bold focus:outline-none focus:border-primary transition-colors"
          />
          <button 
            type="submit"
            disabled={isPending}
            className="bg-primary hover:bg-primary-dark text-white font-black uppercase px-6 py-3 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? "..." : "Associer"}
          </button>
        </div>
        <p className="text-xs font-bold text-zinc-400 mt-2">7 chiffres, sans espace.</p>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 font-bold text-sm mt-2">
          {error}
        </div>
      )}
    </form>
  );
}
