INSERT INTO public.categories (name, sort_order) VALUES
  ('Grains', 1),
  ('Oil & Ghee', 2),
  ('Spices', 3),
  ('Daily Use', 4),
  ('Rice', 5)
ON CONFLICT DO NOTHING;
