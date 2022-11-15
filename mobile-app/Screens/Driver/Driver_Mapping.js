import {
    Box,
    NativeBaseProvider,
    ZStack, 
    Flex,
    HStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import GoogleMap from '../../Components/google_map';
import { Instructions } from '../../Components/Instructions';
import { TripButton } from '../../Components/TripButton';
import { renderMarker } from '../../Components/map_marker';
import { renderDirection } from '../../Components/map_direction';
import { TEXT_INSTRUCTIONS } from '../../Components/prompts_responses'
import PinImage from '../../assets/Pin.png';
import * as Api from '../../api/api_Calls'
import { LocationProvider } from '../../LocationProvider';
import { UnterRatingModal } from '../../Components/Rating';
import { PassengerCard } from '../../Components/PassengerCard';
import { TripIconButton, TripIconButtonType} from '../../Components/TripIconButton';
import { sendSMS } from '../../api/notifications';

export const Driver_Mapping = ({navigation, route}) => {
    const [origin, setOrigin] = useState(route.params.region) // TODO: set with users current location
    const [destination, setDestination] = useState(route.params.destination)
    const [duration, setDuration] = useState(0) //API returns duration in mins
    const [distance, setDistance] = useState(0)
    const [rating, setRating] = useState(false)

    var trip = route.params.tripInfo

    const [directions, setDirections] = useState(renderDirection(origin, 
        destination,
        (res) => {
            setDuration(res.duration)
            setDistance(res.distance) })
    )

    const completeTrip = () => {
        Api.CompleteTrip(route.params.tripID)
        navigation.navigate('Driver_Finding_Trip')
    }

    const progress_next_step = () => {
        switch (trip.status ) {
            case "on_delivery":
                setRating(true)
                break;
            case "to_pass":
                Api.UpdateTripStatus(route.params.tripID, "on_delivery")
                trip.status = "on_delivery"
                navigation.push('Driver_Mapping', {
                    "user":  route.params.user,
                    "region": route.params.region, 
                    "origin": {"longitude": route.params.tripInfo.startLoc.longitude, "latitude": route.params.tripInfo.startLoc.latitude},
                    "destination": {"longitude": route.params.tripInfo.endLoc.longitude, "latitude": route.params.tripInfo.endLoc.latitude},
                    "tripID" : route.params.tripID,
                    "tripInfo" : trip,
                    "passID": route.params.passID, 
                    "phone": route.params.phone, 
                    "passengerName": route.params.passengerName,
                    "userID": route.params.userID
                })
                break;
            default:
                break;
        }
    }

    return (
        <NativeBaseProvider>
            <LocationProvider name={route.params.userID}>
            <ZStack position={"relative"} width="100%" height="100%" >
                <GoogleMap directions={directions}
                    originMarker={renderMarker(origin, PinImage, "origin")}
                    destinationMarker={renderMarker(destination,PinImage, "destination")} />
                <Box width="100%" marginTop={10}>
                <Flex alignItems="center" direction="column" >
                    <Instructions header={TEXT_INSTRUCTIONS[trip.status].header_instruction} />
                    <PassengerCard header={"Passenger Info"} extraInfo={route.params.passengerName} time={duration.toFixed(0)}/>
                    <Flex direction="row" >    
                        <HStack width={"50%"}>
                            <TripButton text={TEXT_INSTRUCTIONS[trip.status].button_instruction} onPress={progress_next_step}/>
                        </HStack>
                        <HStack>
                            <TripIconButton type={TripIconButtonType.Message} onPress={ () => sendSMS(route.params.phone, "I'm here.")}/>
                            <TripIconButton type={TripIconButtonType.Emergency} onPress={() => {}}/>
                        </HStack>       
                    </Flex>
                </Flex>  
                    {rating &&  <UnterRatingModal tripID={route.params.tripID} rater={'driver'}  onFinishRating={completeTrip}/>}
                </Box>
            </ZStack>
            </LocationProvider>
        </NativeBaseProvider> 
    );
}