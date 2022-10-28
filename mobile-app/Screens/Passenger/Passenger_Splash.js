import {
    NativeBaseProvider,
    Button
} from 'native-base';

export const Passenger_Splash = ({ navigation, route }) => {
   const navigate = () => {
    navigation.push("Passenger_PickLocation", {
        "user": {
            //TODO: Add a function that gets the name of the current active user — after authentication 
            "username": "Shreyesh"
        }, 
        "color": "#E5E5E5",
        "region": route.params.region
    })
   }

    return (
        <NativeBaseProvider>
            <Button title="View Past Trips" onPress={navigate}>
             Next! 
            </Button> 
        </NativeBaseProvider>
    )
}
