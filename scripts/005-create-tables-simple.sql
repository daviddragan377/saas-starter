-- Drop existing tables if they exist (be careful in production!)
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS journey_milestones CASCADE;

-- Create user_profiles table with simple structure
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  personality_traits TEXT DEFAULT '[]',
  traumas_insecurities TEXT DEFAULT '[]',
  goals TEXT DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create journey_milestones table
CREATE TABLE journey_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  milestone_type TEXT NOT NULL DEFAULT 'achievement',
  completed BOOLEAN DEFAULT FALSE,
  target_date DATE,
  completed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_milestones ENABLE ROW LEVEL SECURITY;

-- Create simple RLS policies that allow all operations for authenticated users
CREATE POLICY "Allow all for authenticated users" ON user_profiles
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow all for authenticated users" ON journey_milestones
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Create indexes
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_journey_milestones_user_id ON journey_milestones(user_id);

-- Insert a test row to verify the table works
INSERT INTO user_profiles (user_id, personality_traits, traumas_insecurities, goals) 
VALUES ('00000000-0000-0000-0000-000000000000', '["test"]', '["test"]', '["test"]')
ON CONFLICT (user_id) DO NOTHING;
