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

import MapIcon from "./MapsicleMap.jpg"
//has a object of all the information to pass to the different UIs in 
//one object to pass the values as reference

export class TempClass
{
    constructor(type)
    {
        this.type = type;

        const [UIMode, UIModeModifyer] = useState(1);

        this.UIMode = UIMode;
        this.UIModeModifyer = UIModeModifyer;

        //console.log("ctor: " + this.type + ": " + this.UIMode);
    }
}

export class UIUser
{
  constructor(show, set, currentUser)
  {
    this.show = show;
    this.set = set;
    this.currentUser = currentUser;
  }
}

export function TopMenuBar(props)
{
    return (
    <Box bg={props.color}>
        <Button style={{marginTop: "10%", marginRight: "auto"}} 
        onPress={() => props.amIStaying.set(false)}>{"   <   "}</Button>
        <Text color={"#ffffff"} position={"absolute"} right={2} top={"10"}>
            {props.amIStaying.currentUser.UIMode +  ": " + props.amIStaying.currentUser.type}
        </Text>
    </Box>
    );
}

export function UserMap(props)
{
    return (
        <Box style={{marginTop: "1%", paddingBottom: "20%"}}>
            <Image source={MapIcon} alt="google Maps image" size={725} />
        </Box>
    );
}

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
                <Text>{"Pickup location: " + startinglocation}</Text>
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