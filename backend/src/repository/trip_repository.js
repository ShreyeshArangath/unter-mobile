const { collection, doc, getDocs, addDoc, query, where, deleteDoc,updateDoc, orderBy, limitToLast, setDoc, limit} = require("firebase/firestore")

class TripRepository {

    constructor(firebaseBundle) {
        this._isLogQuery = true
        this._db = firebaseBundle.cloudFirestore
    }

    async getTrip(tripID) {
        if (this._isLogQuery) console.log('Getting Trip with tripID: ' + tripID)

        const querySnapshot = await getDocs(query(collection(this._db, 'Trips'),
            where("__name__", "==", tripID)))
        var jsonResult = {}
        querySnapshot.forEach(doc => {
            jsonResult[doc.id] = doc.data()
        });
        return jsonResult
    }

    async getAllTrips() {
        if (this._isLogQuery) console.log('Getting All Trips')

        const querySnapshot = await getDocs(collection(this._db, 'Trips'));
        var jsonResult = {}
        querySnapshot.forEach(doc => {
            jsonResult[doc.id] = doc.data()
        });
        return jsonResult
    }

    async getTripsWithDriverID(driverID) {
        if (this._isLogQuery) console.log('Getting Trip with driverID: ' + driverID)

        const querySnapshot = await getDocs(query(collection(this._db, 'Trips'),
            where("driverID", "==", driverID)))
        var jsonResult = {}
        querySnapshot.forEach(doc => {
            jsonResult[doc.id] = doc.data()
        });
        return jsonResult
    }

    async getTripsWithPassengerID(passID) {
        if (this._isLogQuery) console.log('Getting Trip with passengerID: ' + passID)

        const querySnapshot = await getDocs(query(collection(this._db, 'Trips'),
            where("passID", "==", passID)))
        var jsonResult = {}
        querySnapshot.forEach(doc => {
            jsonResult[doc.id] = doc.data()
        });
        return jsonResult
    }

    async getNextTrip(trip_status) {
        if (this._isLogQuery) console.log('Getting Longest Waiting Trip')

        const querySnapshot = await getDocs(
                query(  collection(this._db, 'Trips'),
                        where("status", "==", trip_status),
                        orderBy("startTime", "asc"),
                        limit(1)
                )
            )
        var jsonResult = {}
        querySnapshot.forEach(doc => {
            jsonResult[doc.id] = doc.data()
        });
        return jsonResult
    }

    async createTrip(passID, starting_trip) {
        if (this._isLogQuery) console.log('Creating Trip with passengerID: ' + passID)

        var newTrip = await addDoc(
            collection(this._db, 'Trips'),
            starting_trip
        )
        return newTrip.id
    }

    async setTripDriver(tripID, driverID, driver_to_pick_up_status) {
        if (this._isLogQuery) console.log('Setting Trip '+ tripID + ' to have driver: ' + driverID)

        return await updateDoc(
            doc(this._db, 'Trips/'+tripID),
            {
                'driverID' : driverID,
                'status' : driver_to_pick_up_status
            }
        )
    }

    async updateTripStatus(tripID, new_status) {
        if (this._isLogQuery) console.log('Setting Trip '+ tripID + ' to have status: ' + new_status)

        return await updateDoc(
            doc(this._db, 'Trips/'+tripID),
            {
                'status' : new_status
            }
        )
    }
    
    async endTrip(tripID, att_updating) {
        if (this._isLogQuery) console.log('Ending Trip: '+ tripID)

        return await updateDoc(
            doc(this._db, 'Trips/'+tripID),
            att_updating
        )
    }

    async setTripDriverRating(tripID, rating) {
        if (this._isLogQuery) console.log('Setting Driver Rating for Trip: '+ tripID + ' Rating: ' + rating)

        return await updateDoc(
            doc(this._db, 'Trips/'+tripID),
            {
                'driverRating' : rating
            }
        )
    }

    async setTripPassengerRating(tripID, rating) {
        if (this._isLogQuery) console.log('Setting Passenger Rating for Trip: '+ tripID + ' Rating: ' + rating)

        return await updateDoc(
            doc(this._db, 'Trips/'+tripID),
            {
                'passRating' : rating
            }
        )
    }

    async deleteTrip(tripID) {
        if (this._isLogQuery) console.log('Deleting Trip with tripID: ' + tripID)

        var response = "Success"
        await deleteDoc( 
            doc(collection(this._db, 'Trips'), tripID)
        )
        .catch(function(error) {
            console.log("Remove failed: " + error.message)
            response = "Failed"
        });
        return response
    }

    async setUltimateAttr(tripID, attributes) {
        if (this._isLogQuery) console.log('Setting 1+ attributes for Trip: '+ tripID)

        return await updateDoc(
            doc(this._db, 'Trips/'+tripID), attributes)
    }
}

module.exports = {
    TripRepository
}