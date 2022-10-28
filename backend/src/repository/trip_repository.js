const { collection, doc, getDocs, addDoc, query, where, deleteDoc,updateDoc, orderBy, limitToLast, setDoc, limit} = require("firebase/firestore")

class TripRepository {

    constructor(firebaseBundle) {
        this._isLogQuery = true
        this._db = firebaseBundle.cloudFirestore

        this.successColor = '\x1b[34m%s\x1b[0m';//sets the color to blue, and then resets the console to normal
        this.failColor = '\x1b[31m%s\x1b[0m';//sets the color to res, then resets the console to normal
    }

    logQueryResult(APIFailed, callingFunction)
    {
        if(this._isLogQuery)
        {
            if(APIFailed)
                console.log(this.failColor, "nothing returned, or an error while calling Function: " + callingFunction);
            else
                console.log(this.successColor, 'called Function: ' + callingFunction)
        }
    }

//-----------------------API CALLS-------------------------------------------------------------

    async getTrip(tripID) {
        
        const querySnapshot = await getDocs(query(collection(this._db, 'Trips'),
        where("__name__", "==", tripID)))
        
        this.logQueryResult(querySnapshot.size==0, "getTrip(" + tripID + ")");

        var jsonResult = {}
        querySnapshot.forEach(doc => {
            jsonResult[doc.id] = doc.data()
        });
        return jsonResult
    }

    async getAllTrips() {
        
        const querySnapshot = await getDocs(collection(this._db, 'Trips'));
       
        this.logQueryResult(querySnapshot.size==0, "getAllTrips()");

        var jsonResult = {}
        querySnapshot.forEach(doc => {
            jsonResult[doc.id] = doc.data()
        });
        return jsonResult
    }

    async getTripsWithDriverID(driverID) {
        
        const querySnapshot = await getDocs(query(collection(this._db, 'Trips'),
        where("driverID", "==", driverID)))
        
        this.logQueryResult(querySnapshot.size==0, "getTripsWithDriverID(" + driverID + ")");
        
        var jsonResult = {}
        querySnapshot.forEach(doc => {
            jsonResult[doc.id] = doc.data()
        });
        return jsonResult
    }

    async getTripsWithPassengerID(passID) {

        const querySnapshot = await getDocs(query(collection(this._db, 'Trips'),
            where("passID", "==", passID)))
        
        this.logQueryResult(querySnapshot.size==0, "getTripsWithPassengerID(" + passID + ")");
            
        var jsonResult = {}
        querySnapshot.forEach(doc => {
            jsonResult[doc.id] = doc.data()
        });
        return jsonResult
    }

    async getNextTrip(trip_status) {
        
        const querySnapshot = await getDocs(
            query(  collection(this._db, 'Trips'),
            where("status", "==", trip_status),
            orderBy("startTime", "asc"),
            limit(1)
            )
            );
            
        this.logQueryResult(querySnapshot.size==0, "getNextTrip(" + trip_status + ")");

        var jsonResult = {}
        querySnapshot.forEach(doc => {
            jsonResult[doc.id] = doc.data()
        });
        return jsonResult
    }

    async createTrip(passID, starting_trip) {
        if (this._isLogQuery) console.info(this.successColor, 'Creating Trip with passengerID: ' + passID)

        var newTrip = await addDoc(
            collection(this._db, 'Trips'),
            startingTripInfo
        )
        return newTrip.id
    }

    async setTripDriver(tripID, driverID, driver_to_pick_up_status) {
        if (this._isLogQuery) console.info(this.successColor, 'Setting Trip '+ tripID + ' to have driver: ' + driverID)

        return await updateDoc(
            doc(this._db, 'Trips/'+tripID),
            {
                'driverID' : driverID,
                'status' : driver_to_pick_up_status
            }
        )
    }

    async updateTripStatus(tripID, new_status) {
        if (this._isLogQuery) console.info(this.successColor, 'Setting Trip '+ tripID + ' to have status: ' + new_status)

        return await updateDoc(
            doc(this._db, 'Trips/'+tripID),
            {
                'status' : new_status
            }
        )
    }
    
    async endTrip(tripID, att_updating) {
        if (this._isLogQuery) console.info(this.successColor, 'Ending Trip: '+ tripID)

        return await updateDoc(
            doc(this._db, 'Trips/'+tripID),
            att_updating
        )
    }

    async setTripDriverRating(tripID, rating) {
        if (this._isLogQuery) console.info(this.successColor, 'Setting Driver Rating for Trip: '+ tripID + ' Rating: ' + rating)

        return await updateDoc(
            doc(this._db, 'Trips/'+tripID),
            {
                'driverRating' : rating
            }
        )
    }

    async setTripPassengerRating(tripID, rating) {
        if (this._isLogQuery) console.info(this.successColor, 'Setting Passenger Rating for Trip: '+ tripID + ' Rating: ' + rating)

        return await updateDoc(
            doc(this._db, 'Trips/'+tripID),
            {
                'passRating' : rating
            }
        )
    }

    async deleteTrip(tripID) {
        if (this._isLogQuery) console.info(this.successColor, 'Deleting Trip with tripID: ' + tripID)

        var response = "Success"
        await deleteDoc( 
            doc(collection(this._db, 'Trips'), tripID)
        )
        .catch(function(error) {
            console.info("Remove failed: " + error.message)
            response = "Failed"
        });
        return response
    }

    async setUltimateAttr(tripID, attributes) {
        if (this._isLogQuery) console.info(this.successColor, 'Setting 1+ attributes for Trip: '+ tripID)

        return await updateDoc(
            doc(collection(this._db, 'Trips'), tripID), attributes).then(doc=>console.error(attributes));
    }
}

module.exports = {
    TripRepository
}