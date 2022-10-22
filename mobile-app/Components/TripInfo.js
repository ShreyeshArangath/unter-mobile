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



//the info of each trip, about each trip, starting location, dest, ect.
export function Tripinfo(props)
{
    const [startinglocation, setStartinglocation] = useState("");
    const [destination, setDestination] = useState("");
    let SelectedReactCode;

    function handleStartingLocationChange(text)
    {
        setStartinglocation(text);
    }

    function handleDestinationChange(text)
    {
        setDestination(text);
    }

    if(props.currentUser.type == "Passenger")
    {
        switch (props.currentUser.UIMode) {
            case 1:
                SelectedReactCode = <>
                    <Input variant="rounded" onChangeText={handleStartingLocationChange} placeholder="Starting location"/>
                    <Input variant="rounded" onChangeText={handleDestinationChange} placeholder="Destination"/>
                </>
                break;
            case 2:
                SelectedReactCode = <>
                    <Button width={"100%"} onPress={()=>props.currentUser.UIModeModifyer(1)}>{(startinglocation != "")?startinglocation:"starting location is NotDefined"}</Button>
                    <Button width={"100%"} onPress={()=>props.currentUser.UIModeModifyer(1)}>{(destination != "")?destination:"destination is NotDefined"}</Button>                  
                </>
                break;
            case 3:
                SelectedReactCode = <>
                    <Text>{"Average wait time to find a ride: 5min"}</Text>
                </>
                break;
            case 4:
                SelectedReactCode = <>
                    <Text>{"Driver is about " + "2min" + " away, please meet at " + startinglocation}</Text>
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
                <Text>{"Pickup location: " + startinglocation}
                </Text>
            </>
            break;
            case 4:
            case 5:
            SelectedReactCode = <>
                <Text>{"Drop off location: " + destination}</Text>
            </>
            break;
        
            default:
                SelectedReactCode = <Text>module not defined for driver on this ui mode</Text>
                break;
        }
    }
    return (
        <Box marginLeft={"20%"} width={"50%"} alignItems={"center"} position={"absolute"} bottom={"11%"} bg={'#fdfafb'}>
            {SelectedReactCode}
        </Box>
    );
}
