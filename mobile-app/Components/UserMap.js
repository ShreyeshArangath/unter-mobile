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
    SafeAreaView,
} from 'native-base';
import { Dimensions } from 'react-native';
import React, { Component, useState } from 'react';

import GoogleMap from './google_map';
import GoogleMapSearch from './google_map_search';

//item to contain the map object, to be replaced with google maps and firebase code later
export function UserMap(props)
{
    const region = {"latitude": 33.5814671, "longitude": -101.8764627}
    return (
        <>
        <GoogleMap />
          <GoogleMapSearch api_key={"AIzaSyC7eq2uYaIBU3F2wC2MotRMYlG5O8HsQQg"} region={region}/>
        </>
    );
}