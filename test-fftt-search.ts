import * as crypto from 'crypto';
import { parseStringPromise } from 'xml2js';

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

async function run() {
  const { appId, tm, tmc } = getFfttCredentials();
  const url = `https://www.fftt.com/mobile/pxml/xml_club_b.php?serie=${appId}&tm=${tm}&tmc=${tmc}&dep=62`;
  console.log("Fetching:", url);
  
  const res = await fetch(url);
  const text = await res.text();
  console.log(text);
}
run();
