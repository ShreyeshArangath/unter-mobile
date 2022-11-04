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
import { useState } from 'react';
import {SearchBox} from '../../Components/SearchBox';
import * as Api from '../../api/api_Calls'

export const Passenger_PickLocation = ({route, navigation}) => {
    const [origin, setOrigin] = useState(null)
    const [destination, setDestination] = useState(null)

    const navigate = () => {
        navigation.push('Passenger_ConfirmLocation', {
            "user": route.params.user, 
            "color": "#E5E5E5",
            "region": route.params.region, 
            "origin": origin, 
            "destination": destination
        })
    }

    return (
        <NativeBaseProvider safeArea >
            <ZStack position={"relative"} width="100%" height="100%" >
                <GoogleMap />
                    <Box width="100%" marginTop={20}>
                        <Flex alignItems="center" direction="column" >
                            <Instructions header={"Enter your destination"} 
                            body={"Where are we going today?"}/>
                          <SearchBox 
                            api_key={GOOGLE_MAPS_API_KEY} 
                            originSetter={setOrigin}
                            destinationSetter={setDestination}
                            region={route.params.region}/>
                        <TripButton text={"Start Trip"} onPress={navigate}/>
                        </Flex>
                    </Box>
            </ZStack>
        </NativeBaseProvider>
    )
}
