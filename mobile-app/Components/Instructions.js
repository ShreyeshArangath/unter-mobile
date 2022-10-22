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


//the item that displays the instruction popup for each user type
export function Instructions(props)
{
    let SelectedReactCode;

    if(props.currentUser.type == "Passenger")
    {
        switch (props.currentUser.UIMode) {
            case 1:
                SelectedReactCode = <>
                    <Text fontSize={"15"}>Please enter a destination</Text>
                    <Text fontSize={"10"}>Where are you going today</Text>
                </>
                break;
            case 2:
                SelectedReactCode = <>
                    <Text fontSize={"15"}>Confirm Destination</Text>
                    <Text fontSize={"10"}>Lets review your planned journey</Text>
                </>
                break;
            case 3:
                SelectedReactCode = <>
                    <Text fontSize={"15"}>Locating Rides</Text>
                    <Text fontSize={"10"}>finding the rides closest to you</Text>
                </>
                break;
            case 4:
                SelectedReactCode = <>
                    <Text fontSize={"15"}>Rides found</Text>
                    <Text fontSize={"10"}>Hang tight, we'll be there shortly</Text>
                </>
                break;
            default:
                SelectedReactCode = <Text >undefied passenger UIMode</Text>
                break;
        }
    }
    else if(props.currentUser.type == "Driver")
    {
        switch (props.currentUser.UIMode) {
            case 3:
            SelectedReactCode = <>
                <Text fontSize={"15"}>Nearest Passenger</Text>
            </>
            break;
            case 4:
            SelectedReactCode = <>
                <Text fontSize={"15"}>Waiting for passenger to Enter</Text>
            </>
            break;
            case 5:
            SelectedReactCode = <>
                <Text fontSize={"15"}>Drop off passenger</Text>
            </>
            break;
        
            default:
                break;
        }

        SelectedReactCode = 
        <>
            {SelectedReactCode}
            <Text fontSize={"10"}>{"Name: "/* + get rider name here*/}</Text>
        </>
    }
    else if(props.currentUser.type == "Admin")
        return;

    return (
        <Box marginLeft={"26%"} width={"50%"} alignItems={"center"} position={"relative"} bottom={props.currentUser.type == "Driver"? "25%" : "35%"} bg={'#729EA1'}>
            {SelectedReactCode}
        </Box>
        );
}