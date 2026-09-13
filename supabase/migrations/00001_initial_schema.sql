-- Migration 00001: Initial Schema for ArrasTT
-- This schema reorganizes the concepts from the FFTT API into a cleaner, modern structure.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE match_result AS ENUM ('victory', 'defeat', 'draw');
CREATE TYPE news_category AS ENUM ('general', 'tournament', 'results');

-- 3. TABLES

-- Users (Extended profiles linked to Supabase Auth if needed in the future)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    license_number TEXT UNIQUE,
    points INTEGER DEFAULT 500,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams
CREATE TABLE public.teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    division TEXT NOT NULL,
    pool TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Players (Specifically FFTT players for the club)
CREATE TABLE public.players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_number TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    points INTEGER NOT NULL,
    category TEXT,
    club_name TEXT DEFAULT 'Arras TT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches (Rencontres par équipe)
CREATE TABLE public.team_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID REFERENCES public.teams(id),
    opponent_name TEXT NOT NULL,
    match_date TIMESTAMP WITH TIME ZONE,
    is_home BOOLEAN DEFAULT true,
    score_arras INTEGER,
    score_opponent INTEGER,
    result match_result,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News (Actualités vitrine)
CREATE TABLE public.news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category news_category DEFAULT 'general',
    image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. RLS POLICIES (Row Level Security)

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Allow read access to all public for vitrine data
CREATE POLICY "Allow public read-only access for teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access for players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access for team_matches" ON public.team_matches FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access for news" ON public.news FOR SELECT USING (true);

-- Functions and Triggers for updated_at
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_players_modtime BEFORE UPDATE ON public.players FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_news_modtime BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
