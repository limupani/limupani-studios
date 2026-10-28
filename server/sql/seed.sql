-- ============================================================================
-- STARTER DATA — only inserted when the products table is empty.
-- The stock numbers are sample values; change them to your real stock.
-- ============================================================================

insert into products (name, type, category, price, image_url, stock, sort_order)
select * from (values
  ('Brown''s Blanket', 'Matte Sticker', 'stickers', 300, '/products/browns-blanket.jpg', 10, 1),
  ('Lemon Plushie',    'Matte Sticker', 'stickers', 300, '/products/lemon-plushie.jpg',  10, 2),
  ('Pet Goat',         'Matte Sticker', 'stickers', 300, '/products/pet-goat.jpg',       10, 3),
  ('Lemon Juice',      'Matte Sticker', 'stickers', 300, '/products/lemon-juice.jpg',    10, 4)
) as v(name, type, category, price, image_url, stock, sort_order)
where not exists (select 1 from products);
