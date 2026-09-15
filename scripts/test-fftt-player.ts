import crypto from 'crypto';
import { XMLParser } from 'fast-xml-parser';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const FFTT_API_URL = "https://www.fftt.com/mobile/pxml";
const FFTT_APP_ID = process.env.FFTT_APP_ID || "SW469";
const FFTT_PASSWORD = process.env.FFTT_PASSWORD || "somepassword";

function generateFfttSignature() {
    const timestamp = new Date().getTime().toString();
    const hash = crypto.createHmac('md5', FFTT_PASSWORD).update(timestamp).digest('hex');
    const serie = crypto.createHash('md5').update(timestamp.substring(0, 8)).digest('hex');
    return {
        tm: timestamp,
        tmc: hash,
        serie: serie,
        id: FFTT_APP_ID
    };
}

async function fetchFfttData(endpoint: string, params: Record<string, string> = {}) {
    const signature = generateFfttSignature();
    const queryParams = new URLSearchParams({ ...signature, ...params });
    const url = `${FFTT_API_URL}/${endpoint}?${queryParams.toString()}`;
    
    console.log(`Fetching ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const xml = await response.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    return parser.parse(xml);
}

async function run() {
    const licence = '6219206';
    
    console.log("--- xml_partie ---");
    const parties = await fetchFfttData('xml_partie.php', { numlic: licence });
    console.log(JSON.stringify(parties, null, 2));

    console.log("--- xml_histo_classement ---");
    const histo = await fetchFfttData('xml_histo_classement.php', { numlic: licence });
    console.log(JSON.stringify(histo, null, 2));
}

run();
