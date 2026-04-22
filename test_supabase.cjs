const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pbhljpfifaisbcfmunso.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiaGxqcGZpZmFpc2JjZm11bnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4Mzg1OTUsImV4cCI6MjA5MjQxNDU5NX0.lDNhEtXJ4FP7BhHwiXB_Axv2RjDHNMqf_XnMSzasrOU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  const { data, error } = await supabase.from('students').select('id').limit(1);
  if (error) {
    console.error('Error connecting or table does not exist:', error.message);
  } else {
    console.log('Connection successful! Tables exist.');
  }
}

testConnection();
