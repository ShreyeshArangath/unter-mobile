import {
    NativeBaseProvider,
    Button,
    Container,
    Center,
    Text
} from 'native-base';
import { TripButton } from '../../Components/TripButton';
import { useEffect } from 'react';
import { SplashHeader } from '../../Components/SplashHeader';




export const Passenger_Splash = ({ navigation, route }) => {
   const navigate_PickLocation = () => {
        navigation.push("Passenger_PickLocation")
   }   
   const navigate_PastTrips = () => {
        navigation.push("TODO_ADD_GET_ALL_TRIPS_PAGE", {
            "region": route.params.region
        })
    }

    return (
        <NativeBaseProvider>
        <Container h="100%" w="100%" maxWidth="100%" bg="#B53838" flex={1} justifyContent='center' alignItems='center'>
            <SplashHeader title="Unter" subtitle="Passenger" />
            <Center style={{margin: 30}}>
                <TripButton text="Start Your Journey" color={"white"} textColor={"black"} onPress={navigate_PickLocation} />

                <TripButton text="View Past Trips" color={"white"} textColor={"black"} onPress={navigate_PastTrips} />
            </Center>
        </Container>
    </NativeBaseProvider>
    )
}
