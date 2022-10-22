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


//the code for the top menue bar(username and back button for now)
export function TopMenuBar(props)
{
    return (
    <Box bg={props.color}>
        <Button style={{marginTop: "10%", marginRight: "auto"}} 
        onPress={() => props.keepingUser.set(false)}>{"   <   "}</Button>
        
        <Text color={"#ffffff"} position={"absolute"} right={2} top={"10"}>
            {props.keepingUser.currentUser.UIMode +  ": " + 
                props.keepingUser.currentUser.type}
        </Text>
    </Box>
    );
}