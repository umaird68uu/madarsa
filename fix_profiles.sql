-- Fix: Create profiles table and backfill existing users

-- Step 1: Create profiles table (if not exists)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('principle', 'admin', 'teacher')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 2: Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 3: Create RLS policy (safe - won't fail if already exists)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='profiles' AND policyname='Allow all actions for authenticated users'
  ) THEN
    CREATE POLICY "Allow all actions for authenticated users" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- Step 4: Create trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', new.email),
    COALESCE(new.raw_user_meta_data->>'role', 'teacher')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Step 6: Backfill profiles for all existing auth users
INSERT INTO public.profiles (id, name, role)
SELECT
  id,
  COALESCE(raw_user_meta_data->>'name', email) AS name,
  COALESCE(raw_user_meta_data->>'role', 'teacher') AS role
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT id, name, role FROM public.profiles;
