import GoogleMap from '../../Components/google_map';
import {
    Box,
    NativeBaseProvider,
    ZStack, 
    Flex,
} from 'native-base';
import { Instructions } from '../../Components/Instructions';
import { TripButton } from '../../Components/TripButton';
import { useState } from 'react';
import { StartTrip } from '../../api/api_Calls';
import { renderMarker } from '../../Components/map_marker';
import { renderDirection } from '../../Components/map_direction';
import DriverImage from '../../assets/among_us_red.png';
import PinImage from '../../assets/Pin.png';

export const Passenger_ConfirmLocation = ({route, navigation}) => {
    const [origin, setOrigin] = useState(route.params.origin)
    const [destination, setDestination] = useState(route.params.destination)
    const [duration, setDuration ] = useState(0)  //API returns duration in mins
    const [distance, setDistance] = useState(0)
    const [directions, setDirections] = useState(
        renderDirection(
            origin, 
            destination,
            (res) => {
                setDuration(res.duration)
                setDistance(res.distance) })
    )

    const confirmTripInfo = async (passenger) => {
        StartTrip(
            route.params.userID,// TODO: Get passenger ID from above 
            {
                'start_latitude': origin.latitude,
                'start_longitude': origin.longitude,
                'end_latitude': destination.latitude,
                'end_longitude': destination.longitude
            }
        ).then(new_trip_id => {
            if (new_trip_id){
                navigate(new_trip_id)
            }
            else{
                console.error("Starting a trip was unsuccessful.")
            }
        })
    }


    const navigate = (tripId) => {
          //TODO: Navigate to the next screen 
          navigation.push('Passenger_Ride', {
            "user": route.params.user, 
            "color": "#E5E5E5",
            "region": route.params.region, 
            "origin": origin, 
            "destination": destination,
            "tripId": tripId, 
            "duration": duration.toFixed(0),
            "userID": route.params.userID
        })
    }

    return (
        <NativeBaseProvider>
            <ZStack position={"relative"} width="100%" height="100%" >
                <GoogleMap 
                    directions={directions} 
                    originMarker={renderMarker(origin, DriverImage, "origin")} 
                    destinationMarker={renderMarker(destination, PinImage, "destination")} />
                <Box width="100%" marginTop={20}>
                        <Flex alignItems="center" direction="column" >
                            <Instructions header={"Confirm Destination"} 
                            body={`Travel Time: ${duration.toFixed(0)} mins`}/>
                        <TripButton text={`Confirm Destination`} onPress={confirmTripInfo}/>
                        </Flex>
                    </Box>
            </ZStack>
        </NativeBaseProvider> 
    );
}
