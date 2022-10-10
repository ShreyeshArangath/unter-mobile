const { collection, doc, getDocs } = require("firebase/firestore")

class TripRepository {

    constructor(firebaseBundle) {
        this._firebaseBundle = firebaseBundle
    }

    async getTrips() {
        const db = this._firebaseBundle.cloudFirestore 
        const querySnapshot = await getDocs(collection(db, "Trips"));
        return querySnapshot
    }

    async getTripsWithDriverID(driverID) {
        const db = this._firebaseBundle.cloudFirestore 
        let querySnapshot = await getDocs(collection(db, "Trips"))
            .where('driverID', '==', driverID)
            .orderBy('startTime');
        return await Query.get();
    }

    async getTripsWithPassengerID(passID) {
        const db = firebase.database(); 
        let Query = db.collection('Trips')
            .where('passID', '==', passID)
            .orderBy('startTime');
        return await Query.get();
    }

    async getTrip(tripID) {
        const dbTripRef = firebase.database().ref('Trips/'+tripID);
        return await dbTripRef.get()
    }

    async createTrip(passID, startLocation) {
        const dbTripRef = firebase.database().ref('Trips');
        newTrip = dbTripRef.push({
            'driverID' : 'NULL',
            'driverRating' : -1,
            'endLoc' : [0,0],
            'endTime' : 0,
            'passID' : passID,
            'passRating' : -1,
            'startLoc' : startLocation,
            'startTime' : new Date().toLocaleString(),
            'status' : 'in_queue'
        })
        return await newTrip.key()
    }

    async setTripDriver(tripID, driverID) {
        const dbTripRef = firebase.database().ref('Trips/'+tripID);
        newTrip = dbTripRef.set({
            'driverID' : driverID,
            'status' : 'to_pass'
        })
    }

    /*STATUS MUST BE: in_queue, to_pass, wait_pass, on_delivery, completed, pass_cancel, driver_cancel*/
    async updateTripStatus(tripID, status) {
        const dbTripRef = firebase.database().ref('Trips/'+tripID);
        newTrip = dbTripRef.set({
            'status' : status
        })
    }
    
    async endTrip(tripID, endLocation) {
        const dbTripRef = firebase.database().ref('Trips/'+tripID);
        newTrip = dbTripRef.set({
            'endLoc' : endLocation,
            'endTime' : new Date().toLocaleString(),
            'status' : 'completed'
        })
    }

    async setTripDriverRating(tripID, rating) {
        const dbTripRef = firebase.database().ref('Trips/'+tripID);
        newTrip = dbTripRef.set({
            'driverRating' : rating
        })
    }

    async setTripPassengerRating(tripID, rating) {
        const dbTripRef = firebase.database().ref('Trips/'+tripID);
        newTrip = dbTripRef.set({
            'passRating' : rating
        })
    }

    async deleteTrip(tripID) {
        const dbTripRef = firebase.database().ref('Trips/'+tripID);
        dbTripRef.remove()
            .catch(function(error) {
                console.log("Remove failed: " + error.message)
            });
    }
}

module.exports = {
    TripRepository
}