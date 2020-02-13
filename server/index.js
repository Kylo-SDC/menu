const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./../database');

// const db = require('../database/NoSQL');
// const db = require('../database/SQL');

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// CREATE

app.post('/menu', (req, res) => {
  db.createRestaurant(req.body, (err, response) => {
    if (err) {
      res.status(404).send('Error posting restaurant');
      return;
    }
    res.status(200).json(response);
  });
});

// READ
app.get('/menu/:restId', (req, res) => {
  const { restId } = req.params;
  console.log(restId);
  db.getAMenu(restId, (err, menus) => {
    if (err) {
      res.status(404).send('Error getting menus');
      return;
    }
    res.status(200).json(menus);
  });
});


// UPDATE

app.patch('/menu/:id', (req, res) => {
  console.log(req.body);
  db.updateRestaurantName(req.params.id, req.body.name, (err, response) => {
    if (err) {
      res.status(404).send('Couldnt update restaurant name');
      return;
    }
    res.status(200).json(response);
  });
});

// DELETE

app.delete('/menu/:id', (req, res) => {
  console.log('hello', req.params.id);
  db.deleteRestaurant(req.params.id, (err, response) => {
    if (err) {
      res.status(404).send('Error deleting restaurant');
      return;
    }
    res.status(200).json(response);
  });
});

/////////////////////////////////////////////////////
app.get('/getmenu/:id', (req, res) => {
  console.log(`menu requesting id = ${req.params.id}`);
  db.getRestaurantMenu(req.params.id, (restaurant) => {
    res.status(200).json(restaurant);
  });
});

app.get('/gettitle/:id', (req, res) => {
  console.log(`title requesting id = ${req.params.id}`);
  db.getRestaurantTitle(req.params.id, (restaurant) => {
    console.log(req.headers);
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.status(200).json(restaurant);
  });
});

const port = (process.env.PORT ? process.env.PORT : 8000);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
