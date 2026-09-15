import * as crypto from 'crypto';
import { parseStringPromise } from 'xml2js';

const FFTT_APP_ID = "SW469";
const FFTT_APP_KEY = "npy46YTE3T";
const FFTT_CLUB_ID = "07620031";

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

async function testApi(endpoint: string, params: Record<string, string> = {}) {
  const { appId, tm, tmc } = getFfttCredentials();
  
  const queryParams = new URLSearchParams({
    serie: appId,
    id: appId,
    tm,
    tmc,
    ...params
  });
  
  const url = `https://www.fftt.com/mobile/pxml/${endpoint}.php?${queryParams.toString()}`;
  console.log(`\n--- Fetching ${endpoint} with ${JSON.stringify(params)} ---`);
  
  try {
    const response = await fetch(url);
    const xmlText = await response.text();
    const result = await parseStringPromise(xmlText, { explicitArray: false });
    
    // Log result safely, avoiding too much output if huge
    const out = JSON.stringify(result, null, 2);
    if (out.length > 500) {
      console.log(out.substring(0, 500) + '... (truncated)');
    } else {
      console.log(out);
    }
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
  }
}

async function run() {
  await testApi('xml_liste_joueur', { club: FFTT_CLUB_ID });
  await new Promise(r => setTimeout(r, 500));
  
  await testApi('xml_club_detail', { club: FFTT_CLUB_ID });
  await new Promise(r => setTimeout(r, 500));
  
  await testApi('xml_equipe', { numclu: FFTT_CLUB_ID, type: 'M' });
  await new Promise(r => setTimeout(r, 500));
  
  await testApi('xml_equipe', { numclu: FFTT_CLUB_ID });
  await new Promise(r => setTimeout(r, 500));
  
  // Maybe the parameter is club for equipes too?
  await testApi('xml_equipe', { club: FFTT_CLUB_ID });
}

run();
