-- First, let's check what tables exist
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_profiles', 'journey_milestones');

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('user_profiles', 'journey_milestones');

-- Drop and recreate tables with proper structure
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS journey_milestones CASCADE;
DROP TABLE IF EXISTS user_memories CASCADE;
DROP TABLE IF EXISTS chat_sessions CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS dream_entries CASCADE;
DROP TABLE IF EXISTS mantra_sessions CASCADE;
DROP TABLE IF EXISTS sound_sessions CASCADE;

-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  personality_traits TEXT DEFAULT '[]',
  traumas_insecurities TEXT DEFAULT '[]',
  goals TEXT DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create journey_milestones table
CREATE TABLE journey_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  milestone_type TEXT NOT NULL DEFAULT 'achievement',
  completed BOOLEAN DEFAULT FALSE,
  target_date DATE,
  completed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create other tables needed for the app
CREATE TABLE user_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  memory_type TEXT NOT NULL,
  content TEXT NOT NULL,
  context JSONB,
  importance_score INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE dream_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT NOT NULL,
  interpretation TEXT,
  symbols TEXT DEFAULT '[]',
  emotions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE mantra_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mantra_text TEXT NOT NULL,
  category TEXT,
  context JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE sound_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sounds_config JSONB NOT NULL,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE dream_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE mantra_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sound_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies that allow authenticated users to access their own data
CREATE POLICY "Users can manage their own profile" ON user_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own milestones" ON journey_milestones
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own memories" ON user_memories
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own chat sessions" ON chat_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own chat messages" ON chat_messages
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own dreams" ON dream_entries
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own mantras" ON mantra_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own sound sessions" ON sound_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_journey_milestones_user_id ON journey_milestones(user_id);
CREATE INDEX idx_user_memories_user_id ON user_memories(user_id);
CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_dream_entries_user_id ON dream_entries(user_id);
CREATE INDEX idx_mantra_sessions_user_id ON mantra_sessions(user_id);
CREATE INDEX idx_sound_sessions_user_id ON sound_sessions(user_id);

-- Test insert to verify everything works
INSERT INTO user_profiles (user_id, personality_traits, traumas_insecurities, goals) 
VALUES ('3d9cf52a-2fde-4a7a-8d96-573fde5fe387', '["test"]', '["test"]', '["test"]')
ON CONFLICT (user_id) DO UPDATE SET
  personality_traits = EXCLUDED.personality_traits,
  traumas_insecurities = EXCLUDED.traumas_insecurities,
  goals = EXCLUDED.goals,
  updated_at = NOW();
