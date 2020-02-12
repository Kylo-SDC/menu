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

// app.post('/menu', (req, res) => {
//   db.createData(req.body, (response) => {
//     res.status(200).json(response);
//   });
// });

// READ

app.get('/menu/:id', (req, res) => {
  console.log(`menu requesting id = ${req.params.id}`);
  db.getRestaurantMenu(req.params.id, (restaurant) => {
    res.status(200).json(restaurant);
  });
});

// UPDATE

// app.patch('/menu/:id', (req, res) => {
//   db.updateData(req.params.id, req.body, (response) => {
//     res.status(200).json(response);
//   });
// });

// DELETE

// app.delete('/menu/:id', (req, res) => {
//   db.deleteData(req.params.id, (response) => {
//     res.status(200).json(response);
//   });
// });

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
