DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\c sdc;

CREATE TABLE restaurants
(
  restaurant_id SERIAL PRIMARY KEY,
  restaurant_name TEXT
);

CREATE TABLE menus
(
  menu_id  SERIAL,
  menu_name TEXT,
  menu_description TEXT,
  restaurant_id SERIAL
);

CREATE TABLE sections
(
  section_id SERIAL,
  section_name TEXT,
  restaurant_id SERIAL,
  menu_id SERIAL
);

CREATE TABLE items
(
  item_id SERIAL,
  item_name TEXT,
  item_price TEXT,
  item_description TEXT,
  restaurant_id SERIAL,
  menu_id SERIAL,
  section_id SERIAL
);


COPY restaurants(restaurant_id,restaurant_name) FROM '/Users/nas/Documents/sdc/menu/database/restaurants.csv' DELIMITER ',' CSV HEADER;

COPY menus(restaurant_id,menu_id,menu_name,menu_description) FROM '/Users/nas/Documents/sdc/menu/database/menus.csv' DELIMITER ',' CSV HEADER;

COPY sections(restaurant_id,menu_id,section_id,section_name) FROM '/Users/nas/Documents/sdc/menu/database/sections.csv' DELIMITER ',' CSV HEADER;

COPY items(restaurant_id,menu_id,section_id,item_id,item_name,item_price,item_description) FROM '/Users/nas/Documents/sdc/menu/database/items.csv' DELIMITER ',' CSV HEADER;




