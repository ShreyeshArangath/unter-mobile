import {useState, useEffect} from 'react'
import axios from 'axios'
import {API_BASE_URL} from '@env'; 

const URL = "http://10.161.167.229:9001"

export const GetTripByID = (tripId) => {
    console.info("Getting trip ID...");
    return axios.get(URL + "/api/trips/id/"+tripId).then((res) => {
        return (res.data && !Object.keys(res.data).length == 0) ?  res.data : false;
        return false;
    }).catch(err => {
        console.log(err)
        return false;
    })
}

export const GetNextTripInfo = () => {
    console.info("Getting next trip info...");
    console.log("URL", URL)
    return axios.get(URL+ "/api/trips/ride/next/")
        .then(res => {
            return (res.data && !Object.keys(res.data).length == 0) ?  res.data : false;
        }).catch(err => {
            throw {
                code: err.code,
                message: err.message,
                responseStatus: err.response?.status,
            };
        })
}

export const StartTrip = (passengerID, tripInfo) => {
    console.info("Starting a trip...");
    return axios.post(URL+ "/api/trips/ride/start/", 
        {
            'passengerID': passengerID,
            'start_latitude': tripInfo.start_latitude,
            'start_longitude': tripInfo.start_longitude,
            'end_latitude': tripInfo.end_latitude,
            'end_longitude': tripInfo.end_longitude
        }).then((res) => {
            return (res.data != null) ? res.data : false
        }).catch(err => {
            return false;
        })
}

export const AssignDriver = (tripID, driverID) => {
    console.info("Assigning a driver...");
    return axios.put(URL+ "/api/trips/ride/set_driver/"+tripID+"&"+driverID).then((res) => {
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
        if (res.status == 200) return true;
        return false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const CompleteTrip = (tripID) => {
    console.info("Completing trip...");
    return axios.put(URL+ "/api/trips/ride/end/"+tripID).then((res) => {
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
        return (res.data && !Object.keys(res.data).length == 0) ?  res.data : false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const GetDriverTripHistory = (driverID) => {
    console.info("Getting driver history...");
    return axios.get(URL+ "/api/trips/driver/"+driverID).then((res) => {
        console.log(res.status);
        return (res.data && !Object.keys(res.data).length == 0) ?  res.data : false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const GetPassengerTripHistory = (PassengerID) => {
    console.info("Getting passenger history...");
    return axios.get(URL+ "/api/trips/passenger/"+PassengerID).then((res) => {
        console.log(res.status);
        return (res.data && !Object.keys(res.data).length == 0) ?  res.data : false;
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

export const CreateUserFrontend = (username, password, fname, lname, phone, type) => {
    console.info("Creating new user in firebase... from API call.");
    console.info("Data passed as %s %s %s %s %s %s", username, password, fname, lname, phone, type)
    return axios.post(URL + "/api/users/create", 
    {
        'username': username,
        'password': password,
        'fname' : fname,
        'lname' : lname,
        'phone' : phone, //ITS CALLED PHONE
        'userType': type,
    }).then((res) => {
        return (res.data != null) ? res.data : false
    }).catch(err => {
        return false
    })
}

//export const updateUserFrontend = ()

export const SignInUserFrontend = (username, password) => {
    console.info("Attempting sign in from API call"+username+"/"+password)
    return axios.get(URL + "/api/users/signin/"+username+"/"+password).then((res) => {
        return (res.data != null) ? res.data : false
    }).catch(err => {
        return false
    }) //todo, awaiting conversion to body from api call
}

