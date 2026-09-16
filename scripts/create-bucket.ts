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
  console.log("Creating 'medias' bucket...");
  const { data, error } = await supabase.storage.createBucket('medias', {
    public: true,
    allowedMimeTypes: ['image/*', 'application/pdf'],
    fileSizeLimit: 10485760, // 10MB
  });
  
  if (error) {
    if (error.message.includes('already exists')) {
      console.log("Bucket 'medias' already exists.");
    } else {
      console.error("Error creating bucket:", error.message);
    }
  } else {
    console.log("Bucket created successfully:", data);
  }
}

main();
