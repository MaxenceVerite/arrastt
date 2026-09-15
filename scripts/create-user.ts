import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function run() {
  const { data: players } = await supabase.from('players').select('*').order('points', { ascending: false }).limit(1);
  if (!players || players.length === 0) return console.log("No players found");
  
  const player = players[0];
  console.log("Top player:", player);
  
  const email = `${player.first_name.toLowerCase()}.${player.last_name.toLowerCase()}@arrastt.com`;
  
  const { data: user, error } = await supabase.auth.admin.createUser({
    email,
    password: 'password123',
    email_confirm: true,
    user_metadata: {
      first_name: player.first_name,
      last_name: player.last_name,
      license_number: player.license_number
    }
  });
  
  if (error) {
    if (error.message.includes("already registered")) {
        console.log("User already exists:", email);
    } else {
        console.error("Error creating user:", error);
    }
  } else {
    console.log("Created user successfully:", user.user.email, user.user.id);
  }
}
run();
