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

//importing the code foe the Other UI's
import { Passenger } from './Users/Passenger';
import { Admin } from './Users/Admin';
import { Driver } from './Users/Driver';
import { UIUser } from './Users/Shared';

/*export const Example = () => {
    return (
        <> 
        <Button onPress={() => setShowModal(true)}>Show Modal Button</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>Contact Us</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input />
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>Email</FormControl.Label>
                  <Input />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowModal(false);
                    }}>
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      setShowModal(false);
                    }}>
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
        </Modal>
        </>
    );
};*/

//the main function of the program, like main() in C.
export default () => {

    //allow us to have a boolean value for what views we are looking at
    const [showPassenger, setPassenger] = useState(false);
    const [showAdmin, setAdmin] = useState(false);
    const [showDriver, setDriver] = useState(false);

    //stores these in an object so we can pass them by reference 
    //to the other UI functions
    let uiPassenger = new UIUser(showPassenger, setPassenger);
    let uiAdmin = new UIUser(showAdmin, setAdmin);
    let uiDriver = new UIUser(showDriver, setDriver);

    //used to store the HTML Element object that stores our UI code
    let activeCode;//the code we are returning to run 


    //do these functions if the boolean saying to do them is enabled
    if (showPassenger)
        activeCode = Passenger(uiPassenger, uiDriver);
    else if (showAdmin)
        activeCode = Admin(uiAdmin);
    else if (showDriver)
        activeCode = Driver(uiDriver);
    //if none are specified, do this default code that lets 
    //you choose the mode to enter in
    else {
        activeCode = (
            <NativeBaseProvider>
                <Center flex={1} bg="blue.600">
                    <Button onPress={() => { setPassenger(true) }}>Show Passenger View</Button>
                    <Button onPress={() => { setAdmin(true) }}>Select Admin View</Button>
                    <Button onPress={() => { setDriver(true) }}>Select Driver View</Button>
                </Center>
            </NativeBaseProvider>
        )
    }

    //return whatever active code we decided we are using this frame
    return (activeCode);
}