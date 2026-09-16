import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const mediasDir = path.join(process.cwd(), 'public', 'medias');
  
  try {
    const files = await fs.readdir(mediasDir);
    const filesToUpload = files.filter(f => !f.startsWith('.') && f !== 'video_fond_presentation.mp4');
    
    console.log(`Found ${filesToUpload.length} files to migrate...`);
    
    for (const file of filesToUpload) {
      console.log(`Uploading ${file}...`);
      const filePath = path.join(mediasDir, file);
      const fileBuffer = await fs.readFile(filePath);
      
      const { data, error } = await supabase.storage
        .from('medias')
        .upload(file, fileBuffer, {
          upsert: true,
          contentType: file.endsWith('.png') ? 'image/png' : 'image/jpeg'
        });
        
      if (error) {
        console.error(`Failed to upload ${file}:`, error.message);
      } else {
        console.log(`Successfully uploaded ${file}`);
      }
    }
    
    console.log("Migration finished.");
  } catch (err) {
    console.error("Error migrating medias:", err);
  }
}

main();
