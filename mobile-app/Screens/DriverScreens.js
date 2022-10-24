import {
    Button,
    Box,
    NativeBaseProvider,
    VStack,
    Center,
    KeyboardAvoidingView,
    ZStack, 
    Flex,
    Container,
    Heading,
    Pressable
} from 'native-base';
import React, { Component, useState } from 'react';
import GoogleMap from '../Components/google_map';
import { Instructions } from '../Components/Instructions';
import { TripButton } from '../Components/TripButton';
import GoogleMapSearch, { IconTypes } from '../Components/google_map_search';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import {GOOGLE_MAPS_API_KEY} from '@env';


export const Driver_Splash = ({ navigation, route }) => {
   
    return (
        <NativeBaseProvider>
            <Container h="100%" w="100%" maxWidth="100%" bg="#230903" flex={1} justifyContent='center' alignItems='center'>

                <Container >
                    <Heading size="4xl" color="#FFFFFF">Unter</Heading>
                    <Heading size="xl" color="#FFFFFF">Driver</Heading>
                </Container>

                <Button title="Start Finding Trips" onPress={() => {
                    navigation.push("Driver_Find_Trip", {
                        "user": {
                            //TODO: Add a function that gets the name of the current active user — after authentication 
                            "username": "Hans"
                        }, 
                        "color": "#FFFFF",
                        "region": route.params.region
                    })
                }}>
                Start Finding Trips
                </Button> 

                <Button title="View Past Trips" onPress={() => {
                    navigation.push("TODO_ADD_GET_ALL_TRIPS_PAGE", { 
                        "color": "#FFFFF",
                        "region": route.params.region
                    })
                }}>
                View Trips History
                </Button> 
            </Container>
        </NativeBaseProvider>
    )
}

export const Driver_Find_Trip = ({route, navigation}) => {

    const route_to_passenger = () => {
        navigation.push('Driver_ToPassenger', {
            "user": {
                "username": "Hans"
            }, 
            "color": "#E5E5E5",
            "region": route.params.region, 
            "origin": {"latitude": 33.58633730000000, "longitude": -101.8747213000000}, //TODO: Get Current Location
            "destination": {"latitude": 33.59008510344955, "longitude":-101.87428390440266} //TODO: GET THIS INFO FROM API REQUEST
        })
    }

    return (
        <NativeBaseProvider  >
            <Pressable onPress={route_to_passenger} h="100%" w="100%" maxWidth="100%">
                <Container h="100%" w="100%" maxWidth="100%" bg="#230903" flex={1} justifyContent='center' alignItems='center'>
                    <Container >
                        <Heading size="4xl" color="#FFFFFF">Unter</Heading>
                        <Heading size="xl" color="#FFFFFF">Driver</Heading>
                    </Container>

                    <Container>
                        <Heading size="2xl" color="white">Finding A Trip...</Heading>
                    </Container>
                </Container>
            </Pressable>
        </NativeBaseProvider>
    )
}

export const Driver_ToPassenger = ({route, navigation}) => {
    const [origin, setOrigin] = useState(route.params.origin)
    const [destination, setDestination] = useState(route.params.destination)
    const [duration, setDuration ] = useState(0)  //API returns duration in mins

    // TODO: Custom Markers 
    const renderOriginMarker = () => {
        return <Marker coordinate={{latitude: origin.latitude, longitude: origin.longitude}}/>
    }

    const renderDestinationMarker = () => {
        return <Marker coordinate={{latitude: destination.latitude, longitude: destination.longitude}}/>
    }

    const renderDirection = () => {
        return <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={process.env.GOOGLE_MAPS_API_KEY}
        strokeWidth={5}
        strokeColor="blue"
        onReady={(res) => {
              setDuration(res.duration)
        }}
      />
    }

    return (
        <NativeBaseProvider>
            <ZStack position={"relative"} width="100%" height="100%" >
                <GoogleMap directions={renderDirection()} originMarker={renderOriginMarker()} destinationMarker={renderDestinationMarker()} />
                <Box width="100%" marginTop={20}>
                        <Flex alignItems="center" direction="column" >
                            <Instructions header={"Pick Up The Passenger"} 
                            body={`Travel Time: ${duration.toFixed(0)} mins`}/>
                        <TripButton text={`I have the Passenger`} onPress={() => {}}/>
                        </Flex>
                    </Box>
            </ZStack>
        </NativeBaseProvider> 
    );
}