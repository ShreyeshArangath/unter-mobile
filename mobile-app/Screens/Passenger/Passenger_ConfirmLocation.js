import GoogleMap from '../../Components/google_map';
import {
    Box,
    NativeBaseProvider,
    ZStack, 
    Flex,
} from 'native-base';
import { Instructions } from '../../Components/Instructions';
import {GOOGLE_MAPS_API_KEY} from '@env';
import { TripButton } from '../../Components/TripButton';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import { useState } from 'react';

export const Passenger_ConfirmLocation = ({route, navigation}) => {
    const [origin, setOrigin] = useState(route.params.origin)
    const [destination, setDestination] = useState(route.params.destination)
    const [duration, setDuration ] = useState(0)  //API returns duration in mins

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

    const navigate = () => {
          //TODO: Navigate to the next screen 
          navigation.push('Passenger_Ride', {
            "user": {
                "username": "Shreyesh"
            }, 
            "color": "#E5E5E5",
            "region": route.params.region, 
            "origin": origin, 
            "destination": destination
        })
    }

    return (
        <NativeBaseProvider>
            <ZStack position={"relative"} width="100%" height="100%" >
                <GoogleMap directions={renderDirection()} originMarker={renderMarker(origin, "origin")} destinationMarker={renderMarker(destination, "destination")} />
                <Box width="100%" marginTop={20}>
                        <Flex alignItems="center" direction="column" >
                            <Instructions header={"Confirm Destination"} 
                            body={`Travel Time: ${duration.toFixed(0)} mins`}/>
                        <TripButton text={`Confirm Destination`} onPress={navigate}/>
                        </Flex>
                    </Box>
            </ZStack>
        </NativeBaseProvider> 
    );
}
