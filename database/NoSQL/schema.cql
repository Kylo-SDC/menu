DROP KEYSPACE [IF EXISTS] sdc;

CREATE KEYSPACE sdc;

USE sdc;

CREATE TABLE restaurants (
  restaurant_id int,
  restaurant_name text,
  PRIMARY KEY (restaurant_id)
);
CREATE TABLE menus (
  menu_id int,
  menu_name text,
  menu_description text,
  restaurant_id int,
  PRIMARY KEY (restaurant_id)

);
CREATE TABLE sections (
  section_id int,
  section_name text,
  restaurant_id int,
  menu_id int,
  PRIMARY KEY (restaurant_id)
);
CREATE TABLE items (
  item_id int,
  item_name text,
  item_price text,
  item_description text,
  restaurant_id int,
  menu_id int,
  section_id int,
  PRIMARY KEY (restaurant_id)
);

COPY restaurants(restaurant_id,restaurant_name)
FROM '/Users/nas/Documents/sdc/menu/database/restaurants.csv' WITH HEADER = TRUE;

COPY menus(restaurant_id,menu_id,menu_name,menu_description)
FROM '/Users/nas/Documents/sdc/menu/database/menus.csv' WITH HEADER = TRUE;

COPY sections(restaurant_id,menu_id,section_id,section_name)
FROM '/Users/nas/Documents/sdc/menu/database/sections.csv' WITH HEADER = TRUE;

COPY items(restaurant_id,menu_id,section_id,item_id,item_name,item_price,item_description)
FROM '/Users/nas/Documents/sdc/menu/database/items.csv' WITH HEADER = TRUE;

