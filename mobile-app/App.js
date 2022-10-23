import { HStack, NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Passenger_Splash, Passenger_PickLocation, LogoTitle, Passenger_ConfirmLocation } from "./Screens/PassengerScreens";
import { Driver_Splash, Driver_Find_Trip, Driver_ToPassenger} from "./Screens/DriverScreens";
import { TopMenuBar } from "./Components/TopMenuBar";
import {useState, useEffect} from 'react'
import * as Location from 'expo-location';
import * as LiveLocation from './api/live_location';
import { useFonts } from 'expo-font';

const NavStack = createNativeStackNavigator();


// TODO: Pass in user context in here 
const PassengerScreens = (props) => {
    return (
    <NavStack.Navigator  
        screenOptions={{
            headerBackTitleVisible: false
          }}>
            
            <NavStack.Screen 
                name="Splash"
                component={Passenger_Splash} 
                options={{title:"Welcome!"}} 
                initialParams={{"region": props.region}}/>

            <NavStack.Screen 
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
        

        <NavStack.Screen 
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
        </NavStack.Navigator>
    )
}

// TODO: Pass in trip & user context in here 
const DriverScreens = (props) => {
  return (
  <NavStack.Navigator  
      screenOptions={{
          headerBackTitleVisible: false
        }}>

        <NavStack.Screen 
          name="Driver_Splash"
          component={Driver_Splash} 
          options={{title: null, headerTransparent: true}} 
          initialParams={{"region": props.region}}
        />

        <NavStack.Screen 
          name="Driver_Find_Trip"
          component={Driver_Find_Trip} 
          options={{
            title: null, 
            headerTransparent: true, 
            headerBackVisible: true}} 
          initialParams={{"region": props.region}}
        />

        <NavStack.Screen 
          name="Driver_ToPassenger"
          component={Driver_ToPassenger} 
          options = {({ route }) => ({
            title: null,
            headerLeft: null,
            headerRight: () => <TopMenuBar color={route.params.color} user={route.params.user} /> ,
            headerStyle: {
              borderBottomWidth: 0,
            },
          })}
        />
      
      </NavStack.Navigator>
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
              <DriverScreens region={region}/>
                
            </NavigationContainer>
        </NativeBaseProvider>
      
    )
}