
const faker = require('faker');
// Helper Functions
const randomItems = () => Math.floor(Math.random() * 6) + 4;
const randomSections = () => Math.floor(Math.random() * 3) + 1;

// create 100 records
const records = [];
const
const generateData = function (numOfRecords, lastId = 0) {
  for (let i = 0; i < numOfRecords; i += 1) {
    records[i] = {
      id: lastId + 1,
      restaurant: faker.random.words(),
      menus: [],
    };
    for (let j = 0; j < 5; j += 1) {
      records[i].menus[j] = {
        title: faker.random.word(),
        description:
          `${faker.lorem.sentence()}
          ${faker.lorem.sentence()}
          ${faker.lorem.sentence()}
          ${faker.lorem.sentence()}
          ${faker.lorem.sentence()}
          ${faker.lorem.sentence()}
          ${faker.lorem.sentence()}`,
        sections: [],
      };
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

module.exports = generateData;
