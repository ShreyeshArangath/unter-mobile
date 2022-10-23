import {
    Text,
    HStack,
    Avatar,
    Center
} from 'native-base';
import { Dimensions } from 'react-native';
import React, { Component, useState } from 'react';

const dummyImageURI = "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
//the code for the top menue bar(username and back button for now)
export function TopMenuBar(props)
{   
    return (
    <HStack space={5} justifyContent="center" >
         <Center>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {props.user.username}
            </Text>
        </Center>
        <Center>
            <Avatar 
                size="sm"
                source={{
                uri: dummyImageURI
                }} 
            />
        </Center>  
    </HStack>
    );
}