/**
 * Admin User Creation Script
 *
 * Usage:
 *   npx ts-node --project tsconfig.json scripts/create-admin.ts
 *
 * Or via npm script:
 *   npm run create-admin
 *
 * Requires environment variables:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  (NOT the anon key — service role bypasses RLS)
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@globalexpressshipments.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@GES2024!';

async function main() {
  console.log(`Creating admin user: ${ADMIN_EMAIL}`);

  const { data, error } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  });

  if (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }

  console.log('Admin user created successfully!');
  console.log('User ID:', data.user.id);
  console.log('Email:', data.user.email);
  console.log('');
  console.log('Login credentials:');
  console.log('  Email:   ', ADMIN_EMAIL);
  console.log('  Password:', ADMIN_PASSWORD);
  console.log('');
  console.log('IMPORTANT: Change the password after first login!');
}

main();
