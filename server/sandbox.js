/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresseparis = require('./sources/adresseparis');
const montlimart = require('./sources/montlimart');

// https://adresse.paris/630-toute-la-collection?id_category=630&n=118
// 
// https://www.montlimart.com/toute-la-collection.html


async function sandbox (eshop = 'https://www.montlimart.com/toute-la-collection.html') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimart.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

// sandbox(eshop);
const fs = require("fs");

function writeInJson(products, path) {
  productsInfo = JSON.stringify(products);// convert JSON object to string
  // write JSON string to a file
  fs.writeFile(path, productsInfo, (err) => {
      if (err) {
          throw err;
      }
      console.log("JSON data is saved.");
  });
}

function adresseParis_scrap() {
  var listProducts = []
  var page_link = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=118'
  const adresseparisbrand = require('./sources/adresseparis');
  products = sandbox(page_link, adresseparisbrand).then(products => {
      for (var product of products) {
          listProducts.push(product)
      }
      writeInJson(listProducts, "./adresseParis.json")
  })
}

adresseParis_scrap()