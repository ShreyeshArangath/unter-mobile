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

import MapIcon from "../assets/MapsicleMap.jpg"

//item to contain the map object, to be replaced with google maps and firebase code later
export function UserMap(props)
{
    return (
        <Box style={{marginTop: "1%", paddingBottom: "20%"}}>
            <Image source={MapIcon} alt="google Maps image" size={725} />
        </Box>
    );
}