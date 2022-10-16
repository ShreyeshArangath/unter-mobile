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


import {Tripinfo, TopMenuBar, UserMap, TripButtons, Instructions} from './Shared';


export const Driver = (showDrvr) => {
    return (
        <NativeBaseProvider>
            <TopMenuBar color={"#230903"} amIStaying={showDrvr} />
            <UserMap />
            <Instructions currentUser={showDrvr.currentUser} />
            <Tripinfo currentUser={showDrvr.currentUser} />
            <TripButtons currentUser={showDrvr.currentUser} />
        </NativeBaseProvider>
        );
  }