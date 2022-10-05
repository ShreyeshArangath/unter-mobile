require('dotenv').config()
const express = require("express")


const cors = require('cors')
const bodyParser = require('body-parser');

/**
 *  Server Configs and Keys 
 */
const PORT = process.env.UNTER_BACKEND_PORT || 9000

// mongo 
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_URI = process.env.MONGO_URI;

// firebase 
const FirebaseConfig = {
    "apiKey": process.env.FIREBASE_apiKey, 
    "authDomain": process.env.FIREBASE_authDomain, 
    "projectId": process.env.FIREBASE_projectId, 
    "storageBucket": process.env.FIREBASE_storageBucket, 
    "messengerSenderId": process.env.FIREBASE_messagingSenderId, 
    "appId": process.env.FIREBASE_appId, 
    "measurementId": process.env.FIREBASE_measurementId, 
    "databaseURL": process.env.FIREBASE_databaseURL
}

/**
 *  Internal Dependencies 
 */

// DB
const {
    GetMongoClient
} = require('./src/shared/mongo_helper')

// Repository
const {UserRepository} = require('./src/repository/user_repository');
const { FirebaseBundle } = require('./src/shared/firebase_helper');

const mongoClient = GetMongoClient(MONGO_URI, MONGO_DB_NAME);
const firebaseBundle = new FirebaseBundle(FirebaseConfig);

/**
 *  App Init 
 */

const app = express()
const router = express.Router();

/**
 *  App Config 
 */
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 *  Handlers & API routes
 */


/**
 *  Server Start
 */
app.listen(PORT, () => {
    console.log(`Running the backend server on port ${PORT}`);
})