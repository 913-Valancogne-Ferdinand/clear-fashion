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


function scrapingadresseparis() {
  var listOfProducts = []
  var link = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=118'
  products = sandbox(link, adresseparis).then(products => {
      for (var i of products) {
          listOfProducts.push(i)
      }
      fs.writeFile("./adresseparis.json", listOfProducts, (err) => {
      if (err) {
          throw err;
      }
    });
  });
};




function scrapingdedicated() {
  var listOfProducts = []
  var link = 'https://www.dedicatedbrand.com/en/men/all-men'
  products = sandbox(link, dedicatedbrand).then(products => {
      for (var i of products) {
          listOfProducts.push(i)
      }
  })
  var link = 'https://www.dedicatedbrand.com/en/women/all-women'
  products = sandbox(link, dedicatedbrand).then(products => {
      for (var i of products) {
          listOfProducts.push(i)
      }
      fs.writeFile("./dedicatedbrand.json", listOfProducts, (err) => {
        if (err) {
            throw err;
        }
    })
  })
}

function scrapingmontlimart() {
  var listOfProducts = []
  for (var i = 1; i < 9; i++) {
    var link = 'https://www.montlimart.com/toute-la-collection.html' + "?p=" + i.toString();
    products = sandbox(link, montlimart).then(products => {
      for (var i of products) {
        listOfProducts.push(i)
      }
      fs.writeFile("./montlimart.json", listOfProducts, (err) => {
        if (err) {
            throw err;
        }
      })
    })
  }
}

// scrapingmontlimart()
// scrapingdedicated()
// scrapingadresseparis()