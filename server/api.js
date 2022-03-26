const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mydb = require('./db');

const PORT = 8092;

const app = express();


module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());


app.options('*', cors());


//home endpoint
app.get('/', (request, response) => {
  response.send({ 'ack': true });
});




//endpoint to make a query with parameters
app.get('/products/search', async (req, res) => {

  try {
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    // setting the base parameters
    let size = 12;
    let price = 10000;
    let brand = null;
    let page = 1;
    let query = {};
    // if parameters are specified in the endpoint, get them
    if (req.query.size) { size = parseInt(req.query.size); }

    if (req.query.page) {page = parseInt(req.query.page); }

    if (req.query.price) {price = parseFloat(req.query.price); }
    
    if (req.query.brand) {
      brand = req.query.brand;
      // if a brand is specified putting it in the query
      query = { brand, "price": { $lte: price } };
    } query = { "price": { $lte: price } }; //else query wthout brand

    // making the query and sending it to the database
    console.log("getting product from database...")
    const products = await mydb.find(query, size, page);
    // sending back the products
    if (products) {
      // sending results with the right headers
      res.send({ "success": true, "data": { "result": products} });
    }
  } catch (err) {
    console.log("Error sending the repsonse to the server", err);
    res.send({ ack: "No product found" });
  }

});


/*
//endpoint to get a simple product by its id
app.get('/product/:id', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    const _id = req.params.id;
    const product = await mydb.find({ _id });
    if (product) {
      res.send({ product });
    }
  } catch (err) {
    console.log("Error sending the repsonse to the server", err);
    res.send({ ack: "No product found" });
  }
}); */


app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);

module.exports = app;
