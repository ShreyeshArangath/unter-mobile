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

export const Admin = (props) => {
    return (
        <NativeBaseProvider>
            <TopMenuBar color={"#729EA1"} keepingUser={props.showAdmn} />
        </NativeBaseProvider>
        );
  }