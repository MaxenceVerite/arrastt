import { createClient } from '@supabase/supabase-js';

// Ce client utilise la clé SERVICE_ROLE qui permet de contourner les règles RLS.
// Il ne doit être utilisé QUE dans des Server Actions sécurisées (après vérification des droits).
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("SERVICE_ROLE_KEY est manquant dans les variables d'environnement.");
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
