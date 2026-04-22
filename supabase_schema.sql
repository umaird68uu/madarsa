-- Mahad Abul Hasan Madrasa App Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('principle', 'admin', 'teacher')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'role');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. Shifts
CREATE TABLE public.shifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL, -- e.g., Morning, Evening
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Sections
CREATE TABLE public.sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- Edadiya, Nazera, Hifz, Aalimiyat
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Default Sections
INSERT INTO public.sections (name) VALUES ('Edadiya'), ('Nazera'), ('Hifz'), ('Aalimiyat') ON CONFLICT DO NOTHING;

-- 4. Classes
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  section_id UUID REFERENCES public.sections(id) ON DELETE CASCADE,
  shift_id UUID REFERENCES public.shifts(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Students
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_ur TEXT NOT NULL,
  father_name TEXT NOT NULL,
  father_mobile TEXT NOT NULL,
  personal_mobile TEXT,
  date_of_admission DATE NOT NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Attendance
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'leave')),
  marked_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(student_id, date) -- One attendance record per student per day
);

-- 7. Progress
CREATE TABLE public.progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('pages', 'chapters')),
  amount INTEGER NOT NULL,
  evaluator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Fees
CREATE TABLE public.fees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  academic_year TEXT NOT NULL,
  total_amount NUMERIC(10, 2) DEFAULT 5000.00,
  amount_paid NUMERIC(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(student_id, academic_year)
);

-- 9. Fee Installments
CREATE TABLE public.fee_installments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fee_id UUID REFERENCES public.fees(id) ON DELETE CASCADE,
  installment_number INTEGER NOT NULL CHECK (installment_number BETWEEN 1 AND 4),
  amount NUMERIC(10, 2) DEFAULT 1250.00,
  due_date DATE,
  paid_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(fee_id, installment_number)
);

-- 10. Shift Change Requests
CREATE TABLE public.shift_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  from_class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  to_shift_id UUID REFERENCES public.shifts(id) ON DELETE CASCADE,
  requested_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Notices (Red/Green)
CREATE TABLE public.notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('red', 'green')),
  description TEXT NOT NULL,
  issued_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. Scholarships
CREATE TABLE public.scholarships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  date DATE NOT NULL,
  given_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. Activity Log
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS) - Basic Setup for testing
-- In a real production scenario, policies would be stricter. 
-- For now we enable RLS but allow authenticated users. We will handle role restrictions in the UI/App logic for simplicity,
-- or you can add strict policies here.

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_installments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all actions for authenticated users" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users" ON public.shifts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users" ON public.sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users" ON public.classes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users" ON public.students FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users" ON public.attendance FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users" ON public.progress FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users" ON public.fees FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users" ON public.fee_installments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users" ON public.shift_requests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users" ON public.notices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users" ON public.scholarships FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users" ON public.activity_log FOR ALL USING (auth.role() = 'authenticated');
