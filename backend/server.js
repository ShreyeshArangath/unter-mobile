require('dotenv').config()
const express = require("express")


const cors = require('cors')
const bodyParser = require('body-parser');

/**
 *  Server Configs and Keys 
 */
const PORT = process.env.UNTER_BACKEND_PORT || 9000


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

// Controllers 
const { TripController } = require('./src/controllers/trip_controller');
const { UserController } = require('./src/controllers/user_controller');

// Repository
const { UserRepository} = require('./src/repository/user_repository');
const { FirebaseBundle } = require('./src/shared/firebase_helper');
const { TripRepository } = require('./src/repository/trip_repository');

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
// Handler
const { getTripHandler } = require('./src/handlers/trip_handler');
const { getUserHandler } = require('./src/handlers/user_handler');

// Dependencies 
const tripRepo = new TripRepository(firebaseBundle)
const userRepo = new UserRepository(firebaseBundle)

const tripCont = new TripController(tripRepo)
const userCont = new UserController(userRepo)


app.use('/api/trips', getTripHandler(tripCont))
app.use('/api/users', getUserHandler(userCont))

/**
 *  Server Start
 */
app.listen(PORT, () => {
    console.log(`Running the backend server on port ${PORT}`);
})