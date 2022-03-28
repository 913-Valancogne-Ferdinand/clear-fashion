const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb+srv://FerdinandValancogne:ferdinand@cluster0.upmid.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

const dedicatedbrand = require('./dedicatedbrand.json');
const montlimart = require('./montlimart.json');
const adresseparis = require('./adresseparis.json');

async function connect() {
    try {
        const client = MongoClient.connect(MONGODB_URI, {useNewUrlParser: true});
        const db = client.db(MONGODB_DB_NAME)
        console.log('Connected')
        return db
    }
    catch (err) {
        console.error(`Error. \n${err}`);
    }
}

async function insert(products) {
    const db = await connect();
    const collection = db.collection('products');
    for (brand of products) {
        collection.insertMany(brand);
    }
}

insert([montlimart])
insert([adresseparis])
insert([dedicatedbrand])

module.exports = connect;