-- New products from Chaaz Builders photos (Nov 2026).
-- Prices are 0 for now: the site shows "Ask for price" until a price is set in admin.
-- Safe to run more than once: products whose slug already exists are skipped.

insert into categories (name, slug, icon, description)
select 'Door Locks', 'door-locks', null, 'Mortise door locks, lever handles and door hardware'
where not exists (select 1 from categories where slug = 'door-locks');

insert into products (name, slug, category_id, price, stock, description, image_url, images)
select v.name, v.slug, c.id, 0, 10, v.description, v.image_url, v.images::jsonb
from (values
  ('VK603 Close-Coupled Toilet', 'vk603-close-coupled-toilet', 'bathroom', 'Modern close-coupled toilet with square design and soft-close seat. Model VK603.', '/products/vk603-close-coupled-toilet-1.jpg', '[]'),
  ('VK602 Close-Coupled Toilet', 'vk602-close-coupled-toilet', 'bathroom', 'Close-coupled toilet with smooth rounded lines and slim soft-close seat. Model VK602.', '/products/vk602-close-coupled-toilet-1.jpg', '[]'),
  ('Standard Close-Coupled Toilet', 'standard-close-coupled-toilet', 'bathroom', 'Classic white close-coupled toilet with cistern and seat - a reliable everyday choice.', '/products/standard-close-coupled-toilet-1.jpg', '[]'),
  ('Frencia Rimless Close-Coupled Toilet', 'frencia-rimless-close-coupled-toilet', 'bathroom', 'Frencia rimless toilet for easier cleaning, with slim soft-close seat.', '/products/frencia-rimless-close-coupled-toilet-1.jpg', '[]'),
  ('Frencia Close-Coupled Toilet', 'frencia-close-coupled-toilet', 'bathroom', 'Frencia close-coupled toilet with cistern and soft-close seat.', '/products/frencia-close-coupled-toilet-1.jpg', '["/products/frencia-close-coupled-toilet-2.jpg"]'),
  ('Homart One-Piece Toilet', 'homart-one-piece-toilet', 'bathroom', 'Homart one-piece toilet with smooth curves and soft-close seat.', '/products/homart-one-piece-toilet-1.jpg', '[]'),
  ('Homart Square Close-Coupled Toilet', 'homart-square-close-coupled-toilet', 'bathroom', 'Homart close-coupled toilet with square design and soft-close seat.', '/products/homart-square-close-coupled-toilet-1.jpg', '[]'),
  ('Rimless Close-Coupled Toilet - Square Seat', 'rimless-close-coupled-toilet-square-seat', 'bathroom', 'Rimless close-coupled toilet with square soft-close seat.', '/products/rimless-close-coupled-toilet-square-seat-1.jpg', '[]'),
  ('Rimless Close-Coupled Toilet - Round Seat', 'rimless-close-coupled-toilet-round-seat', 'bathroom', 'Rimless close-coupled toilet with rounded soft-close seat.', '/products/rimless-close-coupled-toilet-round-seat-1.jpg', '[]'),
  ('Wall-Hung Urinal with Flush Valve', 'wall-hung-urinal-with-flush-valve', 'bathroom', 'Ceramic wall-hung urinal supplied with chrome flush valve.', '/products/wall-hung-urinal-with-flush-valve-1.jpg', '["/products/wall-hung-urinal-with-flush-valve-2.jpg"]'),
  ('Wall-Hung Ceramic Urinal', 'wall-hung-ceramic-urinal', 'bathroom', 'White ceramic wall-hung urinal bowl.', '/products/wall-hung-ceramic-urinal-1.jpg', '[]'),
  ('Compact Wall-Hung Vanity with Mirror', 'compact-wall-hung-vanity-with-mirror', 'bathroom', 'Compact white wall-hung vanity cabinet with basin, tap and mirror - ideal for small bathrooms.', '/products/compact-wall-hung-vanity-with-mirror-1.jpg', '[]'),
  ('Grey Bathroom Vanity with Mirror Cabinet', 'grey-bathroom-vanity-with-mirror-cabinet', 'bathroom', 'Grey wall-hung vanity with basin, storage doors and matching mirror cabinet.', '/products/grey-bathroom-vanity-with-mirror-cabinet-1.jpg', '["/products/grey-bathroom-vanity-with-mirror-cabinet-2.jpg"]'),
  ('Wood-Finish Bathroom Vanity with Mirror Cabinet', 'wood-finish-bathroom-vanity-with-mirror-cabinet', 'bathroom', 'Light wood-finish wall-hung vanity with basin and mirror cabinet with open shelf.', '/products/wood-finish-bathroom-vanity-with-mirror-cabinet-1.jpg', '[]'),
  ('White & Navy Bathroom Vanity with Mirror Cabinet', 'white-navy-bathroom-vanity-with-mirror-cabinet', 'bathroom', 'White vanity with navy trim, basin and mirror cabinet with open shelf.', '/products/white-navy-bathroom-vanity-with-mirror-cabinet-1.jpg', '[]'),
  ('Brown Wood-Grain Pedestal Basin', 'brown-wood-grain-pedestal-basin', 'bathroom', 'One-piece freestanding pedestal basin in a brown wood-grain finish.', '/products/brown-wood-grain-pedestal-basin-1.jpg', '[]'),
  ('Black & White Striped Pedestal Basin', 'black-white-striped-pedestal-basin', 'bathroom', 'One-piece pedestal basin with black bowl and white striped column.', '/products/black-white-striped-pedestal-basin-1.jpg', '[]'),
  ('Stone-Effect Square Pedestal Basin', 'stone-effect-square-pedestal-basin', 'bathroom', 'Square one-piece pedestal basin with natural stone-effect finish.', '/products/stone-effect-square-pedestal-basin-1.jpg', '[]'),
  ('White & Gold Pedestal Basin', 'white-gold-pedestal-basin', 'bathroom', 'Pedestal basin with black bowl and white body with gold vein detail.', '/products/white-gold-pedestal-basin-1.jpg', '[]'),
  ('White Marble-Effect Square Pedestal Basin', 'white-marble-effect-square-pedestal-basin', 'bathroom', 'Square one-piece pedestal basin in white marble effect with dark veins.', '/products/white-marble-effect-square-pedestal-basin-1.jpg', '[]'),
  ('Black & Gold Striped Pedestal Basin', 'black-gold-striped-pedestal-basin', 'bathroom', 'One-piece black pedestal basin with gold rings.', '/products/black-gold-striped-pedestal-basin-1.jpg', '[]'),
  ('Wood-Pattern Pedestal Basin', 'wood-pattern-pedestal-basin', 'bathroom', 'Two-tone pedestal basin with wood-pattern bowl and base and white centre.', '/products/wood-pattern-pedestal-basin-1.jpg', '[]'),
  ('Freestanding Acrylic Bathtub', 'freestanding-acrylic-bathtub', 'bathroom', 'Modern freestanding acrylic bathtub with tap holes.', '/products/freestanding-acrylic-bathtub-1.jpg', '[]'),
  ('Clawfoot Bathtub', 'clawfoot-bathtub', 'bathroom', 'Classic freestanding clawfoot bathtub with gold feet.', '/products/clawfoot-bathtub-1.jpg', '[]'),
  ('Instant Shower Heater with Rain Shower Set', 'instant-shower-heater-with-rain-shower-set', 'bathroom', 'Electric instant shower heater with rain shower head, hand shower and slide rail.', '/products/instant-shower-heater-with-rain-shower-set-1.jpg', '[]'),
  ('LED Oval Bathroom Mirror', 'led-oval-bathroom-mirror', 'bathroom', 'Oval bathroom mirror with warm LED backlight.', '/products/led-oval-bathroom-mirror-1.jpg', '[]'),
  ('Automatic Sensor Soap Dispenser', 'automatic-sensor-soap-dispenser', 'bathroom', 'Touchless wall-mounted soap dispenser with motion sensor.', '/products/automatic-sensor-soap-dispenser-1.jpg', '["/products/automatic-sensor-soap-dispenser-2.jpg"]'),
  ('BOBO Wall-Mounted Soap Dispenser', 'bobo-wall-mounted-soap-dispenser', 'bathroom', 'BOBO refillable wall-mounted soap dispenser with push button and level window.', '/products/bobo-wall-mounted-soap-dispenser-1.jpg', '["/products/bobo-wall-mounted-soap-dispenser-2.jpg", "/products/bobo-wall-mounted-soap-dispenser-3.jpg"]'),
  ('BOBO Rounded Soap Dispenser', 'bobo-rounded-soap-dispenser', 'bathroom', 'BOBO wall-mounted soap dispenser with rounded design and push button.', '/products/bobo-rounded-soap-dispenser-1.jpg', '["/products/bobo-rounded-soap-dispenser-2.jpg"]'),
  ('Paper Towel Dispenser', 'paper-towel-dispenser', 'bathroom', 'Wall-mounted paper towel dispenser in white.', '/products/paper-towel-dispenser-1.jpg', '[]'),
  ('Toilet Paper Holder with Cover', 'toilet-paper-holder-with-cover', 'bathroom', 'White wall-mounted toilet paper holder with flip cover.', '/products/toilet-paper-holder-with-cover-1.jpg', '["/products/toilet-paper-holder-with-cover-2.jpg"]'),
  ('Toilet Cistern Flush Valve', 'toilet-cistern-flush-valve', 'plumbing', 'Replacement flush valve mechanism for toilet cisterns.', '/products/toilet-cistern-flush-valve-1.jpg', '["/products/toilet-cistern-flush-valve-2.jpg"]'),
  ('Single-Bowl Stainless Steel Kitchen Sink', 'single-bowl-stainless-steel-kitchen-sink', 'plumbing', 'Square single-bowl stainless steel kitchen sink.', '/products/single-bowl-stainless-steel-kitchen-sink-1.jpg', '[]'),
  ('Double-Bowl Stainless Steel Kitchen Sink F01', 'double-bowl-stainless-steel-kitchen-sink-f01', 'plumbing', 'Double-bowl stainless steel kitchen sink. Model F01.', '/products/double-bowl-stainless-steel-kitchen-sink-f01-1.jpg', '[]'),
  ('Double-Bowl Stainless Steel Kitchen Sink 216', 'double-bowl-stainless-steel-kitchen-sink-216', 'plumbing', 'Double-bowl stainless steel kitchen sink. Model 216.', '/products/double-bowl-stainless-steel-kitchen-sink-216-1.jpg', '[]'),
  ('Wall-Mounted Flexible Kitchen Tap', 'wall-mounted-flexible-kitchen-tap', 'plumbing', 'Wall-mounted kitchen tap with flexible spout - available in stainless and black.', '/products/wall-mounted-flexible-kitchen-tap-1.jpg', '["/products/wall-mounted-flexible-kitchen-tap-2.jpg"]'),
  ('PVC Drainage Junction', 'pvc-drainage-junction', 'plumbing', 'Grey PVC drainage junction fitting for soil and waste pipework.', '/products/pvc-drainage-junction-1.jpg', '["/products/pvc-drainage-junction-2.jpg"]'),
  ('TOTAL Submersible Water Pump', 'total-submersible-water-pump', 'plumbing', 'TOTAL submersible pump for clean water - wells, tanks and boreholes.', '/products/total-submersible-water-pump-1.jpg', '[]'),
  ('Gold Mortise Lever Lock Set', 'gold-mortise-lever-lock-set', 'door-locks', 'Gold-finish mortise door lock with ornate lever handles and keys.', '/products/gold-mortise-lever-lock-set-1.jpg', '[]'),
  ('Satin Nickel Mortise Lever Lock Set', 'satin-nickel-mortise-lever-lock-set', 'door-locks', 'Satin nickel mortise door lock with long backplate, lever handles and keys.', '/products/satin-nickel-mortise-lever-lock-set-1.jpg', '[]'),
  ('Antique Brass Ornate Lever Lock Set', 'antique-brass-ornate-lever-lock-set', 'door-locks', 'Antique brass mortise lock with decorative scroll lever handles and keys.', '/products/antique-brass-ornate-lever-lock-set-1.jpg', '["/products/antique-brass-ornate-lever-lock-set-2.jpg"]'),
  ('Genesis Bond Straight Lever Lock Set', 'genesis-bond-straight-lever-lock-set', 'door-locks', 'Genesis Bond mortise lock with straight lever handles and keys.', '/products/genesis-bond-straight-lever-lock-set-1.jpg', '[]'),
  ('Genesis Bond Curved Lever Lock Set', 'genesis-bond-curved-lever-lock-set', 'door-locks', 'Genesis Bond mortise lock with curved lever handles and keys.', '/products/genesis-bond-curved-lever-lock-set-1.jpg', '[]')
) as v(name, slug, category_slug, description, image_url, images)
join categories c on c.slug = v.category_slug
where not exists (select 1 from products p where p.slug = v.slug);
