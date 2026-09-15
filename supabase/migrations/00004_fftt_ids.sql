-- Migration 00004: Add FFTT Identifiers and Club Info Table

-- 1. Create club_info table
CREATE TABLE public.club_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero TEXT UNIQUE NOT NULL,
    nom TEXT NOT NULL,
    nomsalle TEXT,
    adressesalle1 TEXT,
    adressesalle2 TEXT,
    adressesalle3 TEXT,
    codepsalle TEXT,
    villesalle TEXT,
    web TEXT,
    nomcor TEXT,
    prenomcor TEXT,
    mailcor TEXT,
    telcor TEXT,
    latitude TEXT,
    longitude TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and allow public read access
ALTER TABLE public.club_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access for club_info" ON public.club_info FOR SELECT USING (true);
CREATE TRIGGER update_club_info_modtime BEFORE UPDATE ON public.club_info FOR EACH ROW EXECUTE PROCEDURE update_modified_column();


-- 2. Add fftt_id to teams
ALTER TABLE public.teams ADD COLUMN fftt_id TEXT UNIQUE;


-- 3. Add fftt_id to team_matches
ALTER TABLE public.team_matches ADD COLUMN fftt_id TEXT UNIQUE;
