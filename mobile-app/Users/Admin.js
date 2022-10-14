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

export const Admin = (showAdmn) => {
    return (
        <NativeBaseProvider>
            <Center flex={1} bg="amber.600">
                <Button onPress={() => showAdmn.set(false)}>admin Return</Button>
            </Center>
        </NativeBaseProvider>
        );
  }