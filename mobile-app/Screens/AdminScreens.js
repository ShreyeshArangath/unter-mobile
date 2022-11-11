import {
    Button,
    Box,
    NativeBaseProvider,
    VStack,
    Center,
    KeyboardAvoidingView,
    ZStack, 
    Flex,
    Text,
    Container,
    Heading,
    Spinner,
    Pressable,
    ScrollView,
    Content,
    Divider,
    Input,
    Select
} from 'native-base';
import {Alert, Image} from 'react-native'
import React, { useEffect, useState } from 'react';
import GoogleMap from '../Components/google_map';
import { Instructions } from '../Components/Instructions';
import { TripButton } from '../Components/TripButton';
import { renderMarker } from '../Components/map_marker';
import { Marker } from 'react-native-maps';
import { renderDirection } from '../Components/map_direction';
import { TEXT_INSTRUCTIONS } from '../Components/prompts_responses'
import DriverImage from '../assets/among_us_red.png';
import PinImage from '../assets/Pin.png';
import * as Api from '../api/api_Calls'
import { LocationProvider } from '../LocationProvider';
import { Header } from '@react-navigation/stack';
import { doc, onSnapshot } from "firebase/firestore";
import { fireStore, realTimeDatabase } from "../api/firebase";
import { off, onValue, ref } from 'firebase/database';

export const Admin_Splash = ({ navigation }) => {
    const [loading, changeloading] = useState(false)
    const [type, changeType] = useState("")

    function getTrips(){
        changeloading(true);
        changeType("trips")
        Api.GetAllTrips().then(resp => {
            let trips = []
            for(var x in resp)
            {
                trips.push({"id": x, "data": resp[x]})
            }
            changeloading(false)
            changeType("")
            navigation.push("Admin_View_Trips", {"trips":trips})
        }).catch(err =>{
            console.log(err)
        })
    }
    function getUsers(){
        changeloading(true);
        changeType("Users")
        Api.GetAllUsers().then(resp => {
            let trips = []
            for(var x in resp)
            {
                trips.push({"id": x, "data": resp[x]})
            }
            changeloading(false)
            changeType("")
            navigation.push("Admin_View_Users", {"trips":trips})
        }).catch(err =>{
            console.log(err)
        })
    }

    return (
        <NativeBaseProvider>
            <Container h="100%" w="100%" maxWidth="100%" bg="#5ccfe0" flex={1} justifyContent='center' alignItems='center'>
                <Center style={{margin: 30}}>
                    <Text fontSize="6xl" color="#FFFFFF">Unter</Text>
                    <Text fontSize="xl" color="#FFFFFF">Admin</Text>
                </Center>
                <Center style={{margin: 30}}>
                    {(loading)?<>
                        <Spinner  accessibilityLabel={"loading " + type}/>
                        <Text>{"Loading " + type}</Text>
                    </>:
                    (<>
                        <TripButton text="View Trips" color={"white"} textColor={"black"}  onPress={() => getTrips()} /> 
                        <TripButton text="View Users" color={"white"} textColor={"black"}  onPress={() => getUsers()} /> 
                    </>)
                    }
                </Center>
               
            </Container>
        </NativeBaseProvider>
    )
}

export const Admin_View_Trips = ({navigation, route}) => {
    const [loadingSelectedTrip, changeLoadingTrip] = useState(null);
    function showBriefTripInfo(tripInfo, tripIndex){
        return (<Box flex={1} width="100%" key={tripIndex} bg={"#4abdbf"}>
            {
            (tripInfo.id != loadingSelectedTrip)?
            <TripButton text={tripInfo.id} color={"white"} textColor={"black"} onPress={()=> nextScreen(tripInfo.id)} />:
            <Flex direction='row' bg="#ffffff">
                <Text>{"Loading Trip" + loadingSelectedTrip}</Text>
                <Spinner accessibilityLabel={"Loading Trip" + loadingSelectedTrip}></Spinner>
            </Flex>
            }
            <Flex direction='row'>
                <Text>{" Trip Passenger: " + tripInfo.data.passID}</Text>
                <Text marginLeft={"auto"}>{("date: " + new Date(tripInfo.data.startTime.seconds*1000)).substring(0, 31)}</Text>
            </Flex>
            <Flex direction='row'>
                <Text>{" Trip Driver: "  + tripInfo.data.driverID}</Text>
                <Text marginLeft={"auto"}>{"status: " + tripInfo.data.status + " "}</Text>
            </Flex>
        </Box>)
    }

    const nextScreen = (tripID) => {
        changeLoadingTrip(tripID);
        Api.GetTripByID(tripID).then(resp => {
            let SelectedTrip = []
            for(var x in resp)
            {
                SelectedTrip.push({"id": x, "data": resp[x]})
            }
            changeLoadingTrip(null);
            navigation.push("Admin_View_Trip_info", {"SelectedTrip":SelectedTrip[0]})
        }).catch(err =>{
            console.log(err)
        })
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <Container h="100%" w="100%" maxWidth="100%" bg="#5ccfe0" flex={1} justifyContent='center' alignItems='center'>
                    {route.params.trips.map((trip, i) => (showBriefTripInfo(trip, i)))}
                </Container>
            </ScrollView>
        </NativeBaseProvider>
    )
}

