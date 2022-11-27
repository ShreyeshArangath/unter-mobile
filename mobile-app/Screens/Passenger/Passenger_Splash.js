import {
    NativeBaseProvider,
    Button,
    Container,
    Center,
    Text
} from 'native-base';
import { TripButton } from '../../Components/TripButton';
import { useState } from 'react';
import { SplashHeader } from '../../Components/SplashHeader';
import * as Api from '../../api/api_Calls'

export const Passenger_Splash = ({ navigation, route }) => {
    const [userID, setUserID] = useState("Wzy8ScBJgiVaQBImQvMi")//TODO: Get this from authentication
    const [user, setUser] = useState(        
        {
            "type":"driver",
            "username": "Tyler",
            "fName": "Tyler"
        }
    )

   const navigate_PickLocation = () => {
        navigation.push("Passenger_PickLocation")
   }   

       const navPastTrips = () => {
        Api.GetPassengerTripHistory(userID).then(resp => {
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

    return (
        <NativeBaseProvider>
        <Container h="100%" w="100%" maxWidth="100%" bg="#B53838" flex={1} justifyContent='center' alignItems='center'>
            <SplashHeader title="Unter" subtitle="Passenger" />
            <Center style={{margin: 30}}>
                <TripButton text="Start Your Journey" color={"white"} textColor={"black"} onPress={navigate_PickLocation} />

                <TripButton text="View Past Trips" color={"white"} textColor={"black"} onPress={navPastTrips} />
            </Center>
        </Container>
    </NativeBaseProvider>
    )
}
