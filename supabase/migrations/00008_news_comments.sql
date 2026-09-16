-- Migration 00008: Add news comments table
-- Adds the news_comments table to allow authenticated players to comment on news articles.

CREATE TABLE public.news_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    news_id UUID NOT NULL REFERENCES public.news(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_news_comments_news_id ON public.news_comments(news_id);
CREATE INDEX idx_news_comments_user_id ON public.news_comments(user_id);

-- RLS Policies
ALTER TABLE public.news_comments ENABLE ROW LEVEL SECURITY;

-- Anyone can view comments
CREATE POLICY "Les commentaires sont publics" ON public.news_comments
    FOR SELECT USING (true);

-- Authenticated users can insert comments
CREATE POLICY "Les joueurs connectés peuvent commenter" ON public.news_comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "Les joueurs peuvent supprimer leurs commentaires" ON public.news_comments
    FOR DELETE USING (auth.uid() = user_id);
