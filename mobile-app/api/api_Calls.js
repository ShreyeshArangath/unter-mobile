import {useState, useEffect} from 'react'


const SERVER_URL = 'http://localhost:9001/'

export async function GetTripByID(TripID)
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/id/'+TripID, {method: 'GET', mode:'cors'});
        console.log(response.status);
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
} 

export async function GetNextTripInfo()
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/ride/next', {method: 'GET', mode:'cors'});
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
}

export async function StartTrip(passengerID)
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/ride/start/'+passengerID, {method: 'POST', mode:'cors', body: {'latitude': origin.latitude, 'longitude': origin.longitude}});
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
}

export async function AssignDriver(tripID, driverID)
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/ride/set_driver/'+tripID+"&"+driverID, {method: 'PUT', mode:'cors',});
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
}

export async function UpdateTripStatus(tripID, status)
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/ride/set_driver/'+tripID+"&"+status, {method: 'PUT', mode:'cors',});
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
}

export async function CompleteTrip(tripID)
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/ride/end/'+tripID, {method: 'POST', mode:'cors',});
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
}

export async function GetAllTrips()
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/all/', {method: 'GET', mode:'cors',});
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
}

export async function GetDriverTripHistory(id)
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/driver'+id, {method: 'GET', mode:'cors',});
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
}

export async function GetPassengerTripHistory(id)
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/passenger'+id, {method: 'GET', mode:'cors',});
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
}

export async function SetDriverRating(tripID, rating)
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/ride/rate/driver/'+tripID+"&"+rating, {method: 'POST', mode:'cors',});
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
}

export async function SetPassengerRating(tripID, rating)
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/ride/rate/passenger/'+tripID+"&"+rating, {method: 'POST', mode:'cors',});
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
}

export async function DeleteTripID(TripID)
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/delete/'+TripID, {method: 'POST', mode:'cors',});
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
}

export async function ChangeTripInfo(TripID)
{
    const [trip, setTrip] = useState(null)
    try {
        const response = await fetch(SERVER_URL+'/api/trips/manipulate/'+TripID, {method: 'POST', mode:'cors', 
        body:
        {
            'driverID': origin.driverID, 
            'driverRating': origin.driverRating,
            'endLoc': origin.endLoc,
            'endTime': origin.endTime,
            'passID': origin.passID,
            'passRating': origin.passRating,
            'startLoc': origin.startLoc,
            'startTime': origin.startTime,
            'status': origin.status
        }});
        const data = await response.json();
        setTrip(data);
    }
    catch (e) {
        console.log(e)
    }
    return (trip)
}



