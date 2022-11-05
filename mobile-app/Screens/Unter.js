import { HStack, NativeBaseProvider, extendTheme, Button, KeyboardAvoidingView, Container, Box, Center, Flex } from "native-base";
import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { UnterRatingModal } from "../Components/Rating";
import { TripButton } from "../Components/TripButton";

export const Unter = ({route, navigation}) => {
    const handleOnPress = (type) => {
      navigation.navigate(type, {
        "region": route.params.region
      })  
    }
    return (
      <NativeBaseProvider>
        <Center marginTop={"50%"}>
            <Image source={require('../assets/icon.png')} style={{width: 100, height: 100, margin: 40}}/>
            <TripButton text={"Passenger"} onPress={() => handleOnPress("Passenger")}/>
            <TripButton text={"Driver"} onPress={() => handleOnPress("Driver")}/>
            <TripButton text={"Admin"} onPress={() => handleOnPress("Admin")}/>
        </Center>
      </NativeBaseProvider>
    )
  }
