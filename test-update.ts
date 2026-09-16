import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpdate() {
  const { data, error } = await supabase
    .from("site_content")
    .upsert({ 
      section_key: 'partners', 
      content: [{ id: "123", title: "Test", image: "", description: "" }] 
    }, { onConflict: 'section_key' });

  if (error) {
    console.error("Supabase Error:", error);
  } else {
    console.log("Success:", data);
  }
}

testUpdate();
