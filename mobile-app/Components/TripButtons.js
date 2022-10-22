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
                switch (props.currentUser.UIMode) {
                    case "Pick Location":
                        props.currentUser.UIModeModifyer("Confirm Location");
                        break;
                    case "Confirm Location":
                        props.currentUser.UIModeModifyer("Locating Ride");
                        break;
                    case "Locating Ride":
                        props.currentUser.UIModeModifyer("Ride Found");
                        break;
                    case "Ride Found":
                        props.currentUser.UIModeModifyer("Pick Location");
                        break;
                                            
                    default:
                        break;
                }
            
                break;
            case "Driver":
                switch (props.currentUser.UIMode) {
                    case "Confirm Trip":
                        props.currentUser.UIModeModifyer("Waiting on Passenger");
                        break;
                    case "Waiting on Passenger":
                        props.currentUser.UIModeModifyer("Dropping off Passenger");
                        break;
                    case "Dropping off Passenger":
                        props.currentUser.UIModeModifyer("Confirm Trip");
                        break;
                                            
                    default:
                        break;
                }
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