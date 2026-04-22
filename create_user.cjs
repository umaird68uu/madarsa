const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pbhljpfifaisbcfmunso.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiaGxqcGZpZmFpc2JjZm11bnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4Mzg1OTUsImV4cCI6MjA5MjQxNDU5NX0.lDNhEtXJ4FP7BhHwiXB_Axv2RjDHNMqf_XnMSzasrOU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createTestUser() {
  console.log('Attempting to create test user...');
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@mahad.com',
    password: 'Password123!',
    options: {
      data: {
        name: 'Admin User',
        role: 'principle'
      }
    }
  });

  if (error) {
    console.error('Failed to create user:', error.message);
  } else {
    console.log('Successfully created test user!');
    console.log('Email: admin@mahad.com');
    console.log('Password: Password123!');
    console.log('User ID:', data.user?.id);
  }
}

createTestUser();
