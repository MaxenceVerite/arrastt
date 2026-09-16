-- Migration 00010: Add read policy for profiles
-- Allows anyone to read basic profile information so that commenter names can be displayed.

CREATE POLICY "Allow public read-only access for profiles" 
ON public.profiles 
FOR SELECT 
USING (true);
