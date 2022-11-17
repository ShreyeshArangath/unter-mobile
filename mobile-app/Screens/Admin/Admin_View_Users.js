import {
    Box,
    NativeBaseProvider,
    Center,
    Flex,
    Text,
    Container,
    ScrollView,
} from 'native-base';
import React, { useEffect, useState } from 'react';


export const Admin_View_Users = ({navigation, route}) => {
    function showBriefUserInfo(tripInfo, tripIndex){
        return (<Box flex={1} width="100%" key={tripIndex} bg={(tripIndex%2 == 0)?"#4abdbf" : "#a4dbfb"}>
            {/*<TripButton text={tripInfo.id} color={"white"} textColor={"black"} />*/}
            <Center>
                <Text>{"UUID: " + tripInfo.id}</Text>
            </Center>
            <Flex direction='row'>
                <Text>{" First Name: " + tripInfo.data.fName}</Text>
                <Text marginLeft={"auto"}>{("Last Name: " + tripInfo.data.lName + " ")}</Text>
            </Flex>
            <Flex direction='row'>
                <Text>{"Type: " + tripInfo.data.type}</Text>
                <Text marginLeft={"auto"}>{"DOB: " + tripInfo.data.dob}</Text>
            </Flex>
            
        </Box>)
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <Container h="100%" w="100%" maxWidth="100%" bg="#5ccfe0" flex={1} justifyContent='center' alignItems='center'>
                    {route.params.trips.map((trip, i) => (showBriefUserInfo(trip, i)))}
                </Container>
            </ScrollView>
        </NativeBaseProvider>
    )
}
