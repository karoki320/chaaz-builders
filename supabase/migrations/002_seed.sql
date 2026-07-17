insert into categories (name, slug, icon, description) values
  ('Cement', 'cement', '🪨', 'Cement and concrete materials'),
  ('Steel', 'steel', '🔩', 'Steel and iron products'),
  ('Plumbing', 'plumbing', '🚿', 'Plumbing fixtures and pipes'),
  ('Bathroom', 'bathroom', '🛁', 'Bathroom fittings and accessories'),
  ('Paint', 'paint', '🎨', 'Paints and coatings'),
  ('Tiles', 'tiles', '🟫', 'Tiles and flooring'),
  ('Tools', 'tools', '🔧', 'Tools and equipment')
on conflict (name) do nothing;
