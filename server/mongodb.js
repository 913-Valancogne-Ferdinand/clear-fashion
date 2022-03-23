const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb+srv://FerdinandValancogne:ferdinand@cluster0.upmid.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
const db =  client.db(MONGODB_DB_NAME)

const dedicated_mongodb = require('./dedicated.json');
const montlimart_mongodb = require('./montlimart.json');
const adresseparis_mongodb = require('./adresseparis.json');

