const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pbhljpfifaisbcfmunso.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiaGxqcGZpZmFpc2JjZm11bnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4Mzg1OTUsImV4cCI6MjA5MjQxNDU5NX0.lDNhEtXJ4FP7BhHwiXB_Axv2RjDHNMqf_XnMSzasrOU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const usersToCreate = [
  { email: 'admin@mahad.com',       password: 'Password123!', name: 'Admin Principal', role: 'principle' },
  { email: 'principal@mahad.com',   password: 'Password123!', name: 'Main Principal',  role: 'principle' },
  { email: 'teacher1@mahad.com',    password: 'Password123!', name: 'Teacher One',     role: 'teacher' },
  { email: 'teacher2@mahad.com',    password: 'Password123!', name: 'Teacher Two',     role: 'teacher' },
  { email: 'teacher3@mahad.com',    password: 'Password123!', name: 'Teacher Three',   role: 'teacher' },
  { email: 'teacher4@mahad.com',    password: 'Password123!', name: 'Teacher Four',    role: 'teacher' },
];

async function createUsers() {
  console.log('=== Creating Madarsa Users ===\n');

  for (const user of usersToCreate) {
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: { name: user.name, role: user.role }
      }
    });

    if (error) {
      console.log(`⚠️  ${user.email}  →  ${error.message}`);
    } else {
      console.log(`✅  ${user.email}  →  Created (ID: ${data.user?.id})`);
    }
  }

  console.log('\nDone. Now verifying logins...\n');
}

createUsers().catch(console.error);
