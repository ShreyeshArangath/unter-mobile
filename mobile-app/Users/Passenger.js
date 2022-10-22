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

import { Tripinfo } from '../Components/TripInfo';
import { TopMenuBar } from '../Components/TopMenuBar';
import { UserMap } from '../Components/UserMap';
import { TripButtons } from '../Components/TripButtons';
import { Instructions } from '../Components/Instructions';


export const Passenger = (props) => {

    return (
        <NativeBaseProvider safeArea>
            <UserMap />
            <TopMenuBar color={"#B53838"} keepingUser={props.showPass} />
            <Instructions currentUser={props.showPass.currentUser} />
            <Tripinfo currentUser={props.showPass.currentUser} />
            <TripButtons currentUser={props.showPass.currentUser} />
        </NativeBaseProvider>
        );
  }