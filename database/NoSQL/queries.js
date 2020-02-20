const cassie = require('./index.js');

cassie.execute('SELECT * FROM restaurants WHERE restaurant_id = 20', (err, result) => {
  const restaurant = result.first();
  console.log(restaurant);
});
