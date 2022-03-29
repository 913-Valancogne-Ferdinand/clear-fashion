const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb+srv://FerdinandValancogne:ferdinand@cluster0.upmid.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';


const dedicatedbrand = require('./dedicatedbrand.json');
const montlimart = require('./montlimart.json');
const adresseparis = require('./adresseparis.json');

async function connect() {
    try {
        const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true});
        let db = client.db(MONGODB_DB_NAME)
        console.log('Connected')
        return db
    }
    catch (err) {
        console.error(error);
    }
}



async function insert(products) {
    const mongodb = await connect();
    const collection = mongodb.collection('products');
    for (i of products) {
        const result = collection.insertMany(i);
    }
}

/*
// find a product ??
async function find(products, query) {
    const mongodb = await connect();
    const finding = mongodb.find(query);
    return finding;
}

var query1 = {brand = 'adresseparis'};
var query2 = {price = 55};
find(products, query1)

*/



insert([montlimart])
insert([adresseparis])
insert([dedicatedbrand])

module.exports = connect;