import {useSafeArea, NativeBaseProvider, Center, Button} from 'native-base';
import { useEffect, useState } from 'react';
import {GOOGLE_MAPS_API_KEY} from '@env';


//importing the code foe the Other UI's
import { Passenger } from './Users/Passenger';
import { Admin } from './Users/Admin';
import { Driver } from './Users/Driver';
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
    return (
    activeCode
  );

}
  
  