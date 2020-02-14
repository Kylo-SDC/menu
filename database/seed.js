/* eslint-disable import/order */
const process = require('process');
const generateData = require('./genData.js');
const mongoose = require('mongoose');
const restaurantSchema = require('./schema.js');

mongoose.connect('mongodb://localhost/menus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const records = generateData();
const Restaurants = mongoose.model('restaurants', restaurantSchema);
// remove all records and add all records in the array
Restaurants.remove({}, (err1) => {
  if (err1) {
    return console.log(err1);
  }
  Restaurants.collection.insert(records, (err2) => {
    if (err2) {
      return console.log(err2);
    }
    console.log('Complete');
    return process.exit(0);
  });
  return null;
});
