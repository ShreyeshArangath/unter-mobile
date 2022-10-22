import {
    Button,
    Text,
    Modal,
    Center,
    FormControl,
    Input,
    NativeBaseProvider,
    Box,
    Image,
} from 'native-base';
import { Dimensions } from 'react-native';
import React, { Component, useState } from 'react';



//allow us to go to next page of the screen
export function TripButtons(props)
{
    function incUIMode(props)
    {
        switch (props.currentUser.type) {
            case "Passenger":
                props.currentUser.UIModeModifyer((props.currentUser.UIMode+1)%5);
                break;
            case "Driver":
                props.currentUser.UIModeModifyer((props.currentUser.UIMode+1)%7);
                break;
        
            default:
                break;
        }
    }

    //todo, change for different modes/users
    return (
        <Box width={"100%"} position={"absolute"} bottom={"5%"}>
            <Button onPress={() => incUIMode(props)}>{"Start      ->"}</Button>
        </Box>
    );
}