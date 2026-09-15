-- Table for storing individual player matches (from xml_partie.php)
CREATE TABLE player_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_number TEXT NOT NULL REFERENCES players(license_number) ON DELETE CASCADE,
    idpartie TEXT NOT NULL,
    vd TEXT NOT NULL, -- 'V' or 'D'
    opponent_name TEXT,
    opponent_license TEXT,
    opponent_ranking TEXT,
    match_date DATE,
    point_result NUMERIC,
    coefficient NUMERIC,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(license_number, idpartie)
);

-- Table for storing player ranking progression (from xml_histo_classement.php)
CREATE TABLE player_rankings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_number TEXT NOT NULL REFERENCES players(license_number) ON DELETE CASCADE,
    saison TEXT NOT NULL,
    phase TEXT NOT NULL, -- usually '1' or '2'
    points NUMERIC NOT NULL,
    rank TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(license_number, saison, phase)
);

-- Add RLS policies
ALTER TABLE player_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_rankings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to matches and rankings
CREATE POLICY "Public matches viewable by everyone" ON player_matches FOR SELECT USING (true);
CREATE POLICY "Public rankings viewable by everyone" ON player_rankings FOR SELECT USING (true);

-- Trigger to update updated_at
CREATE TRIGGER update_player_matches_modtime
BEFORE UPDATE ON player_matches
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_player_rankings_modtime
BEFORE UPDATE ON player_rankings
FOR EACH ROW EXECUTE FUNCTION update_modified_column();
