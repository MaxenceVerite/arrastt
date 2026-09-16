-- Migration 00007: Add featured news support and cleanup mock data
-- Adds the is_featured column to the news table.
-- Deletes the old mocked news.

ALTER TABLE public.news ADD COLUMN is_featured BOOLEAN NOT NULL DEFAULT false;

-- Clean up mock news (if they exist)
DELETE FROM public.news WHERE slug IN ('victoire-equipe-1', 'tournoi-rentree-2023');
