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


import {UIUser} from './Shared';


export const Driver = (showDrvr) => {
    return (
        <NativeBaseProvider>
            <Center flex={1} bg="black">
                <Button onPress={() => showDrvr.set(false)}>Driver Return</Button>
            </Center>
        </NativeBaseProvider>
        );
  }