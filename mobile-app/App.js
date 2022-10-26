import { HStack, NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { Passenger_Splash, Passenger_PickLocation, LogoTitle, Passenger_ConfirmLocation } from "./Screens/PassengerScreens";
import { TopMenuBar } from "./Components/TopMenuBar";
import {useState, useEffect} from 'react'
import * as Location from 'expo-location';
import * as LiveLocation from './api/live_location';
import { useFonts } from 'expo-font';


const PassengerStack = createNativeStackNavigator();


// TODO: Pass in user context in here 
const PassengerScreens = (props) => {
    return (
    <PassengerStack.Navigator  
        screenOptions={{
            headerBackTitleVisible: false
          }}>
            
            <PassengerStack.Screen 
                name="Splash"
                component={Passenger_Splash} 
                options={{title:"Welcome!"}} 
                initialParams={{"region": props.region}}/>

            <PassengerStack.Screen 
                name="Passenger_PickLocation"
                component={Passenger_PickLocation} 
                options = {({ route }) => ({
                    title: null,
                    headerLeft: null,
                    headerRight: () => <TopMenuBar color={route.params.color} user={route.params.user} /> ,
                    headerStyle: {
                      borderBottomWidth: 0,
                    },
                  })}
            />
        

        <PassengerStack.Screen 
                name="Passenger_ConfirmLocation"
                component={Passenger_ConfirmLocation} 
                options = {({ route }) => ({
                    title: null,
                    headerLeft: null,
                    headerRight: () => <TopMenuBar color={route.params.color} user={route.params.user} /> ,
                    headerStyle: {
                      borderBottomWidth: 0,
                    },
                  })}
            />
        </PassengerStack.Navigator>
    )
}


export const getUserLocation = async (setRegion) => {
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
      }).catch((err) => {
        console.log(err)
      })
}

    
export default function App() {
  const [region, setRegion] = useState({
      latitude: 37.78825, 
      longitude: -122.4324 
  })

  useEffect(() => { getUserLocation(setRegion)}, [])

    return (
        <NativeBaseProvider styles={{fontFamily:'Plus-Jakarta-Sans'}}>
             <NavigationContainer>
                <PassengerScreens region={region}/>
                
            </NavigationContainer>
        </NativeBaseProvider>
      
    )
}