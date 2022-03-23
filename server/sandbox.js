/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresseparis = require('./sources/adresseparis');
const montlimart = require('./sources/montlimart');

// https://adresse.paris/630-toute-la-collection?id_category=630&n=118
// https://www.dedicatedbrand.com/en/men/news
// https://www.montlimart.com/toute-la-collection.html


async function sandbox (eshop, site) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    // const products = await montlimart.scrape(eshop);
    const products = await site.scrape(eshop);
    return products
    // console.log(products);
    // console.log('done');
    // process.exit(0);
  } catch (e) {
    console.error(e);
    // process.exit(1);
  }
}

// const [,, eshop] = process.argv;

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

function adresseparis_scrap() {
  var listProducts = []
  var page_link = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=118'
  products = sandbox(page_link, adresseparis).then(products => {
      for (var product of products) {
          listProducts.push(product)
      }
      writeInJson(listProducts, "./adresseparis.json")
  })
}

function dedicated_scrap() {
  var listProducts = []
  var page_link = 'https://www.dedicatedbrand.com/en/men/news'
  products = sandbox(page_link, dedicatedbrand).then(products => {
      for (var product of products) {
          listProducts.push(product)
      }
      writeInJson(listProducts, "./dedicatedbrand.json")
  })
}

function montlimart_scrap() {
  var listProducts = []
  var page_link = 'https://www.montlimart.com/toute-la-collection.html'
  products = sandbox(page_link, montlimart).then(products => {
      for (var product of products) {
          listProducts.push(product)
      }
      writeInJson(listProducts, "./montlimart.json")
  })
}

montlimart_scrap()
// dedicated_scrap()
// adresseparis_scrap()