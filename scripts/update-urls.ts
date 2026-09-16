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
  const { data: contents, error } = await supabase.from('site_content').select('*');
  
  if (error || !contents) {
    console.error("Failed to fetch site_content:", error);
    return;
  }

  const prefix = `${supabaseUrl}/storage/v1/object/public/medias/`;

  for (const row of contents) {
    let contentStr = JSON.stringify(row.content);
    
    // Replace "/medias/filename.ext" with "https://.../storage/v1/object/public/medias/filename.ext"
    if (contentStr.includes('"/medias/')) {
      console.log(`Updating ${row.section_key}...`);
      contentStr = contentStr.replace(/"\/medias\//g, `"${prefix}`);
      
      const updatedContent = JSON.parse(contentStr);
      
      const { error: updateError } = await supabase
        .from('site_content')
        .update({ content: updatedContent })
        .eq('section_key', row.section_key);
        
      if (updateError) {
        console.error(`Failed to update ${row.section_key}:`, updateError);
      } else {
        console.log(`Successfully updated ${row.section_key}`);
      }
    }
  }
  
  console.log("Done updating URLs.");
}

main();
