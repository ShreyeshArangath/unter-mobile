import {FIREBASE_apiKey, FIREBASE_authDomain, FIREBASE_projectId, FIREBASE_storageBucket, FIREBASE_messagingSenderId, 
    FIREBASE_appId, FIREBASE_measurementId, FIREBASE_databaseURL} from '@env'
  import {initializeApp} from 'firebase/app'
  import {getDatabase} from 'firebase/database'
  import {getFirestore} from 'firebase/firestore'
  
  const firebaseConfig = {
    "apiKey": FIREBASE_apiKey, 
    "authDomain": FIREBASE_authDomain, 
    "projectId": FIREBASE_projectId, 
    "storageBucket": FIREBASE_storageBucket, 
    "messengerSenderId": FIREBASE_messagingSenderId, 
    "appId": FIREBASE_appId, 
    "measurementId": FIREBASE_measurementId, 
    "databaseURL": FIREBASE_databaseURL
  }
  const firebaseApp = initializeApp(firebaseConfig)
  const realTimeDatabase = getDatabase(firebaseApp);
  const fireStore = getFirestore(firebaseApp)

  
  export {firebaseApp, realTimeDatabase, fireStore}