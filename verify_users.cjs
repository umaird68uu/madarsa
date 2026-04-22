const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pbhljpfifaisbcfmunso.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiaGxqcGZpZmFpc2JjZm11bnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4Mzg1OTUsImV4cCI6MjA5MjQxNDU5NX0.lDNhEtXJ4FP7BhHwiXB_Axv2RjDHNMqf_XnMSzasrOU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const users = [
  { email: 'admin@mahad.com',       password: 'Password123!', role: 'principle' },
  { email: 'principal@mahad.com',   password: 'Password123!', role: 'principle' },
  { email: 'teacher1@mahad.com',    password: 'Password123!', role: 'teacher' },
  { email: 'teacher2@mahad.com',    password: 'Password123!', role: 'teacher' },
  { email: 'teacher3@mahad.com',    password: 'Password123!', role: 'teacher' },
  { email: 'teacher4@mahad.com',    password: 'Password123!', role: 'teacher' },
];

async function verifyUsers() {
  console.log('=== Verifying Users in Supabase ===\n');

  for (const user of users) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) {
      console.log(`❌  ${user.email}  →  NOT found / invalid (${error.message})`);
      continue;
    }

    // fetch profile
    const { data: profile, error: pErr } = await supabase
      .from('profiles')
      .select('id, name, role')
      .eq('id', data.user.id)
      .single();

    if (pErr) {
      console.log(`✅  ${user.email}  →  Auth OK | Profile: MISSING (${pErr.message})`);
    } else {
      console.log(`✅  ${user.email}  →  Auth OK | Profile: name="${profile.name}", role="${profile.role}"`);
    }

    await supabase.auth.signOut();
  }

  console.log('\nDone.');
}

verifyUsers().catch(console.error);
