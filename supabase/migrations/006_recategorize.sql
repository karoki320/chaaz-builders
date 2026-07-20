-- Replace the "Cement" category with "Irrigation Tools".
-- Renaming in place (rather than delete+insert) keeps any products already
-- assigned to this category intact - they'll just show under the new name.
update categories
set name = 'Irrigation Tools',
    slug = 'irrigation-tools',
    icon = '💧',
    description = 'Irrigation pipes, sprinklers, and watering tools'
where slug = 'cement';

-- If "Cement" was never seeded on this database for some reason, add
-- Irrigation Tools fresh instead.
insert into categories (name, slug, icon, description)
select 'Irrigation Tools', 'irrigation-tools', '💧', 'Irrigation pipes, sprinklers, and watering tools'
where not exists (select 1 from categories where slug = 'irrigation-tools');
