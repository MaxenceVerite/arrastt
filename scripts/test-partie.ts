import * as crypto from 'crypto';
import { parseStringPromise } from 'xml2js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const FFTT_APP_ID = "SW469";
const FFTT_APP_KEY = "npy46YTE3T";

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
  const response = await fetch(url);
  const xmlText = await response.text();
  return await parseStringPromise(xmlText, { explicitArray: false });
}

async function run() {
    const resultPartie = await fetchFromFftt('xml_partie_mysql', { licence: '6218401' });
    console.log(JSON.stringify(resultPartie, null, 2));
}

run();
