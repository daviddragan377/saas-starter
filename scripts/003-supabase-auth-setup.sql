-- Enable Row Level Security on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE dream_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE mantra_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE sound_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for user_memories
CREATE POLICY "Users can view own memories" ON user_memories
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own memories" ON user_memories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own memories" ON user_memories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own memories" ON user_memories
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for chat_sessions
CREATE POLICY "Users can view own chat sessions" ON chat_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat sessions" ON chat_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat sessions" ON chat_sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat sessions" ON chat_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for chat_messages
CREATE POLICY "Users can view own chat messages" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for dream_entries
CREATE POLICY "Users can view own dreams" ON dream_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own dreams" ON dream_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own dreams" ON dream_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own dreams" ON dream_entries
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for mantra_sessions
CREATE POLICY "Users can view own mantras" ON mantra_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mantras" ON mantra_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for journey_milestones
CREATE POLICY "Users can view own milestones" ON journey_milestones
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own milestones" ON journey_milestones
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own milestones" ON journey_milestones
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own milestones" ON journey_milestones
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for sound_sessions
CREATE POLICY "Users can view own sound sessions" ON sound_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sound sessions" ON sound_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, personality_traits, traumas_insecurities, goals)
  VALUES (NEW.id, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
