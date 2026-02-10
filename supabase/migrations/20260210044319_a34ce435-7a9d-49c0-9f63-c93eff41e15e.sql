
-- Add English translation columns to recipes table
ALTER TABLE public.recipes ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE public.recipes ADD COLUMN IF NOT EXISTS description_en TEXT;
