import { NativeBaseProvider } from "native-base"
import { useState } from "react"
import { StyleSheet } from "react-native"
import MapView, {PROVIDER_GOOGLE} from "react-native-maps"
import { Marker } from "react-native-maps"

const TexasTechDefaultRegion = {
    latitude: 33.579166,
    longitude: -101.886909,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

export default function GoogleMap(props) {
    //TODO: Fix marker bug — only one makrer is populated at a time 
    //TODO: Add logic to change region based on origin and destination 
    const [region, setRegion] = useState(TexasTechDefaultRegion)
    
    return (
            <MapView
                style={ styles.map }
                provider={PROVIDER_GOOGLE}
                region={region}>
              {/* {props.origin && <Marker coordinate={{latitude: props.origin.latitude, longitude: props.origin.longitude}} /> }
              {props.dest && <Marker coordinate={{latitude: props.dest?.latitude, longitude: props.dest?.longitude}} /> } */
              }
              {props.originMarker}
              {props.destinationMarker}
              {props.directions}
            </MapView>
    )
}


const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
})

