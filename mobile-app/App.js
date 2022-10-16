import {
  Button,
  Text,
  Modal,
  Center,
  FormControl,
  Input,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
} from 'native-base';
import { useState } from 'react';
import { Dimensions } from 'react-native';

//importing the code foe the Other UI's
import { Passenger } from './Users/Passenger';
import { Admin } from './Users/Admin';
import { Driver } from './Users/Driver';
import { TempClass, UIUser } from './Users/Shared';

//the main function of the program, like main() in C.
export default () => {

    //allow us to have a boolean value for what views we are looking at
    const [showPassenger, setPassenger] = useState(false);
    const [showAdmin, setAdmin] = useState(false);
    const [showDriver, setDriver] = useState(false);

    //stores these in an object so we can pass them by reference 
    //to the other UI functions
    let uiPassenger = new UIUser(showPassenger, setPassenger, new TempClass("Passenger"));
    let uiAdmin = new UIUser(showAdmin, setAdmin, new TempClass("Admin"));
    let uiDriver = new UIUser(showDriver, setDriver, new TempClass("Driver"));

    //used to store the HTML Element object that stores our UI code
    let activeCode;//the code we are returning to run 


    //do these functions if the boolean saying to do them is enabled
    if (showPassenger)
        activeCode = Passenger(uiPassenger);
    else if (showAdmin)
        activeCode = Admin(uiAdmin);
    else if (showDriver)
        activeCode = Driver(uiDriver);
    //if none are specified, do this default code that lets 
    //you choose the mode to enter in
    else {
        activeCode = (
            <NativeBaseProvider>
                <Center flex={1} bg={"#123456"}>
                    <Button style={{marginTop: "1%"}} 
                        onPress={() => { setPassenger(true) }}>Show Passenger View</Button>
                    <Button style={{marginTop: "4%"}} 
                        onPress={() => { setAdmin(true) }}>Select Admin View</Button>
                    <Button style={{marginTop: "4%"}} 
                        onPress={() => { setDriver(true) }}>Select Driver View</Button>
                </Center>
            </NativeBaseProvider>
        )
    }

    //return whatever active code we decided we are using this frame
    return (activeCode);
}