
const fs = require('fs');
const faker = require('faker');


// const menus = fs.createWriteStream('./database/menus.csv');
// menus.write('restuarantId,menuTitle,description\n');
// Helper Functions
const randomItems = () => Math.floor(Math.random() * 6) + 4;
const randomSections = () => Math.floor(Math.random() * 3) + 1;
// ////////////////////////////////////////////////////////////////////////////
// create 100 restaurants
const genRestaurants = (numOfRestaurants, encoding) => {
  const wsRestaurants = fs.createWriteStream('./database/restaurants.csv');
  wsRestaurants.write('id,name\n');
  let id = 0;
  let i = numOfRestaurants;
  function writecsv() {
    let ok = true;
    do {
      id += 1;
      i -= 1;
      const restaurantName = faker.random.words();
      const data = `${id},${restaurantName}\n`;
      // termination
      if (i === -1) {
        wsRestaurants.end();
      } else {
        // check if we continue
        ok = wsRestaurants.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // continue once 'drained'
      wsRestaurants.once('drain', writecsv);
    }
  }
  writecsv();
};
genRestaurants(10, 'utf-8');

// ////////////////////////////////////////////////////////////////////////////
// const wsMenus = fs.createWriteStream('./database/menus.csv');
// wsMenus.write('restaurant ID, menu ID, title, description\n');

const genMenus = (numberOfMenus, encoding) => {
  const wsMenus = fs.createWriteStream('./database/menus.csv');
  wsMenus.write('restaurant ID, menu ID, title, description\n');
  let menuId = 1;
  let restaurantId = 1;
  let i = numberOfMenus;
  function writecsv() {
    let ok = true;
    do {
      i -= 1;
      if (menuId === 3) {
        restaurantId += 1;
        menuId = 1;
      }
      const menuTitle = faker.random.word();
      const menuDescription = `${faker.lorem.sentence()}`;
      const data = `${restaurantId},${menuId},${menuTitle},${menuDescription}\n`;

      menuId += 1;

      if (i === -1) {
        wsMenus.end();
        // wsMenus.write(data, encoding, cb);
      } else {
        ok = wsMenus.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      wsMenus.once('drain', writecsv);
    }
  }
  writecsv();
};
genMenus(20, 'utf-8');

// ////////////////////////////////////////////////////////////////////////////

const genMenuSections = (numberOfSections, encoding) => {
  const wsMenuSections = fs.createWriteStream('./database/sections.csv');
  wsMenuSections.write('restaurant ID, menu ID, section ID, title\n');

  let sectionId = 1;
  let menuId = 1;
  let restaurantId = 1;
  let i = numberOfSections;

  function writecsv() {
    let ok = true;
    do {
      i -= 1;
      if (sectionId === 5) {
        menuId += 1;
        sectionId = 1;
      }
      if (menuId > 2) {
        menuId = 1;
        restaurantId += 1;
      }
      const sectionTitle = faker.random.word();
      const data = `${restaurantId},${menuId},${sectionId},${sectionTitle}\n`;

      sectionId += 1;

      if (i === -1) {
        wsMenuSections.end();
      } else {
        ok = wsMenuSections.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      wsMenuSections.once('drain', writecsv);
    }
  }
  writecsv();
};

genMenuSections(80, 'utf-8');

// ////////////////////////////////////////////////////////////////////////////

const genMenuItems = (numberOfItems, encoding) => {
  const wsMenuItems = fs.createWriteStream('./database/items.csv');
  wsMenuItems.write('restaurant ID, menu ID, section ID, item ID, title, price, description\n');

  let itemId = 1;
  let sectionId = 1;
  let menuId = 1;
  let restaurantId = 1;
  let i = numberOfItems;

  function writecsv() {
    let ok = true;
    do {
      i -= 1;
      if (itemId === 6) {
        sectionId += 1;
        itemId = 1;
      }
      if (sectionId === 5) {
        menuId += 1;
        sectionId = 1;
      }
      if (menuId === 3) {
        restaurantId += 1;
        menuId = 1;
      }
      const itemTitle = faker.random.words();
      const itemPrice = `$${faker.finance.amount()}`;
      const itemDescription = `${faker.lorem.sentence()} ${faker.lorem.sentence()}`;

      const data = `${restaurantId},${menuId},${sectionId},${itemId},${itemTitle},${itemPrice},${itemDescription}\n`;

      itemId += 1;

      if (i === -1) {
        wsMenuItems.end();
      } else {
        ok = wsMenuItems.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      wsMenuItems.once('drain', writecsv);
    }
  }
  writecsv();
};

genMenuItems(400, 'utf-8');


// ////////////////////////////////////////////////////////////////////////////


// const records = [];
// const generateData = function () {
//   for (let i = 0; i < 100; i += 1) {
//     records[i] = {
//       id: i + 1,
//       restaurant: faker.random.words(),
//       menus: [],
//     };
//     restaurants.write(`${records[i].id},${records[i].restaurant}\n`);
//     for (let j = 0; j < 5; j += 1) {
//       records[i].menus[j] = {
//         title: faker.random.word(),
//         description:
//           `${faker.lorem.sentence()} ${faker.lorem.sentence()} ${faker.lorem.sentence()} ${faker.lorem.sentence()} ${faker.lorem.sentence()} ${faker.lorem.sentence()} ${faker.lorem.sentence()}`,
//         sections: [],
//       };
//       menus.write(`${records[i].id},${records[i].menus[j].title},${records[i].menus[j].description}\n`);
//       const sectionLength = randomSections();
//       for (let k = 0; k < sectionLength; k += 1) {
//         records[i].menus[j].sections[k] = {
//           title: faker.random.words(),
//           items: [],
//         };
//         const itemLength = randomItems();
//         for (let l = 0; l < itemLength; l += 1) {
//           records[i].menus[j].sections[k].items[l] = {
//             title: faker.random.words(),
//             price: `$${faker.finance.amount()}`,
//             description:
//               `${faker.lorem.sentence()}
//               ${faker.lorem.sentence()}
//               ${faker.lorem.sentence()}`,
//           };
//         }
//       }
//     }
//   }
//   return records;
// };

// generateData();

// module.exports = generateData;
