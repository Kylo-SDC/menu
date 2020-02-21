/* eslint-disable max-len */
require('newrelic');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const db = require('./../database');
const db = require('../database/sql/queries.js');

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ///////////////////////////////////////////////////////////

// CREATE

// restaurant

app.post('/api/restaurant', (req, res) => {
  const { restaurantName } = req.body;
  db.createRestaurant(restaurantName, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// menu

app.post('/api/menu/:restaurantId', (req, res) => {
  let { restaurantId } = req.params;
  restaurantId = Number(restaurantId);
  const { menuName, menuDescription } = req.body;
  db.createMenu(restaurantId, menuName, menuDescription, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// section

app.post('/api/section/:restaurantId/:menuId', (req, res) => {
  const { sectionName } = req.body;
  let { restaurantId, menuId } = req.params;
  restaurantId = Number(restaurantId);
  menuId = Number(menuId);
  db.createSection(restaurantId, menuId, sectionName, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// item

app.post('/api/item/:restaurantId/:menuId/:sectionId', (req, res) => {
  const { itemName, itemPrice, itemDescription } = req.body;
  let { restaurantId, menuId, sectionId } = req.params;
  restaurantId = Number(restaurantId);
  menuId = Number(menuId);
  sectionId = Number(sectionId);
  db.createItem(restaurantId, menuId, sectionId, itemName, itemPrice, itemDescription, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// ///////////////////////////////////////////////////////////

// READ

// get restaurant and all restaurant info (menus, sections, items)

app.get('/api/restaurant/:restaurantId', (req, res) => {
  let { restaurantId } = req.params;
  restaurantId = Number(restaurantId);
  db.getRestaurant(restaurantId, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// get restaurant name

app.get('/api/restaurantTitle/:restaurantId', (req, res) => {
  let { restaurantId } = req.params;
  restaurantId = Number(restaurantId);
  db.getRestaurantTitle(restaurantId, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// menu name and description

app.get('/api/menu/:restaurantId/:menuId', (req, res) => {
  const { restaurantId, menuId } = req.params;
  // restaurantId = restaurantId;
  // menuId = menuId;
  db.getMenu(restaurantId, menuId, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// section name

app.get('/api/section/:restaurantId/:menuId/:sectionId', (req, res) => {
  let { restaurantId, menuId, sectionId } = req.params;
  restaurantId = Number(restaurantId);
  menuId = Number(menuId);
  sectionId = Number(sectionId);
  db.getSection(restaurantId, menuId, sectionId, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// item name, price, and description

app.get('/api/item/:restaurantId/:menuId/:sectionId/:itemId', (req, res) => {
  let {
    restaurantId, menuId, sectionId, itemId,
  } = req.params;
  console.log('hello');
  restaurantId = Number(restaurantId);
  menuId = Number(menuId);
  sectionId = Number(sectionId);
  itemId = Number(itemId);

  db.getItem(restaurantId, menuId, sectionId, itemId, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// ///////////////////////////////////////////////////////////

// UPDATE

// update restaurant name

app.patch('/api/restaurant/:restaurantId', (req, res) => {
  const { restaurantName } = req.body;
  let { restaurantId } = req.params;
  restaurantId = Number(restaurantId);
  db.updateRestaurant(restaurantId, restaurantName, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// update menu name and description

app.patch('/api/menu/:restaurantId/:menuId', (req, res) => {
  const { menuName, menuDescription } = req.body;
  let { restaurantId, menuId } = req.params;
  restaurantId = Number(restaurantId);
  menuId = Number(menuId);

  db.updateMenu(restaurantId, menuId, menuName, menuDescription, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// update section name

app.patch('/api/section/:restaurantId/:menuId/:sectionId', (req, res) => {
  const { sectionName } = req.body;
  let { restaurantId, menuId, sectionId } = req.params;
  restaurantId = Number(restaurantId);
  menuId = Number(menuId);
  sectionId = Number(sectionId);

  db.updateSection(restaurantId, menuId, sectionId, sectionName, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// update item name, price, and description

app.patch('/api/item/:restaurantId/:menuId/:sectionId/:itemId', (req, res) => {
  const { itemName, itemPrice, itemDescription } = req.body;
  let {
    restaurantId, menuId, sectionId, itemId,
  } = req.params;

  restaurantId = Number(restaurantId);
  menuId = Number(menuId);
  sectionId = Number(sectionId);
  itemId = Number(itemId);

  db.updateItem(restaurantId, menuId, sectionId, itemId, itemName, itemPrice, itemDescription, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// ///////////////////////////////////////////////////////////

// DELETE

// delete a restaurant

app.delete('/api/restaurant/:restaurantId', (req, res) => {
  let { restaurantId } = req.params;
  restaurantId = Number(restaurantId);

  db.deleteRestaurant(restaurantId, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// delete a menu

app.delete('/api/menu/:menuId', (req, res) => {
  let { menuId } = req.params;
  menuId = Number(menuId);

  db.deleteMenu(menuId, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// delete a section

app.delete('/api/section/:sectionId', (req, res) => {
  let { sectionId } = req.params;
  sectionId = Number(sectionId);

  db.deleteSection(sectionId, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// delete an item

app.delete('/api/item/:itemId', (req, res) => {
  let { itemId } = req.params;
  itemId = Number(itemId);

  db.deleteItem(itemId, (err, result) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(200).json(result);
  });
});

// ///////////////////////////////////////////////////////////

// original routes of inhereited repo below

// /////////////////////////////////////////////////////
app.get('/getmenu/:id', (req, res) => {
  console.log(`menu requesting id = ${req.params.id}`);
  db.getRestaurantMenu(req.params.id, (restaurant) => {
    res.status(200).json(restaurant);
  });
});

app.get('/gettitle/:id', (req, res) => {
  console.log(`title requesting id = ${req.params.id}`);
  db.getTitle(req.params.id, (restaurant) => {
    console.log(req.headers);
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.status(200).json(restaurant);
  });
});

const port = (process.env.PORT ? process.env.PORT : 8000);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
