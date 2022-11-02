import {
    Button,
    Box,
    NativeBaseProvider,
    VStack,
    Center,
    KeyboardAvoidingView,
    ZStack, 
    Flex,
    Text,
    Container,
    Heading,
    Spinner,
    Pressable
} from 'native-base';
import React, { Component, useState } from 'react';
import GoogleMap from '../Components/google_map';
import { Instructions } from '../Components/Instructions';
import { TripButton } from '../Components/TripButton';
import { renderMarker } from '../Components/map_marker';
import { renderDirection } from '../Components/map_direction';
import { TEXT_INSTRUCTIONS } from '../Components/prompts_responses'
import DriverImage from '../assets/among_us_red.png';
import PinImage from '../assets/Pin.png';
import * as Api from '../api/api_Calls'
import { LocationProvider } from '../LocationProvider';


export const Driver_Splash = ({ navigation, route }) => {
    return (
        <NativeBaseProvider>
            <Container h="100%" w="100%" maxWidth="100%" bg="#230903" flex={1} justifyContent='center' alignItems='center'>
                <Center style={{margin: 30}}>
                    <Text fontSize="6xl" color="#FFFFFF">Unter</Text>
                    <Text fontSize="xl" color="#FFFFFF">Driver</Text>
                </Center>
                <Center style={{margin: 30}}>
                    <TripButton text="Start Finding Trips" color={"white"} textColor={"black"} onPress={() => {
                        navigation.push("Driver_Finding_Trip", {
                            "user": {
                                //TODO: Add a function that gets the name of the current active user — after authentication 
                                "username": "Tyler",
                                "fName": "Tyler"
                            }, 
                            "color": "#E5E5E5",
                            "region": route.params.region
                        })
                    }}>
                    </TripButton> 

                    <TripButton text="View Past Trips" color={"white"} textColor={"black"} onPress={() => {
                        navigation.push("TODO_ADD_GET_ALL_TRIPS_PAGE", { 
                            "color": "#FFFFFF",
                            "region": route.params.region
                        })
                    }}>
                    </TripButton> 
                </Center>
               
            </Container>
        </NativeBaseProvider>
    )
}

export const Driver_Finding_Trip = ({navigation, route }) => {
    
    const route_to_passenger = () => {
        Api.GetNextTripInfo().then(trip => {
            const tripID = Object.keys(trip)[0]
            Api.AssignDriver(tripID, "Tyler").then(() => {
                trip[tripID].status = "to_pass"; 
                navigation.push('Driver_Mapping', {
                    "user": route.params.user, 
                    "region": route.params.region, 
                    "origin": {"longitude": trip[tripID].startLoc.longitude, "latitude":trip[tripID].startLoc.latitude},
                    "destination": {"longitude": trip[tripID].endLoc.longitude, "latitude":trip[tripID].endLoc.latitude},
                    "tripID" : tripID,
                    "tripInfo" : trip[tripID],
                    "passId": trip[tripID].passID,
                })
            })
        });
    }

    return (
        <NativeBaseProvider  >
            <Pressable onPress={route_to_passenger} h="100%" w="100%" maxWidth="100%">
                <Container h="100%" w="100%" maxWidth="100%" bg="#230903" flex={1} justifyContent='center' alignItems='center'>
                    <Center style={{margin: 30}}>
                        <Text fontSize="6xl" color="#FFFFFF">Unter</Text>
                        <Text fontSize="xl" color="#FFFFFF">Driver</Text>
                    </Center>

                    <Center style={{margin: 30}}>
                        <Spinner accessibilityLabel="Loading posts" />
                        <Text fontSize="xl" color="#FFFFFF">Finding a Trip...</Text>
                    </Center>
                </Container>
            </Pressable>
        </NativeBaseProvider>
    )
}


export const Driver_Mapping = ({navigation, route}) => {
    const [origin, setOrigin] = useState(route.params.region) // TODO: set with users current location
    const [destination, setDestination] = useState(route.params.destination)
    const [duration, setDuration] = useState(0) //API returns duration in mins
    const [distance, setDistance] = useState(0)
    var trip = route.params.tripInfo

    const [directions, setDirections] = useState(renderDirection(origin, 
        destination,
        (res) => {
            setDuration(res.duration)
            setDistance(res.distance) })
    )

    const progress_next_step = () => {
        switch (trip.status ) {
            case "on_delivery":
                Api.CompleteTrip(route.params.tripID)
                navigation.navigate('Driver_Finding_Trip')
                break;
            case "to_pass":
                Api.UpdateTripStatus(route.params.tripID, "on_delivery")
                trip.status = "on_delivery"
                navigation.push('Driver_Mapping', {
                    "user":  route.params.user,
                    "region": route.params.region, 
                    "origin": {"longitude": route.params.tripInfo.startLoc.longitude, "latitude": route.params.tripInfo.startLoc.latitude},
                    "destination": {"longitude": route.params.tripInfo.endLoc.longitude, "latitude": route.params.tripInfo.endLoc.latitude},
                    "tripID" : route.params.tripID,
                    "tripInfo" : trip
                })
                break;
            default:
                break;
        }
    }

    return (// TODO: Add notify passenger Driver is here
        <NativeBaseProvider>
            <LocationProvider name={route.params.user.username}>
            <ZStack position={"relative"} width="100%" height="100%" >
                <GoogleMap directions={directions}
                    originMarker={renderMarker(origin, PinImage, "origin")}
                    destinationMarker={renderMarker(destination,PinImage, "destination")} />
                <Box width="100%" marginTop={10}>
                    <Flex alignItems="center" direction="column" >
                        <Instructions header={TEXT_INSTRUCTIONS[trip.status].header_instruction} 
                        body={`It'll take you ${duration.toFixed(0)} mins to drop off ${route.params.passId}`}/>
                    <TripButton text={TEXT_INSTRUCTIONS[trip.status].button_instruction} onPress={progress_next_step}/>
                    </Flex>
                </Box>
            </ZStack>
            </LocationProvider>
        </NativeBaseProvider> 
    );
}