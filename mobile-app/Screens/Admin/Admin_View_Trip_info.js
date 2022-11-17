import {
    Box,
    NativeBaseProvider,
    Flex,
    Text,
    Container
} from 'native-base';
import {Alert, Image} from 'react-native'
import React, { useEffect, useState } from 'react';
import GoogleMap from '../../Components/google_map';
import { Marker } from 'react-native-maps';
import { renderDirection } from '../../Components/map_direction';
import { fireStore, realTimeDatabase } from "../../api/firebase";
import DriverImage from '../../assets/among_us_red.png';
import { off, onValue, ref } from 'firebase/database';



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
                        source={DriverImage}
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