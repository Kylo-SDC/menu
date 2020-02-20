const mongoose = require('mongoose');
const restaurantSchema = require('./schema.js');

mongoose.connect('mongodb://localhost/menus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const Restaurants = mongoose.model('restaurants', restaurantSchema);

const getRestaurantMenu = (id, cb) => {
  Restaurants.find({ id }, (err, restaurant) => {
    if (err) {
      return console.log(err);
    }
    return cb(restaurant);
  });
};

const getTitle = (id, cb) => {
  Restaurants.find({ id }, (err, restaurant) => {
    if (err) {
      return console.log(err);
    }
    return cb(restaurant[0].restaurant);
  });
};
/////////////////////////////////////////////////////

const createRestaurant = (restaurant, callback) => {
  Restaurants.create(restaurant)
    .then((response) => {
      callback(null, response);
    });
};

const getAMenu = (restId, callback) => {
  Restaurants.find({ id: `${restId}` })
    .then((restaurant) => {
      callback(null, restaurant[0].menus);
    });
};

const deleteRestaurant = (restId, callback) => {

  Restaurants.deleteOne({ id: `${restId}` })
    .then((restaurant) => {
      callback(null, restaurant);
    });
};

const updateRestaurantName = (restId, newName, callback) => {
  Restaurants.findOneAndUpdate({ id: `${restId}` }, { restaurant: `${newName}` })
    .then((response) => {
      callback(null, response);
    });
};

module.exports.getRestaurantMenu = getRestaurantMenu;
module.exports.getTitle = getTitle;
module.exports.createRestaurant = createRestaurant;
module.exports.getAMenu = getAMenu;
module.exports.deleteRestaurant = deleteRestaurant;
module.exports.updateRestaurantName = updateRestaurantName;
