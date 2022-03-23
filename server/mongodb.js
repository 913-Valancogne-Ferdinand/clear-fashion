const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb+srv://FerdinandValancogne:ferdinand@cluster0.upmid.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';


const dedicatedbrand = require('./dedicatedbrand.json');
const montlimart = require('./montlimart.json');
const adresseparis = require('./adresseparis.json');

async function Main() {
    client = MongoClient.connect(MONGODB_URI, { 'useNewUrlParser': true });
    const db = await client.db(MONGODB_DB_NAME)
    console.log(`Connected to database ${db.databaseName}`)
    const collections = await db.collection('products');
    // await RemoveAll(collections)

    // INSERT PRODUCTS
    // await InsertAllProducts(collections)
}

Main()