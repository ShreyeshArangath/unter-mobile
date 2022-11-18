import {
    Box,
    NativeBaseProvider,
    Flex,
    Text,
    Container
} from 'native-base';
import {Alert, Image} from 'react-native'
import React, { useEffect, useState } from 'react';
import GoogleMap from '../../Components/google_map';
import { Marker } from 'react-native-maps';
import { renderDirection } from '../../Components/map_direction';
import { fireStore, realTimeDatabase } from "../../api/firebase";
import DriverImage from '../../assets/among_us_red.png';
import { off, onValue, ref } from 'firebase/database';



export const Admin_View_Trip_info = ({navigation, route}) =>{
    const [tripID, setTripID] = useState(route.params.tripID)
    const [trip, setTrip] = useState(route.params.trip)//TODO: add refresh

    function startDate()
    {
        return new Date(trip.startTime.seconds*1000);
    }
    function endDate()
    {
        return new Date(trip.endTime.seconds*1000);
    }
    function diffTime()
    {
        var hr = 0, min = 0, sec = 0;
        hr = Math.floor((endDate()-startDate())/3600000)
        min = Math.floor(((endDate()-startDate())-(hr*3600000))/60000)
        sec = Math.floor(( (endDate()-startDate())-(hr*3600000)-(min*60000))/1000)
        return "" + hr+"hr:"+min+"min."+sec+"sec ";
    }
    
    const [directions, setDirections] = useState(
        renderDirection(
            trip.startLoc, 
            trip.endLoc,
            (res) => {}
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


    const renderDriverMarker = (loc, id) => {
        if(loc){
            return(
                <Marker identifier={id} coordinate={{latitude: loc.latitude, longitude: loc.longitude}}> 
                    <Image
                        source={DriverImage}
                        style={{width: 25, height: 35}}
                        resizeMode="cover"
                    />
                </Marker>
            ) 
        }
    }

    const renderMarker = (loc, id) => {
        return <Marker identifier={id} coordinate={{latitude: loc.latitude, longitude: loc.longitude}}/>
    }

    return (
        <NativeBaseProvider>
            <Box bg={"#729EA1"} paddingLeft={"2.5%"} paddingRight={"2.5%"}>
                <Container bg={'#618d90'} style={{width:"100%", maxWidth:"100%", alignContent:"center"}}>
                    <Text color={"white"} textColor={"black"} textAlign={"center"} margin={"5px"} alignSelf={"center"}>{"Trip ID: " + tripID}</Text>
                </Container>
                <Flex direction='row'>
                    <Text>{"Passenger: " + trip.passID}</Text>
                    <Text marginLeft={"auto"}>{"Status: " + trip.status}</Text>
                </Flex>
                <Text>{"Driver: " + trip.driverID}</Text>
                <Flex flexDir={"row"}>
                    <Text>{("\nDate: " + startDate()).substring(0, 21)}</Text>
                    <Text marginLeft="auto">{("\nDuration : " + diffTime())}</Text>
                </Flex>
                <Flex flexDir="row">
                    <Text>{"\nstart Time: " + startDate().toLocaleTimeString()}</Text>
                    <Text marginLeft="auto">{"\nend Time: " + endDate().toLocaleTimeString()}</Text>
                </Flex>
                <Text>{"\nTrip Rating: " + ((trip.passRating != -1)?trip.passRating:"N/A")}</Text>
            </Box>
            <Container flex={2} minWidth="100%">
            <GoogleMap directions={directions}
                originMarker={renderMarker(trip.startLoc, "origin")}
                destinationMarker={renderMarker(trip.endLoc, "destination")}
                driverMarker={renderDriverMarker(((trip.status != "completed")?driverLoc:null), "driver")}
                startingRegion={mapsRegion} />
            </Container>
        </NativeBaseProvider>
    )
}