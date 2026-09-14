-- Migration 00003: Admin Auth and CMS Tables

-- 1. Admins Table
CREATE TABLE public.admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a default admin account (password is 'admin123' - hash to be managed by app logic, using raw for simplicity here or bcrypt in app)
-- In a real app, you would hash it. For this mockup, we'll store a plain text password 'admin123' and check it directly in the login action for simplicity, or we can use a basic hash.
INSERT INTO public.admins (email, password_hash) VALUES ('admin@arrastt.fr', 'admin123');

-- 2. Site Content Table (Mini-CMS)
CREATE TABLE public.site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key TEXT UNIQUE NOT NULL,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default site content (The club carousel images)
INSERT INTO public.site_content (section_key, content) VALUES (
    'club_carousel',
    '["/medias/devanture_salle_vandamme.jpg", "/medias/image_club_arrastt_1.jpg", "/medias/image_club_arrastt_2.jpg", "/medias/image_club_arrastt_3.jpg", "/medias/image_club_arrastt_4.jpg"]'::jsonb
);

-- 3. RLS Policies
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Admins table shouldn't be readable by public
-- Site content should be readable by public
CREATE POLICY "Allow public read-only access for site_content" ON public.site_content FOR SELECT USING (true);

-- 4. Triggers
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admins_modtime BEFORE UPDATE ON public.admins FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_site_content_modtime BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
