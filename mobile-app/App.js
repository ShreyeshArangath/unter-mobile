import { HStack, NativeBaseProvider, extendTheme, Button, KeyboardAvoidingView, Container } from "native-base";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Passenger_Splash, Passenger_PickLocation, LogoTitle, Passenger_ConfirmLocation, Passenger_Ride } from "./Screens/PassengerScreens";
import { Driver_Splash, Driver_Finding_Trip, Driver_Mapping} from "./Screens/DriverScreens";
import { TopMenuBar } from "./Components/TopMenuBar";
import {useState, useEffect} from 'react'
import * as Location from 'expo-location';
import {LogBox} from "react-native";
import { realTimeDatabase } from "./api/firebase";
import {updateUserLiveLocationInfo, UnterLocation} from './api/live_location'
import {LocationProvider} from "./LocationProvider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


LogBox.ignoreLogs([
  "EventEmitter.removeListener('appStateDidChange', ...)"
])

const NavStack = createNativeStackNavigator();

const UnterHeaderOptions = ({ route }) => ({
  title: null,
  headerLeft: null,
  headerRight: () => <TopMenuBar color={route.params.color} user={route.params.user} /> ,
  headerStyle: {
    borderBottomWidth: 0,
  },
})

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
                initialParams={{"region": props.region, "position": props.position}}/>

            <NavStack.Screen 
                name="Passenger_PickLocation"
                component={Passenger_PickLocation} 
                options = {UnterHeaderOptions}
            />
        

        <NavStack.Screen 
                name="Passenger_ConfirmLocation"
                component={Passenger_ConfirmLocation} 
                options = {UnterHeaderOptions}
            />

          <NavStack.Screen 
          name="Passenger_Ride"
          component={Passenger_Ride}
          options = {UnterHeaderOptions}
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
                  name="Driver_Finding_Trip"
                  component={Driver_Finding_Trip} 
                  options={{
                    title: null, 
                    headerTransparent: true, 
                    headerBackVisible: true}} 
                  initialParams={{"region": props.region}}
                />

                <NavStack.Screen 
                  name="Driver_Mapping"
                  component={Driver_Mapping} 
                  options = {({ route }) => ({
                    title: null,
                    headerLeft: null,
                    headerRight: () => <TopMenuBar color={route.params.color} user={route.params.user} /> ,
                    headerStyle: {
                      borderBottomWidth: 0,
                    }
                    })}
                  initialParams={{"region": props.region}}
                />
              </NavStack.Navigator>
  
  )
}
    
export default function App() {
  // Define position state: {latitude: number, longitude: number}
  const [position, setPosition] = useState({
    latitude: 37.78825, 
    longitude: -122.4324 
})
  const [user, setUser] = useState('shreyesh_test')
  const [region, setRegion] = useState({
      latitude: 33.58447,
      longitude: -101.87469 
  })

   // Request permissions right after starting the app
  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync()
      if (foreground.granted) await Location.requestBackgroundPermissionsAsync()
    }
    requestPermissions()
  }, [])


  // useEffect(() => {
  //   updateUserLiveLocationInfo(realTimeDatabase, "shreyesh_test", UnterLocation(position.latitude, position.longitude) ) 
  // }, [position])
   
  // Start location tracking in foreground
  const startForegroundUpdate = async () => {
    // Check if foreground permission is granted
    const { granted } = await Location.getForegroundPermissionsAsync()
    if (!granted) {
      console.log("location tracking denied")
      return
    }

    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove()

    // Start watching position in real-time
    foregroundSubscription = await Location.watchPositionAsync(
      {
        distanceInterval: 2000,
        timeInterval: 10000,
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.Balanced,
      },
      location => {
        setPosition(location.coords)
      }
    )
  }

    // Stop location tracking in foreground
    const stopForegroundUpdate = () => {
      foregroundSubscription?.remove()
      setPosition(null)
    }

    return (
      
        <NativeBaseProvider styles={{fontFamily:'Plus-Jakarta-Sans' }}>
          <LocationProvider name={"shreyesh_test"}>
            <NavigationContainer>
              <PassengerScreens region={region}/>
            </NavigationContainer>
          </LocationProvider>
        </NativeBaseProvider>   
         
    )
}