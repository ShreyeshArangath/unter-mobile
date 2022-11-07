import GoogleMap from '../../Components/google_map';
import {
    Box,
    NativeBaseProvider,
    ZStack, 
    Flex,
    HStack,
} from 'native-base';
import { Instructions } from '../../Components/Instructions';
import { TripButton } from '../../Components/TripButton';
import { renderMarker } from '../Components/map_marker';
import { renderDirection } from '../Components/map_direction';
import { useState } from 'react';
import { VehicleCard } from '../../Components/VehicleCard';
import { TripIconButton, TripIconButtonType } from '../../Components/TripIconButton';
import DriverImage from '../assets/among_us_red.png';
import PinImage from '../assets/Pin.png';

export const Passenger_Ride = ({route, navigation}) => {
    const [origin, setOrigin] = useState(route.params.origin)
    const [destination, setDestination] = useState(route.params.destination)
    const [duration, setDuration ] = useState(0)  //API returns duration in mins
    const [distance, setDistance] = useState(0)
    const [foundDriver, setFoundDriver] = useState(false)

    const [directions, setDirections] = useState(
        renderDirection(
            origin, 
            destination,
            (res) => {
                setDuration(res.duration)
                setDistance(res.distance) })
    )

    const findingARide = () => {
        return   (
            <Flex alignItems="center" direction="column" >
                <Instructions header={"Locating Rides"} 
                            body={`Finding the closest rides near you.`}/>
                <VehicleCard header={"Unter Van"} extraInfo={"Average Wait Time"}/>
                <TripButton text={"Finding a Ride ..."} disabled={true} onPress={() => {}}/>
            </Flex>   
    )
    }

    const rideFound = () => {
        return (
            <Flex alignItems="center" direction="column" >
                <Instructions header={"Ride Found"} 
                            body={`Hang tight - we’ll be there shortly.`}/>
                <VehicleCard header={"Unter Van"} found={true} extraInfo={"Dara's coming to pick you up"}/>
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
                <GoogleMap directions={directions} 
                    originMarker={renderMarker(origin, DriverImage, "origin")} 
                    destinationMarker={renderMarker(destination, PinImage, "destination")} />
                <Box width="100%" marginTop={20}>
                        {!foundDriver && findingARide()}
                        {foundDriver && rideFound()}
                 </Box>
            </ZStack>
        </NativeBaseProvider>
    );
}
