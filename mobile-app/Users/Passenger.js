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


import {UIUser} from './Shared';


export const Passenger = (showPass, switchToDriver) => {

    return (
        <NativeBaseProvider>
            <Center flex={1} bg="danger.500">
                <Button onPress={() =>{showPass.set(false),
                switchToDriver.set(true)}}>Switch to Driver</Button>
                <Button onPress={() => showPass.set(false)}>Passenger Return</Button>
            </Center>
        </NativeBaseProvider>
        );
  }