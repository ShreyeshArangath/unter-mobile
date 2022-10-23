import {
    Button,
    Box,
    NativeBaseProvider,
    ZStack, 
    Flex,
    Text,
} from 'native-base';
import React, { Component, useState } from 'react';
import { Instructions } from '../Components/Instructions';
import GoogleMap from '../Components/google_map';
import GoogleMapSearch, { IconTypes } from '../Components/google_map_search';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {SearchBox} from '../Components/SearchBox';
import { StyleSheet, Image } from 'react-native';
import { TripButton } from '../Components/TripButton';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';

export const Passenger_Splash = ({ navigation, route }) => {
   
    return (
        <NativeBaseProvider>
            <Button title="View Past Trips" onPress={() => {
                navigation.push("Passenger_PickLocation", {
                    "user": {
                        //TODO: Add a function that gets the name of the current active user — after authentication 
                        "username": "Shreyesh"
                    }, 
                    "color": "#E5E5E5",
                    "region": route.params.region
                })
            }}>
             Next! 
            </Button> 
        </NativeBaseProvider>
    )
}

export const Passenger_PickLocation = ({route, navigation}) => {
    const [origin, setOrigin] = useState(null)
    const [destination, setDestination] = useState(null)
    const startRoute = () => {
        
        //TODO: Navigate to the next screen 
        navigation.push('Passenger_ConfirmLocation', {
            "user": {
                "username": "Shreyesh"
            }, 
            "color": "#E5E5E5",
            "region": route.params.region, 
            "origin": origin, 
            "destination": destination
        })

    }
    return (
        <NativeBaseProvider safeArea >
            <ZStack position={"relative"} width="100%" height="100%" >
                <GoogleMap />
                    <Box width="100%" marginTop={20}>
                        <Flex alignItems="center" direction="column" >
                            <Instructions header={"Enter your destination"} 
                            body={"Where are we going today?"}/>
                          <SearchBox 
                            api_key={GOOGLE_MAPS_API_KEY} 
                            originSetter={setOrigin}
                            destinationSetter={setDestination}
                            region={route.params.region}/>
                        <TripButton text={"Start Trip"} onPress={startRoute}/>
                        </Flex>
                    </Box>
            </ZStack>
        </NativeBaseProvider>
    )
}

export const Passenger_ConfirmLocation = ({route, navigation}) => {
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
        apikey={GOOGLE_MAPS_API_KEY}
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
                            <Instructions header={"Confirm Destination"} 
                            body={`Travel Time: ${duration.toFixed(0)} mins`}/>
                        <TripButton text={`Confirm Destination`} onPress={() => {}}/>
                        </Flex>
                    </Box>
            </ZStack>
        </NativeBaseProvider> 
    );
}

export const Passenger_LocateRide = ({route, navigation}) => {
    return (
        <NativeBaseProvider>
        
        <GoogleMap />
        </NativeBaseProvider>
    );
}

export const Passenger_RideFound = ({route, navigation}) => {
    return (
        <NativeBaseProvider safeArea>
        
        <GoogleMap />
        </NativeBaseProvider>
    );
}