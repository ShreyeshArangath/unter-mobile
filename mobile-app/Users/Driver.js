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

import { Tripinfo } from '../Components/TripInfo';
import { TopMenuBar } from '../Components/TopMenuBar';
import { UserMap } from '../Components/UserMap';
import { TripButtons } from '../Components/TripButtons';
import { Instructions } from '../Components/Instructions';


export const Driver = (props) => {
    return (
        <NativeBaseProvider safeArea>
            <UserMap />
            <TopMenuBar color={"#230903"} keepingUser={props.showDrvr} />
            <Instructions currentUser={props.showDrvr.currentUser} />
            <Tripinfo currentUser={props.showDrvr.currentUser} />
            <TripButtons currentUser={props.showDrvr.currentUser} />
        </NativeBaseProvider>
        );
  }