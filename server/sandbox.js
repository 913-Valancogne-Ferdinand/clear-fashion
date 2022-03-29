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

    const products = await site.scrape(eshop);
    return products;
    // process.exit(0)
  } catch (e) {
    console.error(e);
    // process.exit(1);
  }
}

const fs = require("fs");

function writeInJson(products, path) {
  productInfo = JSON.stringify(products);
  fs.writeFile(path, productInfo, (err) => {
      if (err) {
          throw err;
      }
      console.log("Json good");
  });
}

function scrapingadresseparis() {
  var listProducts = []
  var page_link = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=118'
  products = sandbox(page_link, adresseparis).then(products => {
      for (var product of products) {
          listProducts.push(product)
      }
      writeInJson(listProducts, "./adresseparis.json")
  })
}




function scrapingdedicated() {
  var listProducts = []
  var page_link = 'https://www.dedicatedbrand.com/en/men/all-men'
  products = sandbox(page_link, dedicatedbrand).then(products => {
      for (var product of products) {
          listProducts.push(product)
      }
      writeInJson(listProducts, "./dedicatedbrand.json")
  })
  var page_link = 'https://www.dedicatedbrand.com/en/women/all-women'
  products = sandbox(page_link, dedicatedbrand).then(products => {
      for (var product of products) {
          listProducts.push(product)
      }
      writeInJson(listProducts, "./dedicatedbrand.json")
  })
}

function scrapingmontlimart() {
  var listProducts = []
  for (var i = 1; i < 9; i++) {
    var page_link = 'https://www.montlimart.com/toute-la-collection.html' + "?p=" + i.toString();
    products = sandbox(page_link, montlimart).then(products => {
      for (var product of products) {
        listProducts.push(product)
      }
      writeInJson(listProducts, "./montlimart.json")
    })
  }
}

// scrapingmontlimart()
scrapingdedicated()
// scrapingadresseparis()