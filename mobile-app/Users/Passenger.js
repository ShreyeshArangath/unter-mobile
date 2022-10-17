import {
    Button,
    Text,
    Modal,
    Center,
    FormControl,
    Input,
    NativeBaseProvider,
} from 'native-base';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import React, { Component } from 'react';


import {TopMenuBar, UserMap, TripButtons, Instructions, Tripinfo} from './Shared';


export const Passenger = (showPass) => {

    return (
        <NativeBaseProvider>
            <TopMenuBar color={"#B53838"} keepingUser={showPass} />
            <UserMap />
            <Instructions currentUser={showPass.currentUser} />
            <Tripinfo currentUser={showPass.currentUser} />
            <TripButtons currentUser={showPass.currentUser} />
        </NativeBaseProvider>
        );
  }