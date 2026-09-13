import { createClient } from '@/utils/supabase/server';
import ClientHeader from './ClientHeader';

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const firstName = user?.user_metadata?.first_name;

  return <ClientHeader user={user} firstName={firstName} />;
}
