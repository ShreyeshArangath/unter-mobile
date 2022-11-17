import {
    Box,
    NativeBaseProvider, 
    Flex,
    Text,
    Container,
    Spinner,
    ScrollView,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { TripButton } from '../../Components/TripButton';
import * as Api from '../../api/api_Calls'
const { Timestamp } = require("firebase/firestore")

export const Admin_View_Trips = ({navigation, route}) => {
    const [trips, setTrips] = useState(route.params.trips)//TODO: add refresh
    const [loadingSelectedTrip, changeLoadingTrip] = useState(null);


    function showBriefTripInfo(tripID){
        const trip_start_time = new Date(trips[tripID].startTime?.seconds * 1000).toLocaleString()
        return (
        <Box flex={1} width="100%" key={tripID} bg={"#4abdbf"} style={{paddingHorizontal:"4%"}}>
            {
            (tripID != loadingSelectedTrip)?
            <TripButton text={tripID} color={"white"} textColor={"black"} onPress={()=> nextScreen(tripID)} />:
            <Flex direction='row' bg="#ffffff">
                <Text>{"Loading Trip" + loadingSelectedTrip}</Text>
                <Spinner accessibilityLabel={"Loading Trip" + loadingSelectedTrip}></Spinner>
            </Flex>
            }
            <Flex direction='row'>
                <Text>{" Trip Passenger: " + trips[tripID].passID}</Text>
                <Text marginLeft={"auto"}>{trip_start_time}</Text>
            </Flex>
            <Flex direction='row'>
                <Text>{" Trip Driver: " + trips[tripID].driverID}</Text>
                <Text marginLeft={"auto"}>status: {trips[tripID].status}</Text>
            </Flex>
        </Box>)
    }

    const nextScreen = (tripID) => {
        changeLoadingTrip(tripID);
        Api.GetTripByID(tripID).then(resp => {
            let SelectedTrip = []
            for(var x in resp)
            {
                SelectedTrip.push({"id": x, "data": resp[x]})
            }
            changeLoadingTrip(null);
            navigation.push("Admin_View_Trip_info", {"SelectedTrip":SelectedTrip[0]})
        }).catch(err =>{
            console.log(err)
        })
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <Container h="100%" w="100%" maxWidth="100%" bg="#5ccfe0" flex={1} justifyContent='center' alignItems='center'>
                    {Object.keys(trips).map((tripID) => (showBriefTripInfo(tripID)) )}
                </Container>
            </ScrollView>
        </NativeBaseProvider>
    )
}