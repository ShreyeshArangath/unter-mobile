import {
    NativeBaseProvider,
    Button
} from 'native-base';
import { useEffect } from 'react';


//TODO: Replace this with the call to user API 
const dummyPassenger = {
    KeaG7oWA9tGo067gcByO: {
        dob: "06-28-2000",
        fName: "Tyler",
        lName: "Nee", 
        type: "passenger",
        username: "tylerNee", 
        id: "KeaG7oWA9tGso067gcByO"
    }
}

export const Passenger_Splash = ({ navigation, route }) => {
   const navigate = () => {

    navigation.push("Passenger_PickLocation", {
        "user": dummyPassenger.KeaG7oWA9tGo067gcByO, 
        "color": "#E5E5E5",
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
