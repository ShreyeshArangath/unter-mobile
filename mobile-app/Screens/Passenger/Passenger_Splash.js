import {
    NativeBaseProvider,
    Button
} from 'native-base';
import { useEffect } from 'react';




export const Passenger_Splash = ({ navigation, route }) => {
   const navigate = () => {

    navigation.push("Passenger_PickLocation", {

        "region": route.params.region
    })
   }

    return (
        <NativeBaseProvider>
            <Button title="View Past Trips" onPress={navigate}>
             Next
            </Button> 
        </NativeBaseProvider>
    )
}
