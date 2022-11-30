import {
    NativeBaseProvider,
    Center,
    Text,
    Container,
} from 'native-base';
import React, {useState} from 'react';
import { TripButton } from '../../Components/TripButton';
import * as Api from '../../api/api_Calls'

export const Driver_Splash = ({ navigation, route }) => {
    const [userID, setUserID] = useState("Wzy8ScBJgiVaQBImQvMi")//TODO: Get this from authentication
    const [user, setUser] = useState(
        {
            "type":"driver",
            "username": "Tyler",
            "fName": "Tyler"
        })

    const navPastTrips = () => {
        Api.GetDriverTripHistory(userID).then(resp => {
            navigation.navigate( "Admin",
                {
                    screen: "Admin_View_Trips", 
                    params: {"trips":resp}
                }
                )
        }).catch(err =>{
            console.log(err)
        })
    }

    const navStartTrip = () => {
        navigation.push("Driver_Finding_Trip", {
            "user": user,
            "color": "#E5E5E5",
            "region": route.params.region
        })
    }

    return (
        <NativeBaseProvider>
            <Container h="100%" w="100%" maxWidth="100%" bg="#230903" flex={1} justifyContent='center' alignItems='center'>
                <Center style={{margin: 30}}>
                    <Text fontSize="6xl" color="#FFFFFF">Unter</Text>
                    <Text fontSize="xl" color="#FFFFFF">Driver</Text>
                </Center>
                <Center style={{margin: 30}}>
                    <TripButton text="Start Finding Trips" color={"white"} textColor={"black"} onPress={navStartTrip}/>
                    <TripButton text="View Past Trips" color={"white"} textColor={"black"} onPress={navPastTrips}/>
                </Center>
               
            </Container>
        </NativeBaseProvider>
    )
}