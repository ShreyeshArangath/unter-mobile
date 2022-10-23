import {
    Button,
    Box,
    NativeBaseProvider,
    VStack,
    Center,
    KeyboardAvoidingView,
    ZStack, 
    Flex
} from 'native-base';
import React, { Component, useState } from 'react';
import { Tripinfo } from '../Components/TripInfo';
import { TopMenuBar } from '../Components/TopMenuBar';
import { UserMap } from '../Components/UserMap';
import { TripButtons } from '../Components/TripButtons';
import { Instructions } from '../Components/Instructions';
import GoogleMap from '../Components/google_map';
import GoogleMapSearch, { IconTypes } from '../Components/google_map_search';
import {GOOGLE_MAPS_API_KEY} from '@env';

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

    return (
        <NativeBaseProvider safeArea >
            <ZStack position={"relative"} width="100%" height="100%" >
                <GoogleMap markers = {[origin, destination]}/>
                    <Box width="100%" marginTop={20}>
                        
                        <Flex alignItems="center" direction="column">
                            <GoogleMapSearch type={"origin"} placeholder="Where from?" api_key={GOOGLE_MAPS_API_KEY} region={route.params.region} setter={setOrigin}/>
                            <GoogleMapSearch type={"destination"} placeholder="Where to?" api_key={GOOGLE_MAPS_API_KEY} region={route.params.region} setter={setDestination}/>    
                        </Flex>
                    </Box>
            </ZStack>
        </NativeBaseProvider>
    )
}

export const Passenger_ConfirmLocation = ({route, navigation}) => {
    return (
        <NativeBaseProvider>

        <GoogleMap />

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