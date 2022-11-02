import GoogleMap from '../../Components/google_map';
import {
    Box,
    NativeBaseProvider,
    ZStack, 
    Flex,
    HStack,
} from 'native-base';
import {Image} from 'react-native'
import { Instructions } from '../../Components/Instructions';
import {GOOGLE_MAPS_API_KEY} from '@env';
import { TripButton } from '../../Components/TripButton';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { VehicleCard } from '../../Components/VehicleCard';
import { TripIconButton, TripIconButtonType } from '../../Components/TripIconButton';
import { doc, onSnapshot } from "firebase/firestore";
import { fireStore, realTimeDatabase } from "../../api/firebase";
import { off, onValue, ref } from 'firebase/database';
import {LocationProvider} from '../../LocationProvider';


export const Passenger_Ride = ({route, navigation}) => {
    const [origin, setOrigin] = useState(route.params.origin)
    const [destination, setDestination] = useState(route.params.destination)
    const [duration, setDuration ] = useState(0)  //API returns duration in mins
    const [foundDriver, setFoundDriver] = useState(false)
    const [driverId, setDriverId] = useState('shreyesh_test')
    const [tripId, setTripId] = useState(route.params.tripId)
    const [driverLoc, setDriverLoc] = useState(null)

    // Check firestore to see if we have a driver for the given trip
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
    //TODO: resize on zoom
    const renderDriverMarker = (loc, id) => {
        if(loc){
            return(
                <Marker identifier={id} coordinate={{latitude: loc.latitude, longitude: loc.longitude}}> 
                    <Image
                        source={require('../../assets/among_us_red.png')}
                        style={{width: 25, height: 35}}
                        resizeMode="resize"
                    />
                </Marker>
            ) 
        }
    }

    const renderMarker = (loc, id) => {
        return <Marker identifier={id} coordinate={{latitude: loc.latitude, longitude: loc.longitude}}/>
    }

    const renderDirection = () => {
        return <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_API_KEY}
        strokeWidth={5}
        strokeColor="blue"
        onReady={(res) => {
              setDuration(res.duration)
        }}
      />
    }

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
                            <TripIconButton type={TripIconButtonType.Call} onPress={() => {}}/>
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
                originMarker={renderMarker(origin, "origin")} 
                destinationMarker={renderMarker(destination, "destination")} 
                driverMarker={renderDriverMarker(driverLoc, "driver")}
                />
                <Box width="100%" marginTop={20}>
                        {!foundDriver && findingARide()}
                        {foundDriver && rideFound()}
                 </Box>
            </ZStack>
        </NativeBaseProvider>
    );
}
