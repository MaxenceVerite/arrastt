"use client";

import { useTransition } from "react";
import { unlinkLicense } from "../auth/actions";

export default function UnlinkButton({ license_number }: { license_number: string }) {
  const [isPending, startTransition] = useTransition();

  const handleUnlink = () => {
    if (confirm(`Voulez-vous vraiment délier la licence ${license_number} de ce compte ?`)) {
      startTransition(async () => {
        await unlinkLicense();
      });
    }
  };

  return (
    <button 
      onClick={handleUnlink}
      disabled={isPending}
      className="text-xs font-bold text-red-500 hover:text-red-700 underline uppercase tracking-wider disabled:opacity-50"
    >
      {isPending ? "Déliason..." : "Modifier ma licence"}
    </button>
  );
}
