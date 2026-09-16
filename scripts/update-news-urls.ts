import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: newsItems, error } = await supabase.from('news').select('id, image_url');
  
  if (error || !newsItems) {
    console.error("Failed to fetch news:", error);
    return;
  }

  const prefix = `${supabaseUrl}/storage/v1/object/public/medias/`;

  for (const row of newsItems) {
    if (row.image_url && row.image_url.startsWith('/medias/')) {
      const newUrl = row.image_url.replace('/medias/', prefix);
      console.log(`Updating news ${row.id}: ${row.image_url} -> ${newUrl}`);
      
      const { error: updateError } = await supabase
        .from('news')
        .update({ image_url: newUrl })
        .eq('id', row.id);
        
      if (updateError) {
        console.error(`Failed to update news ${row.id}:`, updateError);
      }
    }
  }
  
  console.log("Done updating news URLs.");
}

main();
