import GoogleMap from '../../Components/google_map';
import {
    Box,
    NativeBaseProvider,
    ZStack, 
    Flex,
    HStack,
    useBreakpointValue,
} from 'native-base';
import { Instructions } from '../../Components/Instructions';
import { TripButton } from '../../Components/TripButton';
import { useEffect, useState } from 'react';
import { VehicleCard } from '../../Components/VehicleCard';
import { TripIconButton, TripIconButtonType } from '../../Components/TripIconButton';
import { doc, onSnapshot } from "firebase/firestore";
import { fireStore, realTimeDatabase } from "../../api/firebase";
import { off, onValue, ref } from 'firebase/database';
import {LocationProvider} from '../../LocationProvider';
import { renderMarker } from '../../Components/map_marker';
import { renderDirection } from '../../Components/map_direction';
import DriverImage from '../../assets/among_us_red.png';
import PinImage from '../../assets/Pin.png';
import * as SMS from 'expo-sms';

export const Passenger_Ride = ({route, navigation}) => {
    const [origin, setOrigin] = useState(route.params.origin)
    const [destination, setDestination] = useState(route.params.destination)
    const [duration, setDuration ] = useState(0)  //API returns duration in mins
    const [distance, setDistance] = useState(0)
    const [foundDriver, setFoundDriver] = useState(false)
    const [driverId, setDriverId] = useState(null)
    const [tripId, setTripId] = useState(route.params.tripId)
    const [driverLoc, setDriverLoc] = useState(null)
    const [directions, setDirections] = useState(
        renderDirection(
            origin, 
            destination,
            (res) => {
                setDuration(res.duration)
                setDistance(res.distance) })
    )

    const navigate_splash = () => {
        navigation.navigate("Passenger_Splash")
   }   

    // Check firestore to see if we have a trip alter
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(fireStore, "Trips", tripId), 
        (res) => {    
            const tripInfo = res.data()
            if(tripInfo["driverID"] != "NULL"){
                setDriverId(tripInfo["driverID"])
                //TODO:API-CALL Add API calls to get the driver name from the driver id
                setFoundDriver(true)
            } else {
                setFoundDriver(false)
            } 
            switch(tripInfo["status"]){
                case ("completed"):
                    //TODO: add trip raiting page
                    navigate_splash()
                    break;
                default:
                    break;
                }

            
        }, (err) => {
            console.log(err)
        });
        return ( () => unsubscribe())
    }, [foundDriver])


    useEffect(() =>{
        const dbref = ref(realTimeDatabase, `users/${driverId}`)
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

    const findingARide = () => {
        return   (
            <Flex alignItems="center" direction="column" >
                <Instructions header={"Locating Rides"} 
                            body={`Finding the closest rides near you.`}/>
                <VehicleCard header={"Unter Van"} extraInfo={"Average Wait Time"}/>
                <TripButton text={"Finding a Ride ..."} color={"grey"} onPress={() => {}}/>
            </Flex>   
        )
    }

    const rideFound = () => {
        return (
            <Flex alignItems="center" direction="column" >
                    <Instructions header={"Ride Found"} 
                                body={`Hang tight - we’ll be there shortly.`}/>
                    <VehicleCard header={"Unter Van"} found={true} extraInfo={`${driverId} coming to pick you up`}/> 
                    <Flex direction="row">
                        <HStack width={"50%"}>
                            <TripButton text={"Change Location"} onPress={() => {}}/>
                        </HStack>
                        <HStack>
                            <TripIconButton type={TripIconButtonType.Call} onPress={ async () => {
                                const { result } = await SMS.sendSMSAsync(
                                    '806224',
                                    'I have arrived.'
                                );
                            }}/>
                            <TripIconButton type={TripIconButtonType.Emergency} onPress={() => {}}/>
            
                        </HStack>
                    </Flex>
            </Flex>   
        )
    }

    return (
        <NativeBaseProvider>
          <ZStack position={"relative"} width="100%" height="100%" >
                <GoogleMap 
                    directions={renderDirection()}
                    originMarker={renderMarker(origin, PinImage, "origin")} 
                    destinationMarker={renderMarker(destination, PinImage, "destination")} 
                    driverMarker={(driverLoc) ? renderMarker(driverLoc, DriverImage, "driver") : <></>}
                />
                <Box width="100%" marginTop={20}>
                        {!foundDriver && findingARide()}
                        {foundDriver && rideFound()}
                 </Box>
            </ZStack>
        </NativeBaseProvider>
    );
}
