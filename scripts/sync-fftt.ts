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
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Attention : NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant. L'insertion en base sera ignorée.");
}

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

function getFfttCredentials() {
  const now = new Date();
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

async function fetchFromFftt(endpoint: string, params: Record<string, string> = {}) {
  const { appId, tm, tmc } = getFfttCredentials();
  const queryParams = new URLSearchParams({
    serie: appId,
    id: appId,
    tm,
    tmc,
    ...params
  });
  
  const url = `https://www.fftt.com/mobile/pxml/${endpoint}.php?${queryParams.toString()}`;
  console.log(`Fetching ${endpoint}...`);
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const xmlText = new TextDecoder('iso-8859-1').decode(arrayBuffer);
    return await parseStringPromise(xmlText, { explicitArray: false });
  } catch (err) {
    console.error(`Erreur sur l'API FFTT (${endpoint}) :`, err);
    return null;
  }
}

async function syncPlayers() {
  console.log("--- Sync Joueurs ---");
  const result = await fetchFromFftt('xml_liste_joueur', { club: FFTT_CLUB_ID });
  if (!result?.liste?.joueur) return console.log("Aucun joueur trouvé.");
  
  const players = Array.isArray(result.liste.joueur) ? result.liste.joueur : [result.liste.joueur];
  console.log(`✅ ${players.length} joueurs récupérés.`);
  
  if (supabase) {
    const formattedPlayers = players.map((p: any) => ({
      license_number: p.licence,
      first_name: p.prenom,
      last_name: p.nom,
      points: parseInt(p.clast, 10) * 100 || 500,
      club_name: p.club
    }));
    
    const { error } = await supabase.from('players').upsert(formattedPlayers, { onConflict: 'license_number' });
    if (error) console.error("❌ Erreur Supabase :", error);
    else console.log(`✅ ${formattedPlayers.length} joueurs mis à jour dans Supabase.`);
  }
}

async function syncClub() {
  console.log("--- Sync Club ---");
  const result = await fetchFromFftt('xml_club_detail', { club: FFTT_CLUB_ID });
  if (!result?.liste?.club) return console.log("Club non trouvé.");
  
  const c = result.liste.club;
  console.log(`✅ Club récupéré: ${c.nom}`);
  
  if (supabase) {
    const formattedClub = {
      numero: c.numero,
      nom: c.nom,
      nomsalle: c.nomsalle,
      adressesalle1: c.adressesalle1,
      adressesalle2: c.adressesalle2,
      adressesalle3: c.adressesalle3,
      codepsalle: c.codepsalle,
      villesalle: c.villesalle,
      web: c.web,
      nomcor: c.nomcor,
      prenomcor: c.prenomcor,
      mailcor: c.mailcor,
      telcor: c.telcor,
      latitude: c.latitude,
      longitude: c.longitude
    };
    
    const { error } = await supabase.from('club_info').upsert(formattedClub, { onConflict: 'numero' });
    if (error) console.error("❌ Erreur Supabase :", error);
    else console.log(`✅ Club mis à jour dans Supabase.`);
  }
}

