import {useState, useEffect} from 'react'
import axios from 'axios'

const URL = "http://10.161.172.119:9001"

export const GetTripByID = (tripId) => {
    console.info("Getting trip ID...");
    return axios.get(URL + "/api/trips/id/"+tripId).then((res) => {
        if (res.data != null) return res.data;
        return false;
    }).catch(err => {
        return false;
    })
}

export const GetNextTripInfo = () => {
    console.info("Getting next trip info...");
    return axios.get(URL+ "/api/trips/ride/next/").then((res) => {
        if (res.data != null) return res.data;
        return false;
    }).catch(err => {
        return false;
    })
}

export const StartTrip = (passengerID, origin) => {
    console.info("Starting a trip...");
    return axios.get(URL+ "/api/trips/ride/start/"+passengerID, {'latitude': origin.latitude, 'longitude': origin.longitude}).then((res) => {
        if (res.data != null) return res.data;
        return false;
    }).catch(err => {
        return false;
    })
}

export const AssignDriver = (tripID, driverID) => {
    console.info("Assigning a driver...");
    return axios.put(URL+ "/api/trips/ride/set_driver/"+tripID+"&"+driverID).then((res) => {
        console.log(res.status);
        if (res.status == 200) return true;
        return false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const UpdateTripStatus = (tripID, status) => {
    console.info("Updating trip status...");
    return axios.put(URL+ "/api/trips/ride/update_status/"+tripID+"&"+status).then((res) => {
        console.log(res.status);
        if (res.status == 200) return true;
        return false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const CompleteTrip = (tripID, origin) => {
    console.info("Completing trip...");
    return axios.put(URL+ "/api/trips/ride/end/"+tripID, {'latitude': origin.latitude, 'longitude': origin.longitude}).then((res) => {
        console.log(res.status);
        if (res.status == 200) return true;
        return false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const GetAllTrips = () => {
    console.info("Getting all trips...");
    return axios.get(URL+ "/api/trips/all/").then((res) => {
        console.log(res.status);
        if (res.data != null) return res.data;
        return false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const GetDriverTripHistory = (driverID) => {
    console.info("Getting driver history...");
    return axios.get(URL+ "/api/trips/driver/"+driverID).then((res) => {
        console.log(res.status);
        if (res.data != null) return res.data;
        return false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const GetPassengerTripHistory = (PassengerID) => {
    console.info("Getting passenger history...");
    return axios.get(URL+ "/api/trips/passenger/"+PassengerID).then((res) => {
        console.log(res.status);
        if (res.data != null) return res.data;
        return false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const SetDriverRating = (tripID, rating) => {
    console.info("Setting driver rating...");
    return axios.put(URL+ "/api/trips/ride/rate/driver/"+tripID+"&"+rating).then((res) => {
        console.log(res.status);
        if (res.status == 200) return true;
        return false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const SetPassengerRating = (tripID, rating) => {
    console.info("Setting passenger rating...");
    return axios.put(URL+ "/api/trips/ride/rate/passenger/"+tripID+"&"+rating).then((res) => {
        console.log(res.status);
        if (res.status == 200) return true;
        return false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const DeleteTripID = (tripID) => {
    console.info("Deleting trip...");
    return axios.delete(URL+ "/api/trips/delete/"+tripID).then((res) => {
        console.log(res.status);
        if (res.status == 200) return true;
        return false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const ChangeTripInfo = (tripID, attr) => {
    console.info("Changing trip info...");
    return axios.put(URL+ "/api/trips/manipulate/"+tripID, attr).then((res) => {
        console.log(res.status);
        if (res.status == 200) return true;
        return false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}


// export async function ChangeTripInfo(TripID)
// {
//     const [trip, setTrip] = useState(null)
//     try {
//         const response = await fetch(SERVER_URL+'/api/trips/manipulate/'+TripID, {method: 'POST', mode:'cors', 
//         body:
//         {
//             'driverID': origin.driverID, 
//             'driverRating': origin.driverRating,
//             'endLoc': origin.endLoc,
//             'endTime': origin.endTime,
//             'passID': origin.passID,
//             'passRating': origin.passRating,
//             'startLoc': origin.startLoc,
//             'startTime': origin.startTime,
//             'status': origin.status
//         }});
//         const data = await response.json();
//         setTrip(data);
//     }
//     catch (e) {
//         console.log(e)
//     }
//     return (trip)
// }



