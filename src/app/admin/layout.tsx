import AdminNav from '@/components/admin/AdminNav';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Login page — render without nav chrome
  if (!user) {
    return <>{children}</>;
  }

  return <AdminNav>{children}</AdminNav>;
}
