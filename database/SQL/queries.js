/* eslint-disable max-len */
// require pool connection
const pool = require('./index.js');

// CREATE

// create new restaurant
const createRestaurant = (restaurantName, callback) => {
  pool.query('insert into restaurants (restaurant_name) values ($1)', [restaurantName], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

// create new menu in existing restaurant
const createMenu = (restaurantId, menuName, menuDescription, callback) => {
  pool.query('INSERT INTO menus (menu_name,menu_description,restaurant_id) VALUES ($1,$2,$3)', [menuName, menuDescription, restaurantId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

// create new menu section in existing menu
const createSection = (restaurantId, menuId, sectionName, callback) => {
  pool.query('INSERT INTO sections (section_name,restaurant_id,menu_id) VALUES ($1,$2,$3)', [sectionName, restaurantId, menuId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

// create new menu item in existing menu
const createItem = (restaurantId, menuId, sectionId, itemName, itemPrice, itemDescription, callback) => {
  pool.query('INSERT INTO items (item_name,item_price,item_description,restaurant_id,menu_id,section_id) VALUES ($1,$2,$3,$4,$5,$6)', [itemName, itemPrice, itemDescription, restaurantId, menuId, sectionId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

// READ

// get a restaurant and all associated menus, sections, and iems.

const getRestaurant = async (restaurantId, callback) => {
  const data = [];
  const storage = {};

  const restaurants = await pool.query('SELECT * FROM restaurants WHERE restaurant_id = $1', [restaurantId]);

  storage.id = restaurants.rows[0].restaurant_id;
  storage.restaurant = restaurants.rows[0].restaurant_name;
  storage.menus = [];

  const menus = await pool.query('SELECT * FROM menus WHERE restaurant_id = $1', [restaurantId]);

  menus.rows.forEach((el) => {
    const menu = {};
    menu.title = el.menu_name;
    menu.description = el.menu_description;
    menu.sections = [];
    storage.menus.push(menu);
  });

  const sections = await pool.query('SELECT * FROM sections WHERE restaurant_id = $1', [restaurantId]);

  sections.rows.forEach((el) => {
    const section = {};
    section.items = [];
    section.title = el.section_name;
    const menuIdx = el.menu_id - 1;
    storage.menus[menuIdx].sections.push(section);
  });

  const items = await pool.query('SELECT * FROM items WHERE restaurant_id = $1', [restaurantId]);

  items.rows.forEach((el) => {
    const item = {};
    item.title = el.item_name;
    item.price = el.item_price;
    item.description = el.item_description;
    const menuIdx = el.menu_id - 1;
    const sectionIdx = el.section_id - 1;
    storage.menus[menuIdx].sections[sectionIdx].items.push(item);
  });

  data.push(storage);
  callback(null, data);
};


// get menu name and description from existing restaurant

const getMenu = (restaurantId, menuId, callback) => {
  pool.query('SELECT menu_name, menu_description FROM menus WHERE (restaurant_id = $1 AND menu_id = $2)', [restaurantId, menuId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result.rows);
  });
};

// get section name from existing menu

const getSection = (restaurantId, menuId, sectionId, callback) => {
  pool.query('SELECT section_name FROM sections WHERE (restaurant_id = $1 AND menu_id = $2 AND section_id = $3)', [restaurantId, menuId, sectionId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result.rows);
  });
};

// get item name, price, and description from existing item

const getItem = (restaurantId, menuId, sectionId, itemId, callback) => {
  pool.query('SELECT item_name, item_price, item_description FROM items WHERE (restaurant_id = $1 AND menu_id = $2 AND section_id = $3 AND item_id = $4)', [restaurantId, menuId, sectionId, itemId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result.rows);
  });
};

// UPDATE

// update restaurant name

const updateRestaurant = (restaurantId, restaurantName, callback) => {
  pool.query('UPDATE restaurants SET restaurant_name = $1 WHERE restaurant_id = $2', [restaurantName, restaurantId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

// update menu name and description

const updateMenu = (restaurantId, menuId, menuName, menuDescription, callback) => {
  pool.query('UPDATE menus SET menu_name = $1, menu_description = $2 WHERE (restaurant_id = $3 AND menu_id = $4)', [menuName, menuDescription, restaurantId, menuId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

// update section name

const updateSection = (restaurantId, menuId, sectionId, sectionName, callback) => {
  pool.query('UPDATE sections SET section_name = $1 WHERE (restaurant_id = $2 AND menu_id = $3 AND section_id = $4)', [sectionName, restaurantId, menuId, sectionId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

// update item name, price, and description

const updateItem = (restaurantId, menuId, sectionId, itemId, itemName, itemPrice, itemDescription, callback) => {
  pool.query('UPDATE items SET item_name = $1, item_price = $2, item_description = $3 WHERE (restaurant_id = $4 AND menu_id = $5 AND section_id = $6 AND item_id = $7)', [itemName, itemPrice, itemDescription, restaurantId, menuId, sectionId, itemId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

// DELETE

// delete a restaurant

const deleteRestaurant = (restaurantId, callback) => {
  const response = [];

  pool.query('DELETE FROM restaurants WHERE restaurant_id = $1', [restaurantId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    response.push(result);
  });
  pool.query('DELETE FROM menus WHERE restaurant_id = $1', [restaurantId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    response.push(result);
  });
  pool.query('DELETE FROM sections WHERE restaurant_id = $1', [restaurantId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    response.push(result);
  });
  pool.query('DELETE FROM items WHERE restaurant_id = $1', [restaurantId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    response.push(result);
  });

  callback(null, response);
};

// delete a menu

const deleteMenu = (menuId, callback) => {
  const response = [];

  pool.query('DELETE FROM menus WHERE menu_id = $1', [menuId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    response.push(result);
  });
  pool.query('DELETE FROM sections WHERE menu_id = $1', [menuId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    response.push(result);
  });
  pool.query('DELETE FROM items WHERE menu_id = $1', [menuId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    response.push(result);
  });

  callback(null, response);
};

// delete a section

const deleteSection = (sectionId, callback) => {
  const response = [];

  pool.query('DELETE FROM sections WHERE section_id = $1', [sectionId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    response.push(result);
  });
  pool.query('DELETE FROM items WHERE section_id = $1', [sectionId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    response.push(result);
  });

  callback(null, response);
};

// delete item

const deleteItem = (itemId, callback) => {
  pool.query('DELETE FROM items WHERE item_id = $1', [itemId], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

module.exports = {
  createRestaurant,
  createMenu,
  createSection,
  createItem,
  getRestaurant,
  getMenu,
  getSection,
  getItem,
  updateRestaurant,
  updateMenu,
  updateSection,
  updateItem,
  deleteRestaurant,
  deleteMenu,
  deleteSection,
  deleteItem,
};
