import {ref, set, update, onValue} from 'firebase/database'

const UnterLocation = (lat, long) => {
    return {
        "lat": lat, 
        "long": long
    }
}

/**
 * realTimeDB: Reference to the Firebase Real Time Database 
 * liveLocation: obj of type LiveLocation 
 */
const createTripDocument = async(realTimeDB, userId, location) => {
    set(ref(realTimeDB, 'users/' + userId), location) 
}


/**
 * realTimeDB: Reference to the Firebase Real Time Database  
 * tripID: str representing the ID of the current trip
 * type: UserTypeHeader
 * userLiveLocationInfo: obj of type UserLiveLocationInfo
 */
const updateUserLiveLocationInfo = async(realTimeDB, userId, location) => {
    const updates = {}
    updates[`/users/${userId}/`] = location
    return update(ref(realTimeDB), updates)
}

export {
    UnterLocation , createTripDocument, updateUserLiveLocationInfo
}