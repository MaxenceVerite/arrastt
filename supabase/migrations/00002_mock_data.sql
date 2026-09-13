-- Migration 00002: Mock Data for Development

-- Insert Teams
INSERT INTO public.teams (id, name, division, pool) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Arras TT 1', 'Nationale 3', 'Poule A'),
    ('22222222-2222-2222-2222-222222222222', 'Arras TT 2', 'Régionale 1', 'Poule C'),
    ('33333333-3333-3333-3333-333333333333', 'Arras TT 3', 'Départementale 1', 'Poule B');

-- Insert Players
INSERT INTO public.players (license_number, first_name, last_name, points, category) VALUES
    ('6212345', 'Jean', 'Dupont', 1850, 'S'),
    ('6254321', 'Marie', 'Martin', 1420, 'V1'),
    ('6298765', 'Lucas', 'Bernard', 950, 'J2');

-- Insert Matches
INSERT INTO public.team_matches (team_id, opponent_name, match_date, is_home, score_arras, score_opponent, result) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Lille Métropole TT', '2023-09-15 15:00:00', true, 8, 6, 'victory'),
    ('22222222-2222-2222-2222-222222222222', 'Amiens STT', '2023-09-22 14:00:00', false, 7, 7, 'draw');

-- Insert News
INSERT INTO public.news (title, slug, content, excerpt, category, image_url) VALUES
    ('Victoire de l''équipe 1', 'victoire-equipe-1', 'Superbe victoire de notre équipe première ce week-end...', 'Résumé de la première journée de championnat.', 'results', 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&q=80&w=800'),
    ('Tournoi de rentrée', 'tournoi-rentree-2023', 'Le club organise son traditionnel tournoi de rentrée le...', 'Inscrivez-vous vite au tournoi de rentrée !', 'tournament', 'https://images.unsplash.com/photo-1511067007398-7e4b90cfa4b4?auto=format&fit=crop&q=80&w=800');
