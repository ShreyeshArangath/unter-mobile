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
  useSafeArea,
} from 'native-base';
import { Dimensions } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {GOOGLE_MAPS_API_KEY} from '@env';
import axios from 'axios';
const baseUrl = 'http://10.172.85.36:9001/api/trips/id/Trip'


//importing the code for the Other UI's
import { Passenger } from './Users/Passenger';
import { Admin } from './Users/Admin';
import { Driver } from './Users/Driver';
import { UsersClass } from './Users/Shared';
import { UIUser } from './Components/UIUser';
import { UIUser } from './Users/Shared';
import GoogleMap from './components/google_map';
import GoogleMapSearch from './components/google_map_search';
import { SafeAreaView } from 'react-native';
import * as Location from 'expo-location';


export default function App() {
  const [location, setLocation] = useState(null);
  const [locationErrMsg, setLocationErrMsg] = useState(null);
  //allow us to have a boolean value for what views we are looking at
  const [showPassenger, setPassenger] = useState(false);
  const [showAdmin, setAdmin] = useState(false);
  const [showDriver, setDriver] = useState(false);

  const [region, setRegion] = useState({
      latitude: 37.78825, 
      longitude: -122.4324 
  })

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocationErrMsg('Permission to access location was denied');
      return;
    }
  
    await Location.getCurrentPositionAsync({}).then((location) => {
      setRegion({
        latitude: location.coords.latitude, 
        longitude: location.coords.longitude
      });
      console.log(region)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => { getUserLocation()}, [])
    //stores these in an object so we can pass them by reference 
    //to the other UI functions
    let uiPassenger = new UIUser(showPassenger, setPassenger, new UsersClass("Passenger"));
    let uiAdmin = new UIUser(showAdmin, setAdmin, new UsersClass("Admin"));
    let uiDriver = new UIUser(showDriver, setDriver, new UsersClass("Driver"));

    //used to store the HTML Element object that stores our UI code
    let activeCode;//the code we are returning to run 

  

    //do these functions if the boolean saying to do them is enabled
    if (showPassenger)
        activeCode = <Passenger showPass={uiPassenger} />
    else if (showAdmin)
        activeCode = <Admin showAdmn={uiAdmin}/>;
    else if (showDriver)
        activeCode = <Driver showDrvr={uiDriver} />;
    //if none are specified, do this default code that lets 
    //you choose the mode to enter in
    else {
        activeCode = (
            <NativeBaseProvider safeArea>
                <Center flex={1} bg={"#123456"}>
                    <Button style={{marginTop: "1%"}} 
                        onPress={() => { selectPassenger() }}>Show Passenger View</Button>
                    <Button style={{marginTop: "4%"}} 
                        onPress={() => { selectAdmin() }}>Select Admin View</Button>
                    <Button style={{marginTop: "4%"}} 
                        onPress={() => { selectDriver() }}>Select Driver View</Button>
                </Center>
            </NativeBaseProvider>
        )
    }

    function selectPassenger()
    {
        uiPassenger.currentUser.UIModeModifyer("Pick Location");
        setPassenger(true); 
    }
    function selectAdmin()
    {
        setAdmin(true); 
    }
    function selectDriver()
    {
        uiDriver.currentUser.UIModeModifyer("Confirm Trip");//todo: remove once we added the rest of the up screens for driver
        setDriver(true);
    }

    //return whatever active code we decided we are using this frame
    return (activeCode);
}
