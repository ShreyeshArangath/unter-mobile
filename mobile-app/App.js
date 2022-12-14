import { HStack, NativeBaseProvider, extendTheme, Button, KeyboardAvoidingView, Container, Box, Center } from "native-base";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { Passenger_Splash, Passenger_PickLocation, LogoTitle, Passenger_ConfirmLocation, Passenger_Ride } from "./Screens/PassengerScreens";
import { Driver_Splash, Driver_Finding_Trip, Driver_Mapping} from "./Screens/DriverScreens";
import { Admin_Splash, Admin_View_Trips, Admin_View_Trip_info, Admin_View_Users, Admin_View_Users_info} from "./Screens/AdminScreens"
import { TopMenuBar } from "./Components/TopMenuBar";
import {useState, useEffect} from 'react'
import * as Location from 'expo-location';
import {LogBox} from "react-native";
import {Unter} from './Screens/Unter'
import {Login_Splash} from './Screens/LoginScreen'
import {SignUp_Splash} from './Screens/SignUpScreen'

LogBox.ignoreLogs([
  "EventEmitter.removeListener('appStateDidChange', ...)"
])

const HomeStack = createStackNavigator();
const DriverStack = createStackNavigator();
const PassengerStack = createStackNavigator();
const AdminStack = createStackNavigator();

//TODO:API-Call to get the current user's userName 
const dummyPassenger = {
  "63MwWi3KaQxECaQbAoEn": {
      dob: "06-28-2000",
      fName: "Hans",
      lName: "Nee", 
      type: "passenger",
      username: "hansNee", 
  }
}

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
            name="Passenger_Splash"
            component={Passenger_Splash} 
            options = {{
              title: null, 
              headerTransparent: true, 
              headerBackVisible: true}}
          />
          
          <PassengerStack.Screen 
            name="Passenger_PickLocation"
            component={Passenger_PickLocation} 
            initialParams={{
              "region": route.params.region,
              "position": route.params.position, 
              "user": dummyPassenger["63MwWi3KaQxECaQbAoEn"],
              "userID":  "63MwWi3KaQxECaQbAoEn",
              "color": "#E5E5E5"
            }}
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

const AdminScreens = (navigation) => {
    return (
        <AdminStack.Navigator
        screenOptions={{
          headerBackTitleVisible: false
        }}>

            <AdminStack.Screen
                name="Admin_Splash"
                component={Admin_Splash}
                options={{title: null, headerTransparent: true}} 
            />

            <AdminStack.Screen 
                name="Admin_View_Trips"
                component={Admin_View_Trips}
                options={{title: "View Trips"}} 
            />

            <AdminStack.Screen
                name="Admin_View_Trip_info"
                component={Admin_View_Trip_info}
                options={{title: "Trip Details"}} 
            />

            <AdminStack.Screen 
                name="Admin_View_Users"
                component={Admin_View_Users}
                options={{title: "View Users"}} 
            />

            <AdminStack.Screen
                name="Admin_View_Users_info"
                component={Admin_View_Users_info}
                options={{title: "User Details"}} 
            />

        </AdminStack.Navigator>
    )
}
  


const HomeNavigation = (props) => {
  return (
    <HomeStack.Navigator screenOptions={{
      headerBackTitleVisible: false,
      headerShown: false
    }} >
      <HomeStack.Screen name="Login" component={Login_Splash} initialParams={{region: props.region}}/>
      <HomeStack.Screen name="SignUp" component={SignUp_Splash} initialParams={{region: props.region}} />
      <HomeStack.Screen  name="Unter" component={Unter} initialParams={{region: props.region}}/>
      <HomeStack.Screen name="Passenger" component={PassengerScreens} initialParams={{region: props.region, position: props.position}} />
      <HomeStack.Screen name="Driver" component={DriverScreens} initialParams={{region: props.region}} />
      <HomeStack.Screen name="Admin" component={AdminScreens} initialParams={{region: props.region, position: props.position}} />
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