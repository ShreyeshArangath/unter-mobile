import GoogleMap from '../../Components/google_map';
import {
    Box,
    NativeBaseProvider,
    ZStack, 
    Flex,
    HStack,
    useBreakpointValue,
} from 'native-base';
import {Image} from 'react-native'
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
import * as API from '../../api/api_Calls'
import { sendSMS } from '../../api/notifications';
import { Rating } from 'react-native-ratings';
import { UnterRatingModal } from '../../Components/Rating';

export const Passenger_Ride = ({route, navigation}) => {
    const [origin, setOrigin] = useState(route.params.origin)
    const [destination, setDestination] = useState(route.params.destination)
    const [duration, setDuration ] = useState(0)  //API returns duration in mins
    const [distance, setDistance] = useState(0)
    const [foundDriver, setFoundDriver] = useState(false)
    const [driverId, setDriverId] = useState(null)
    const [tripId, setTripId] = useState(route.params.tripId)
    const [driverLoc, setDriverLoc] = useState(null)
    const [driverInfo, setDriverInfo] = useState(null)
    const [rating, setRating] = useState(false)

   const completeTrip = () => {
    navigation.navigate("Passenger_Splash")
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(fireStore, "Trips", tripId), 
        (res) => {    
            const tripInfo = res.data()
            const tempDriverID = tripInfo["driverID"]
            if(tempDriverID != "NULL"){        
                setDriverId(tempDriverID)
                setFoundDriver(true) 
                API.GetUserByID(driverId).then(res => {
                    setDriverInfo(res[driverId])
                    // console.log("Driver info is", res)
                }).catch(() => {
                    console.log("Something went wrong when getting the driver details")
                })
            } else {
                setFoundDriver(false)
            }
            switch(tripInfo["status"]){
                case ("completed"):
                    setRating(true)
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

    const sendSMS = async(phoneNumber, text) => {
        const { result } = await SMS.sendSMSAsync(
                phoneNumber,
                text
        );
    }

    const findingARide = () => {
        return   (
            <Flex alignItems="center" direction="column" >
                <Instructions header={"Locating Rides"} 
                            body={`Finding the closest rides near you.`}/>
                <VehicleCard header={"Hold tight!"} extraInfo={"Finding a driver"} time={route.params.duration}/>
                <TripButton text={"Searching ..."} color={"grey"} onPress={() => {}}/>
            </Flex>   
        )
    }

    const rideFound = () => {
        return (
            <Flex alignItems="center" direction="column" >
                    <Instructions header={"Ride Found"} 
                                body={`Hang tight - we’ll be there shortly.`}/>
                    <VehicleCard header={"Driver Info"} found={true} extraInfo={`${driverInfo["fName"]}`} time={route.params.duration}/> 
                    <Flex direction="row">
                        <HStack width={"50%"}>
                            <TripButton text={"Change Location"} onPress={() => {}}/>
                        </HStack>
                        <HStack>
                            <TripIconButton type={TripIconButtonType.Message} onPress={() => sendSMS(driverInfo["phone"], "Where are you?") }/>
                            <TripIconButton type={TripIconButtonType.Emergency} onPress={() => {}}/>
                            {rating &&  <UnterRatingModal tripID={tripId} rater={'passenger'}  onFinishRating={completeTrip}/>}
                        </HStack>
                    </Flex>
            </Flex>   
        )
    }

    return (
        <NativeBaseProvider>
          <ZStack position={"relative"} width="100%" height="100%" >
                <GoogleMap 
                    directions={renderDirection(origin, destination, (res) => {
                        setDuration(res.duration)
                        setDistance(res.distance)
                    })}
                    originMarker={renderMarker(origin, PinImage, "origin")} 
                    destinationMarker={renderMarker(destination, PinImage, "destination")} 
                    driverMarker={(driverLoc) ? renderMarker(driverLoc, DriverImage, "driver") : <></>}
                />
                <Box width="100%" marginTop={20}>
                        {!(foundDriver && driverInfo)  && findingARide()}
                        {foundDriver && driverInfo && rideFound()}
                 </Box>
            </ZStack>
        </NativeBaseProvider>
    );
}
