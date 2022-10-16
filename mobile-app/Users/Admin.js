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


import {TempClass, TopMenuBar, UserMap, TripButtons, Instructions} from './Shared';

export const Admin = (showAdmn) => {
    return (
        <NativeBaseProvider>
            <TopMenuBar color={"#729EA1"} amIStaying={showAdmn} />
        </NativeBaseProvider>
        );
  }