import {
    NativeBaseProvider,
    Center,
    Text,
    Container,
    Spinner,
    Pressable
} from 'native-base';
import React, { useState } from 'react';
import * as Api from '../../api/api_Calls'

export const Driver_Finding_Trip = ({navigation, route }) => {

    const route_to_passenger = async () => {
        await Api.GetNextTripInfo().then(trip => {
            if (trip){
                const tripID = Object.keys(trip)[0]
                //TODO: Change it to use auth current logged in user 
                Api.AssignDriver(tripID, route.params.userID).then(() => {
                    const passID = trip[tripID].passID
                    trip[tripID].status = "to_pass"; 
                    Api.GetUserByID(passID).then((res) => {        
                        const passengerInfo = res[passID]
                        navigation.push('Driver_Mapping', {
                            "user": route.params.user, 
                            "region": route.params.region, 
                            "origin": {"longitude": trip[tripID].startLoc.longitude, "latitude":trip[tripID].startLoc.latitude},
                            "destination": {"longitude": trip[tripID].endLoc.longitude, "latitude":trip[tripID].endLoc.latitude},
                            "tripID" : tripID,
                            "tripInfo" : trip[tripID],
                            "phone": passengerInfo["phone"],
                            "passengerName": passengerInfo["fName"], 
                            "userID": route.params.userID
                        })
                    }).catch(() => {
                        console.log("Something went wrong getting passenger info")
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