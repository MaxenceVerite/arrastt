import * as crypto from 'crypto';
import { parseStringPromise } from 'xml2js';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local for local testing
dotenv.config({ path: '.env.local' });

// Configuration
const FFTT_APP_ID = "SW469";
const FFTT_APP_KEY = "npy46YTE3T";
// Le club ID officiel
const FFTT_CLUB_ID = process.env.FFTT_CLUB_ID || "07620031"; 

// Supabase Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Attention : NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant. L'insertion en base sera ignorée.");
}

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

function getFfttCredentials() {
  const now = new Date();
  
  // Format YYYYMMDDHHmmssSSS
  const pad = (n: number, width: number = 2) => String(n).padStart(width, '0');
  
  const YYYY = now.getFullYear();
  const MM = pad(now.getMonth() + 1);
  const DD = pad(now.getDate());
  const HH = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  const SSS = pad(now.getMilliseconds(), 3);
  
  const tm = `${YYYY}${MM}${DD}${HH}${mm}${ss}${SSS}`;
  
  const passwordMd5 = crypto.createHash('md5').update(FFTT_APP_KEY).digest('hex');
  const tmc = crypto.createHmac('sha1', passwordMd5).update(tm).digest('hex');
  
  return { appId: FFTT_APP_ID, tm, tmc };
}

async function fetchPlayers() {
  const { appId, tm, tmc } = getFfttCredentials();
  
  const url = `https://www.fftt.com/mobile/pxml/xml_liste_joueur.php?serie=${appId}&id=${appId}&tm=${tm}&tmc=${tmc}&club=${FFTT_CLUB_ID}`;
  
  console.log("Fetching FFTT API at URL (with auth):", url.replace(/tmc=[^&]+/, 'tmc=***'));
  
  try {
    const response = await fetch(url);
    const xmlText = await response.text();
    
    // Convert XML to JSON
    const result = await parseStringPromise(xmlText, { explicitArray: false });
    
    if (!result.liste || !result.liste.joueur) {
      console.log("Aucun joueur trouvé ou erreur de l'API FFTT.");
      console.log("Réponse brute :", xmlText);
      return [];
    }
    
    // Ensure players is an array
    const players = Array.isArray(result.liste.joueur) ? result.liste.joueur : [result.liste.joueur];
    
    console.log(`✅ ${players.length} joueurs récupérés depuis la FFTT.`);
    return players;
  } catch (err) {
    console.error("Erreur lors de la récupération depuis l'API FFTT :", err);
    return [];
  }
}

async function syncWithSupabase() {
  console.log("Début de la synchronisation FFTT -> Supabase...");
  const players = await fetchPlayers();
  
  if (players.length > 0) {
    console.log("Exemple de données du premier joueur :", players[0]);
    
    if (supabase) {
      console.log("Préparation de l'envoi vers Supabase...");
      
      const formattedPlayers = players.map((p: any) => {
        // FFTT clast is usually a number like 5, 12, 20. We convert it to approximate points (e.g., 5 -> 500) 
        // if exact points are not available in this endpoint.
        const clastPoints = parseInt(p.clast, 10) * 100 || 500;
        
        return {
          license_number: p.licence,
          first_name: p.prenom,
          last_name: p.nom,
          points: clastPoints,
          club_name: p.club
        };
      });
      
      const { data, error } = await supabase
        .from('players')
        .upsert(formattedPlayers, { onConflict: 'license_number' });
        
      if (error) {
        console.error("❌ Erreur lors de la sauvegarde dans Supabase :", error);
      } else {
        console.log(`✅ ${formattedPlayers.length} joueurs insérés/mis à jour dans Supabase avec succès !`);
      }
    } else {
       console.log("Pour insérer ces données, ajoutez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local");
    }
  }
}

// Lancement du script
syncWithSupabase();
