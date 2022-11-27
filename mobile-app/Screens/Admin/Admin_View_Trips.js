import {
    Box,
    NativeBaseProvider, 
    Flex,
    Text,
    Container,
    Pressable,
    ScrollView
} from 'native-base';
import React, { useEffect, useState } from 'react';

export const Admin_View_Trips = ({navigation, route}) => {
    const [trips, setTrips] = useState(route.params.trips)//TODO: add refresh

    function showBriefTripInfo(tripID){
        const trip_start_time = new Date(trips[tripID].startTime?.seconds * 1000).toLocaleString()
        return (
        <Box flex={1} width="100%" key={tripID} bg={"#729EA1"} style={{margin:5, borderRadius:10}}>
            <Pressable h="100%" w="100%" maxWidth="100%" onPress={()=> nextScreen(tripID)}>
                <Text color={"white"} textColor={"black"} textAlign={"center"} margin={"5px"}>{tripID}</Text>
                <Container bg={"#242424"} w="100%" maxWidth="100%"  style={{paddingHorizontal:10, paddingVertical:5, borderRadius:10}}>
                    <Flex direction='row'>
                        <Text color={"white"}>{trip_start_time}</Text>
                        <Text color={"white"} flex={"1"} textAlign={"right"}>{trips[tripID].status}</Text>
                    </Flex>
                    <Flex direction='row'>
                        <Text color={"white"}>{"Driver: " + trips[tripID].driverID}</Text>
                    </Flex>
                    <Flex direction='row'>
                        <Text color={"white"}>{"Passenger: " + trips[tripID].passID}</Text>
                    </Flex>
                </Container>
            </Pressable>
        </Box>)
    }

    const nextScreen = (tripID) => {
        navigation.push("Admin_View_Trip_info", {"tripID": tripID, "trip": trips[tripID]})
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <Container style={{height:"100%", width:"100%", maxWidth:"100%", justifyContent:'center', alignItems:'center', padding:10}}>
                    {Object.keys(trips).map((tripID) => (showBriefTripInfo(tripID)) )}
                </Container>
            </ScrollView>
        </NativeBaseProvider>
    )
}