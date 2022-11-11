import {
    NativeBaseProvider,
    Center,
    Text,
    Container,
    Spinner,
    Pressable
} from 'native-base';
import React from 'react';
import * as Api from '../../api/api_Calls'

export const Driver_Finding_Trip = ({navigation, route }) => {
    
    const route_to_passenger = () => {
        Api.GetNextTripInfo().then(trip => {
            console.log(trip)
            if (trip){
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
                    })
                })
            }
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