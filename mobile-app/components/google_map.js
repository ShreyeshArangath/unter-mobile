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
    const OriginMarker = () => {
        props.origin && 
        <Marker  key={0} coordinate={{latitude: props.origin.latitude, longitude: props.origin.longitude}} /> }
    const DestinationMarker = () => props.dest && <Marker key={1} coordinate={{latitude: props.dest.latitude, longitude: props.dest.longitude}} />
    //TODO: Add logic to change region based on origin and destination 
    const [region, setRegion] = useState(TexasTechDefaultRegion)
    
    return (
            <MapView
                style={ styles.map }
                provider={PROVIDER_GOOGLE}
                region={region}>
                {/* TODO: Add logic to add markers based on the locations provided by the user                     */}
                <OriginMarker />
                <DestinationMarker />
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

