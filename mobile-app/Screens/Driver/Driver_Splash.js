import {
    NativeBaseProvider,
    Center,
    Text,
    Container,
} from 'native-base';
import React from 'react';
import { TripButton } from '../../Components/TripButton';


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
                            "userID": "Wzy8ScBJgiVaQBImQvMi",
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