async function syncTeamsAndMatches() {
  console.log("--- Sync Equipes ---");
  const result = await fetchFromFftt('xml_equipe', { numclu: FFTT_CLUB_ID });
  if (!result?.liste?.equipe) return console.log("Aucune équipe trouvée.");
  
  const teams = Array.isArray(result.liste.equipe) ? result.liste.equipe : [result.liste.equipe];
  console.log(`✅ ${teams.length} équipes récupérées.`);
  
  if (supabase) {
    const formattedTeams = teams.map((t: any) => ({
      fftt_id: t.idequipe,
      name: t.libequipe,
      division: t.libdivision,
      pool: t.liendivision,
    }));
    
    const { error } = await supabase.from('teams').upsert(formattedTeams, { onConflict: 'fftt_id' });
    if (error) console.error("❌ Erreur Supabase (teams) :", error);
    else console.log(`✅ ${formattedTeams.length} équipes mises à jour dans Supabase.`);
  }
  
  // Now sync matches for each team. We need the internal team ID from Supabase for relationships.
  console.log("--- Sync Matchs ---");
  if (!supabase) return;
  
  const { data: dbTeams, error: dbTeamsError } = await supabase.from('teams').select('id, fftt_id, pool');
  if (dbTeamsError || !dbTeams) return console.error("Impossible de récupérer les équipes pour les matchs.");
  
  let matchesCount = 0;
  for (const team of dbTeams) {
    if (!team.pool || !team.pool.includes('cx_poule=')) continue; // We need the poule string
    
    // team.pool is like "cx_poule=1407258&D1=234625&organisme_pere=67"
    const params = new URLSearchParams(team.pool);
    const cx_poule = params.get('cx_poule');
    const D1 = params.get('D1');
    
    if (!cx_poule || !D1) continue;
    
    const resultEqu = await fetchFromFftt('xml_result_equ', { auto: '1', D1, cx_poule });
    if (!resultEqu?.liste?.tour) continue;
    
    const tours = Array.isArray(resultEqu.liste.tour) ? resultEqu.liste.tour : [resultEqu.liste.tour];
    
    const formattedMatches: any[] = [];
    for (const match of tours) {
      if (!match.lien) continue;
      
      const isHome = match.equa.includes('ARRAS');
      const opponent_name = isHome ? match.equb : match.equa;
      
      // Compute score
      let score_arras = null;
      let score_opponent = null;
      let match_result_enum = null;
      
      // sometimes scores are empty strings if match didn't happen yet
      if (match.scorea && match.scoreb) {
        const scoreA = parseInt(match.scorea);
        const scoreB = parseInt(match.scoreb);
        if (!isNaN(scoreA) && !isNaN(scoreB)) {
          score_arras = isHome ? scoreA : scoreB;
          score_opponent = isHome ? scoreB : scoreA;
          
          if (score_arras > score_opponent) match_result_enum = 'victory';
          else if (score_arras < score_opponent) match_result_enum = 'defeat';
          else match_result_enum = 'draw';
        }
      }
      
      // Parse match_date
      let match_date = null;
      if (match.dateprevue) { // formats like DD/MM/YYYY or DD/MM/YY
        const parts = match.dateprevue.split('/');
        if (parts.length === 3) {
          const year = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
          match_date = new Date(`${year}-${parts[1]}-${parts[0]}T00:00:00Z`).toISOString();
        }
      }
      
      formattedMatches.push({
        fftt_id: match.lien, // Unique identifier for the match link
        team_id: team.id,
        opponent_name,
        is_home: isHome,
        score_arras,
        score_opponent,
        result: match_result_enum,
        match_date,
      });
    }
    
    if (formattedMatches.length > 0) {
      const { error } = await supabase.from('team_matches').upsert(formattedMatches, { onConflict: 'fftt_id' });
      if (error) {
        console.error(`❌ Erreur Supabase (team_matches) pour l'équipe ${team.fftt_id}:`, error);
      } else {
        matchesCount += formattedMatches.length;
      }
    }
    
    // delay to not hammer the API
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`✅ ${matchesCount} matchs mis à jour dans Supabase.`);
}

