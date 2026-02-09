
-- Add English translation columns to articles table
ALTER TABLE public.articles ADD COLUMN title_en TEXT;
ALTER TABLE public.articles ADD COLUMN excerpt_en TEXT;
ALTER TABLE public.articles ADD COLUMN content_en TEXT;
