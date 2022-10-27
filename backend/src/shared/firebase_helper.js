const {initializeApp} = require('firebase/app')
const {getAuth, createUserWithEmailAndPassword} = require('firebase/auth')
const { getDatabase } = require("firebase/database") 
const { getFirestore } = require("firebase/firestore")

class FirebaseBundle {
    constructor(firebaseConfig) {
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth(app)
        this.realTimeDatabase = getDatabase(app) 
        this.cloudFirestore = getFirestore(app)
    }
}


module.exports = {
    FirebaseBundle
}