async function syncIndividualStats(fullHistory: boolean = false) {
  console.log(`--- Sync Stats Individuelles (Parties & Classements) ${fullHistory ? '[FULL HISTORY]' : '[DELTA]'} ---`);
  if (!supabase) return;

  const { data: dbPlayers, error: dbPlayersError } = await supabase.from('players').select('license_number');
  if (dbPlayersError || !dbPlayers) return console.error("Impossible de récupérer les joueurs.");

  let matchesCount = 0;
  let rankingsCount = 0;

  for (const player of dbPlayers) {
    const licence = player.license_number;
    
    // Check if player already has matches to decide which API to use
    const { data: existingMatches } = await supabase
      .from('player_matches')
      .select('id')
      .eq('license_number', licence)
      .limit(1);
      
    const isNewPlayer = !existingMatches || existingMatches.length === 0;
    
    // Si c'est un nouveau joueur ou si on demande un full history, on utilise l'API mysql
    const useMysql = fullHistory || isNewPlayer;
    const endpoint = useMysql ? 'xml_partie_mysql' : 'xml_partie';
    const params = useMysql ? { licence } : { numlic: licence };
    
    // 1. Fetch parties
    const resultPartie = await fetchFromFftt(endpoint, params);
    if (resultPartie?.liste?.partie) {
      const parties = Array.isArray(resultPartie.liste.partie) ? resultPartie.liste.partie : [resultPartie.liste.partie];
      const formattedMatches = [];
      
      for (const p of parties) {
        if (!p.idpartie) continue;
        const victoire = p.victoire || p.vd; // Handle both APIs
        if (!victoire) continue; 
        
        let match_date = null;
        if (p.date) {
           const parts = p.date.split('/');
           if (parts.length === 3) {
             const year = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
             match_date = new Date(`${year}-${parts[1]}-${parts[0]}T00:00:00Z`).toISOString();
           }
        }
        
        const opponent_name = p.advnompre || [p.nom, p.prenom].filter(Boolean).join(' ') || 'Inconnu';

        formattedMatches.push({
           license_number: licence,
           idpartie: p.idpartie,
           vd: victoire,
           opponent_name,
           opponent_license: p.advlic || p.licence || p.numj || null,
           opponent_ranking: p.advclaof || p.classement || null,
           match_date,
           point_result: p.pointres ? parseFloat(p.pointres) : null,
           coefficient: p.coefchamp ? parseFloat(p.coefchamp) : null
        });
      }
      
      if (formattedMatches.length > 0) {
        const { error } = await supabase.from('player_matches').upsert(formattedMatches, { onConflict: 'license_number, idpartie' });
        if (error) console.error(`❌ Erreur Supabase (player_matches) pour ${licence}:`, error);
        else matchesCount += formattedMatches.length;
      }
    }
    
    await new Promise(r => setTimeout(r, 200));

    // 2. Fetch rankings history
    const resultHisto = await fetchFromFftt('xml_histo_classement', { numlic: licence });
    if (resultHisto?.liste?.histo) {
      const histos = Array.isArray(resultHisto.liste.histo) ? resultHisto.liste.histo : [resultHisto.liste.histo];
      const formattedRankings = [];
      
      for (const h of histos) {
         if (!h.saison || !h.phase) continue;
         
         formattedRankings.push({
            license_number: licence,
            saison: h.saison,
            phase: h.phase,
            points: h.point ? parseFloat(h.point) : 0,
            rank: h.clast || null
         });
      }
      
      if (formattedRankings.length > 0) {
        const { error } = await supabase.from('player_rankings').upsert(formattedRankings, { onConflict: 'license_number, saison, phase' });
        if (error) console.error(`❌ Erreur Supabase (player_rankings) pour ${licence}:`, error);
        else rankingsCount += formattedRankings.length;
      }
    }
    
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`✅ ${matchesCount} parties et ${rankingsCount} historiques de classement mis à jour.`);
}

async function main() {
  const args = process.argv.slice(2);
  const runAll = args.length === 0 || args.includes('--all');
  const fullHistory = args.includes('--full-history');
  
  if (runAll || args.includes('--club')) await syncClub();
  if (runAll || args.includes('--players')) await syncPlayers();
  if (runAll || args.includes('--teams') || args.includes('--matches')) await syncTeamsAndMatches();
  if (runAll || args.includes('--stats') || fullHistory) await syncIndividualStats(fullHistory);
}

main();
