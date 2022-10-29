import { HStack, NativeBaseProvider, extendTheme, Button, KeyboardAvoidingView, Container, Box, Center } from "native-base";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { Passenger_Splash, Passenger_PickLocation, LogoTitle, Passenger_ConfirmLocation, Passenger_Ride } from "./Screens/PassengerScreens";
import { Driver_Splash, Driver_Finding_Trip, Driver_Mapping} from "./Screens/DriverScreens";
import { TopMenuBar } from "./Components/TopMenuBar";
import {useState, useEffect} from 'react'
import * as Location from 'expo-location';
import {LogBox} from "react-native";
import { realTimeDatabase } from "./api/firebase";
import {updateUserLiveLocationInfo, UnterLocation} from './api/live_location'
import {LocationProvider} from "./LocationProvider";


LogBox.ignoreLogs([
  "EventEmitter.removeListener('appStateDidChange', ...)"
])

const HomeStack = createStackNavigator();
const DriverStack = createStackNavigator();
const PassengerStack = createStackNavigator();

const UnterHeaderOptions = ({ route }) => ({
  title: null,
  headerRight: () => <TopMenuBar color={route.params.color} user={route.params.user} /> ,
  headerStyle: {
    borderBottomWidth: 0,
  },
})

// TODO: Pass in user context in here 
const PassengerScreens = ({route, navigation}) => {
    return (
    <PassengerStack.Navigator  
        screenOptions={{
            headerBackTitleVisible: false,
            headerMode: 'float'
          }}>
            
            <PassengerStack.Screen 
                name="Splash"
                component={Passenger_Splash} 
                options={{title:"Welcome!"}} 
                initialParams={{"region": route.params.region, "position": route.params.position}}/>

            <PassengerStack.Screen 
                name="Passenger_PickLocation"
                component={Passenger_PickLocation} 
                options = {UnterHeaderOptions}
            />
        

        <PassengerStack.Screen 
                name="Passenger_ConfirmLocation"
                component={Passenger_ConfirmLocation} 
                options = {UnterHeaderOptions}
            />

        <PassengerStack.Screen 
                  name="Passenger_Ride"
                  component={Passenger_Ride}
                  options = {UnterHeaderOptions}
          />
        </PassengerStack.Navigator>
    )
}

// TODO: Pass in trip & user context in here 
const DriverScreens = ({route, navigation}) => {
  return (
        <DriverStack.Navigator 
              screenOptions={{
                  headerBackTitleVisible: false
                }}>

                <DriverStack.Screen 
                  name="Driver_Splash"
                  component={Driver_Splash} 
                  options={{title: null, headerTransparent: true}} 
                  initialParams={{"region": route.params.region}}
                />

                <DriverStack.Screen 
                  name="Driver_Finding_Trip"
                  component={Driver_Finding_Trip} 
                  options={{
                    title: null, 
                    headerTransparent: true, 
                    headerBackVisible: true}} 
                  initialParams={{"region": route.params.region}}
                />

                <DriverStack.Screen 
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
                  initialParams={{"region": route.params.region}}
                />
              </DriverStack.Navigator>
  )
}
  
const Unter = ({route, navigation}) => {
  const handleOnPress = (type) => {
    navigation.navigate(type, {
      "region": route.params.region
    })  
  }

  return (
    <NativeBaseProvider>
      <Center marginTop={"50%"}>
        <Box>
          <Button onPress={() => handleOnPress("Passenger")}>Passenger</Button>
          <Button onPress={() => handleOnPress("Driver")}>Driver</Button>
          <Button>Admin</Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}

const HomeNavigation = (props) => {
  return (
    <HomeStack.Navigator screenOptions={{
      headerBackTitleVisible: false,
      headerShown: false
    }} >
      <HomeStack.Screen  name="Unter" component={Unter} initialParams={{region: props.region}}/>
      <HomeStack.Screen name="Passenger" component={PassengerScreens} initialParams={{region: props.region, position: props.position}} />
      <HomeStack.Screen name="Driver" component={DriverScreens} initialParams={{region: props.region}} />
    </HomeStack.Navigator>
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

    return (
        <NativeBaseProvider styles={{fontFamily:'Plus-Jakarta-Sans' }}>
            <NavigationContainer>
              <HomeNavigation region={region} position={position}/>
            </NavigationContainer>
        </NativeBaseProvider>   
         
    )
}