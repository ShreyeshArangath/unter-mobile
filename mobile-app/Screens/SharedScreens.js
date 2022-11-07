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
import { renderMarker } from '../Components/map_marker';
import GoogleMapSearch, { IconTypes } from '../Components/google_map_search';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_API_KEY} from '@env';
import DriverImage from '../assets/among_us_red.png';
import PinImage from '../assets/Pin.png';
import { NavigationHelpersContext } from '@react-navigation/native';


export const Login_Screen = ({ navigation, route }) => {
    return (
        <NativeBaseProvider>
            <Container h="100%" w="100%" maxWidth="100%" bg="#FFFFFF" flex={1} justifyContent='center' alignItems='center'>

                <Container >
                    <Heading size="4xl" color="#000000">Unter</Heading>
                </Container>
                {"\n\n\n\n\n\n\n\n"}
                <Button title="Passenger" onPress={() => {
                    navigation.navigate("PassengerScreens", {screen: 'Passenger_Splash', params:{ "region": route.params.region}})
                }}>
                Passenger
                </Button> 
                {"\n\n\n"}
                <Button title="Driver" onPress={() => {
                    navigation.navigate("DriverScreens", {screen: 'Driver_Splash', params:{ "region": route.params.region}})
                }}>
                Driver
                </Button> 
                {"\n\n\n"}
                <Button title="Admin" onPress={() => {}}>
                Admin
                </Button> 


            </Container>
        </NativeBaseProvider>
    )
}
