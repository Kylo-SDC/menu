
const fs = require('fs');
const faker = require('faker');

const restaurants = fs.createWriteStream('./database/restaurants.csv');
const menus = fs.createWriteStream('./database/menus.csv');
menus.write('restuarantId,menuTitle,description\n');
// Helper Functions
const randomItems = () => Math.floor(Math.random() * 6) + 4;
const randomSections = () => Math.floor(Math.random() * 3) + 1;

// create 100 records
const records = [];
const generateData = function () {
  for (let i = 0; i < 100; i += 1) {
    records[i] = {
      id: i + 1,
      restaurant: faker.random.words(),
      menus: [],
    };
    restaurants.write(`${records[i].id},${records[i].restaurant}\n`);
    for (let j = 0; j < 5; j += 1) {
      records[i].menus[j] = {
        title: faker.random.word(),
        description:
          `${faker.lorem.sentence()} ${faker.lorem.sentence()} ${faker.lorem.sentence()} ${faker.lorem.sentence()} ${faker.lorem.sentence()} ${faker.lorem.sentence()} ${faker.lorem.sentence()}`,
        sections: [],
      };
      menus.write(`${records[i].id},${records[i].menus[j].title},${records[i].menus[j].description}\n`);
      const sectionLength = randomSections();
      for (let k = 0; k < sectionLength; k += 1) {
        records[i].menus[j].sections[k] = {
          title: faker.random.words(),
          items: [],
        };
        const itemLength = randomItems();
        for (let l = 0; l < itemLength; l += 1) {
          records[i].menus[j].sections[k].items[l] = {
            title: faker.random.words(),
            price: `$${faker.finance.amount()}`,
            description:
              `${faker.lorem.sentence()}
              ${faker.lorem.sentence()}
              ${faker.lorem.sentence()}`,
          };
        }
      }
    }
  }
  return records;
};

generateData();

module.exports = generateData;