export const Admin_View_Trip_info = ({navigation, route}) =>{


    var selectedTrip = route.params.SelectedTrip;
    function startDate()
    {
        return new Date(selectedTrip.data.startTime.seconds*1000);
    }
    function endDate()
    {
        return new Date(selectedTrip.data.endTime.seconds*1000);
    }
    function diffTime()
    {
        var hr = 0, min = 0, sec = 0;
        hr = Math.floor((endDate()-startDate())/3600000)
        min = Math.floor(((endDate()-startDate())-(hr*3600000))/60000)
        sec = Math.floor(( (endDate()-startDate())-(hr*3600000)-(min*60000))/1000)
        return "" + hr+"hr:"+min+"min."+sec+"sec ";
    }

    const [passenger, changePassenger] = useState(selectedTrip.data.passID);
    const [driver, changeDriver] = useState(selectedTrip.data.driverID);
    
    const [origin, setOrigin] = useState(selectedTrip.data.startLoc)
    const [destination, setDestination] = useState(selectedTrip.data.endLoc)
    const [directions, setDirections] = useState(renderDirection(origin, 
        destination,
        (res) => {})
    )
    const [driverId, setDriverId] = useState(null)
    const [driverLoc, setDriverLoc] = useState(null)

    const mapsRegion = {
        latitude: selectedTrip.data.startLoc.latitude+((selectedTrip.data.endLoc.latitude-selectedTrip.data.startLoc.latitude)/2),
        longitude: selectedTrip.data.startLoc.longitude+((selectedTrip.data.endLoc.longitude-selectedTrip.data.startLoc.longitude)/2),
        latitudeDelta: Math.abs(selectedTrip.data.endLoc.latitude-selectedTrip.data.startLoc.latitude)*1.2,
        longitudeDelta: Math.abs(selectedTrip.data.endLoc.longitude-selectedTrip.data.startLoc.longitude)*1.2,
    }

    useEffect(() =>{
        const dbref = ref(realTimeDatabase, `users/${selectedTrip.data.driverID}`)
        const realtimeloc = onValue(dbref, (snapshot) => {
            const data = snapshot.val();
            if (data && data["lat"] && data["long"]){
                setDriverLoc({
                    latitude: data["lat"], 
                    longitude: data["long"]
                })
            }
        })

        return (() => off(dbref))
    }, [driverId, driverLoc])


    const renderDriverMarker = (loc, id) => {
        if(loc){
            return(
                <Marker identifier={id} coordinate={{latitude: loc.latitude, longitude: loc.longitude}}> 
                    <Image
                        source={require('../assets/among_us_red.png')}
                        style={{width: 25, height: 35}}
                        resizeMode="cover"
                    />
                </Marker>
            ) 
        }
    }

    const renderMarker = (loc, id) => {
        return <Marker identifier={id} coordinate={{latitude: loc.latitude, longitude: loc.longitude}}/>
    }

    return (
        <NativeBaseProvider>
            <Box bg={"#729EA1"} paddingLeft={"2.5%"} paddingRight={"2.5%"}>
                <Flex bg={'#618d90'} flexDirection="row" minHeight={"5%"}>
                    <Text>{"Showing Trip: " + selectedTrip.id}</Text>
                    {/*<Button marginLeft="auto" onPress={()=>submitChanges()}>Submit Changes</Button>*/}
                </Flex>
                <Flex direction='row'>
                    <Text>{"Passenger: " + passenger}</Text>
                    <Text marginLeft={"auto"}>{"Status: " + selectedTrip.data.status}</Text>
                </Flex>
                <Text>{"Driver: " + driver}</Text>
                <Flex flexDir={"row"}>
                    <Text>{("\nDate: " + startDate()).substring(0, 21)}</Text>
                    <Text marginLeft="auto">{("\nDuration : " + diffTime())}</Text>
                </Flex>
                <Flex flexDir="row">
                    <Text>{"\nstart Time: " + startDate().toLocaleTimeString()}</Text>
                    <Text marginLeft="auto">{"\nend Time: " + endDate().toLocaleTimeString()}</Text>
                </Flex>
                <Text>{"\nTrip Rating: " + ((selectedTrip.data.passRating != -1)?selectedTrip.data.passRating:"N/A")}</Text>
            </Box>
            <Container flex={2} minWidth="100%">
            <GoogleMap directions={directions}
                originMarker={renderMarker(selectedTrip.data.startLoc, "origin")}
                destinationMarker={renderMarker(selectedTrip.data.endLoc, "destination")}
                driverMarker={renderDriverMarker(((selectedTrip.data.status != "completed")?driverLoc:null), "driver")}
                startingRegion={mapsRegion} />
            </Container>
        </NativeBaseProvider>
    )
}

export const Admin_View_Users = ({navigation, route}) => {
    function showBriefUserInfo(tripInfo, tripIndex){
        return (<Box flex={1} width="100%" key={tripIndex} bg={(tripIndex%2 == 0)?"#4abdbf" : "#a4dbfb"}>
            {/*<TripButton text={tripInfo.id} color={"white"} textColor={"black"} />*/}
            <Center>
                <Text>{"UUID: " + tripInfo.id}</Text>
            </Center>
            <Flex direction='row'>
                <Text>{" First Name: " + tripInfo.data.fName}</Text>
                <Text marginLeft={"auto"}>{("Last Name: " + tripInfo.data.lName + " ")}</Text>
            </Flex>
            <Flex direction='row'>
                <Text>{"Type: " + tripInfo.data.type}</Text>
                <Text marginLeft={"auto"}>{"DOB: " + tripInfo.data.dob}</Text>
            </Flex>
            
        </Box>)
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <Container h="100%" w="100%" maxWidth="100%" bg="#5ccfe0" flex={1} justifyContent='center' alignItems='center'>
                    {route.params.trips.map((trip, i) => (showBriefUserInfo(trip, i)))}
                </Container>
            </ScrollView>
        </NativeBaseProvider>
    )
}

export const Admin_View_Users_info = ({navigation, route}) => {
    return (
        <NativeBaseProvider>
            <Text>viewing Users info</Text>
        </NativeBaseProvider>
    )
}
