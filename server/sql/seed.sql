-- ============================================================================
-- STARTER DATA — only inserted when the products table is empty.
-- The stock numbers are sample values; change them to your real stock.
-- ============================================================================

insert into products (name, type, category, price, image_url, stock, sort_order, gallery)
select * from (values
  ('Brown''s Blanket', 'Matte Sticker', 'stickers', 300, '/products/browns-blanket.jpg', 10, 1,
    array['/products/browns-blanket-art.jpg', '/products/browns-blanket-photo.jpg']),
  ('Lemon Plushie',    'Matte Sticker', 'stickers', 300, '/products/lemon-plushie.jpg',  10, 2, '{}'::text[]),
  ('Pet Goat',         'Matte Sticker', 'stickers', 300, '/products/pet-goat.jpg',       10, 3, '{}'::text[]),
  ('Lemon Juice',      'Matte Sticker', 'stickers', 300, '/products/lemon-juice.jpg',    10, 4, '{}'::text[])
) as v(name, type, category, price, image_url, stock, sort_order, gallery)
where not exists (select 1 from products);
