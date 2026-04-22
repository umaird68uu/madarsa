const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pbhljpfifaisbcfmunso.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiaGxqcGZpZmFpc2JjZm11bnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4Mzg1OTUsImV4cCI6MjA5MjQxNDU5NX0.lDNhEtXJ4FP7BhHwiXB_Axv2RjDHNMqf_XnMSzasrOU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTable() {
  // Sign in first
  const { data: auth, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'principal@mahad.com',
    password: 'Password123!'
  });
  if (authErr) { console.error('Login failed:', authErr.message); return; }
  console.log('Logged in as:', auth.user.email);

  // Try raw REST call to list tables
  const res = await fetch(`${supabaseUrl}/rest/v1/profiles?select=id,name,role&limit=1`, {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${auth.session.access_token}`,
      'Content-Type': 'application/json'
    }
  });
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', text);

  await supabase.auth.signOut();
}

checkTable().catch(console.error);
