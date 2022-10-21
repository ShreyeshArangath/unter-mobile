import {ref, set, update, onValue} from 'firebase/database'

const UserLiveLocationInfo = (userId, lat, long) => {
    return {
        "userId": userId, 
        "lat": lat, 
        "long": long 
    }
}

const LiveLocation = (tripId, passengerLiveLocationInfo, driverLiveLocationInfo) => {
    return {
        "tripId": tripId,
        "passengerLiveLocationInfo": passengerLiveLocationInfo,
        "driverLiveLocationInfo":  driverLiveLocationInfo
    }
}

const UserTypeHeader = {
	Passenger: "passengerLiveLocationInfo",
	Driver: "driverLiveLocationInfo",
}


/**
 * realTimeDB: Reference to the Firebase Real Time Database 
 * liveLocation: obj of type LiveLocation 
 */
const createTripDocument = async(realTimeDB, liveLocation) => {
    set(ref(realTimeDB, 'trips/' + liveLocation.tripId), liveLocation) 
}


/**
 * realTimeDB: Reference to the Firebase Real Time Database  
 * tripID: str representing the ID of the current trip
 * type: UserTypeHeader
 * userLiveLocationInfo: obj of type UserLiveLocationInfo
 */
const updateUserLiveLocationInfo = async(realTimeDB, tripId, type, userLiveLocationInfo) => {
    const updates = {}
    updates[`/trips/${tripId}/${type}`] = userLiveLocationInfo
    return update(ref(realTimeDB), updates)
}

export {
    UserLiveLocationInfo, LiveLocation, UserTypeHeader , createTripDocument, updateUserLiveLocationInfo
}