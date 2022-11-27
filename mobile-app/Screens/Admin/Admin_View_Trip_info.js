import {
    NativeBaseProvider,
    Text,
    Container
} from 'native-base';
import React, { useEffect, useState } from 'react';
import GoogleMap from '../../Components/google_map';
import { renderDirection } from '../../Components/map_direction';
import { fireStore, realTimeDatabase } from "../../api/firebase";
import DriverImage from '../../assets/among_us_red.png';
import PinImage from '../../assets/Pin.png';
import { off, onValue, ref } from 'firebase/database';
import { TripButton } from '../../Components/TripButton';
import { renderMarker } from '../../Components/map_marker';
import * as Api from '../../api/api_Calls'

export const Admin_View_Trip_info = ({navigation, route}) =>{
    const [tripID, setTripID] = useState(route.params.tripID)
    const [trip, setTrip] = useState(route.params.trip)//TODO: add refresh
    const [duration, setDuration] = useState(0) //API returns duration in mins
    const [distance, setDistance] = useState(0)

    const startTime =  new Date(trip.startTime.seconds*1000)
    const endTime = new Date(trip.endTime.seconds*1000)
    
    function diffTime()
    {
        const hr = (Math.floor((endTime - startTime)/1000/3600))%60
        const min = (Math.floor((endTime - startTime)/1000/60))%60
        const sec = (endTime - startTime)%60
        return (`${hr}:${('0'+min).slice(-2)}:${('0'+sec).slice(-2)}`);
    }
    
    const [directions, setDirections] = useState(
        renderDirection(
            trip.startLoc, 
            trip.endLoc,
            (res) => {
                setDuration(res.duration)
                setDistance(res.distance)}
        )
    )
    const [driverId, setDriverId] = useState(null)
    const [driverLoc, setDriverLoc] = useState(null)

    const mapsRegion = {
        latitude: trip.startLoc.latitude+((trip.endLoc.latitude-trip.startLoc.latitude)/2),
        longitude: trip.startLoc.longitude+((trip.endLoc.longitude-trip.startLoc.longitude)/2),
        latitudeDelta: Math.abs(trip.endLoc.latitude-trip.startLoc.latitude)*1.2,
        longitudeDelta: Math.abs(trip.endLoc.longitude-trip.startLoc.longitude)*1.2,
    }

    useEffect(() =>{
        const dbref = ref(realTimeDatabase, `users/${trip.driverID}`)
        const realtimeloc = onValue(dbref, (snapshot) => {
            const data = snapshot.val();
            if (data && data["lat"] && data["long"]){
                setDriverLoc({
                    latitude: data["lat"], 
                    longitude: data["long"]
                })
            }
        })

        return (() => off(dbref))
    }, [driverId, driverLoc])

    const navPassenger= () => {
        Api.GetUserByID(trip.passID)
        .then(resp => {
            navigation.push("Admin_View_Users_info", {"userID":trip.passID, "user":resp[trip.passID]})
        }).catch(err =>{
            console.log(err)
        })
    }

    const navDriver= () => {
        Api.GetUserByID(trip.driverID)
        .then(resp => {
            navigation.push("Admin_View_Users_info", {"userID":trip.driverID, "user":resp[trip.driverID]})
        }).catch(err =>{
            console.log(err)
        })
    }

    return (
        <NativeBaseProvider>
            <GoogleMap 
                style={{height:170}}
                directions={directions}
                originMarker={renderMarker(trip.startLoc, PinImage, "origin")}
                destinationMarker={renderMarker(trip.endLoc, PinImage, "destination")}
                driverMarker={(trip.status!="completed"&&driverLoc)?renderMarker(driverLoc, DriverImage, "driver"):null}
                startingRegion={mapsRegion} />

            <Container style={{width:"100%", maxWidth:"100%"}}>
                <Container bg={'#618d90'} style={{width:"100%", maxWidth:"100%", alignContent:"center"}}>
                    <Text color={"white"} textColor={"black"} textAlign={"center"} margin={"5px"} alignSelf={"center"}>{"Trip ID: " + tripID}</Text>
                </Container>
                <Container style={{width:"100%", maxWidth:"100%"}}>
                    <Container style={{width:"100%", maxWidth:"100%", margin:15}}>
                        <Text>Start: {startTime.toUTCString()}</Text>
                        <Text>End: {endTime.toUTCString()}</Text>
                        <Text style={{marginBottom:7}}>{("Duration : " + diffTime())}</Text>
                        <Text>{"Status: " + trip.status}</Text>
                    </Container>
                    <Container style={{width:"100%", maxWidth:"100%", margin:15}}>
                        <Text>{"Passenger: " + trip.passID}</Text>
                        <Text>{"Passenger Trip Rating: " + ((trip.passRating != -1)?trip.passRating:"N/A")}</Text>
                        <TripButton text={"Go to Passenger"} onPress={navPassenger}/>
                    </Container>
                    <Container style={{width:"100%", maxWidth:"100%", margin:15}}>
                        <Text>{"Driver: " + trip.driverID}</Text>
                        <Text>{"Driver Trip Rating: " + ((trip.driverRating != -1)?trip.driverRating:"N/A")}</Text>
                        <TripButton text={"Go to Driver"} onPress={navDriver}/>
                    </Container>
                </Container>
            </Container>
        </NativeBaseProvider>
    )
}