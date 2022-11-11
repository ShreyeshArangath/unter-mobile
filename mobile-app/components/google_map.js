import { useEffect, useRef, useState } from "react"
import { StyleSheet } from "react-native"
import MapView, {PROVIDER_GOOGLE} from "react-native-maps"

const TexasTechDefaultRegion = {
    latitude: 33.5842581,
    longitude: -101.8870381,
    latitudeDelta: 0.022,
    longitudeDelta: 0.0421,
}

export default function GoogleMap(props) {
    
    const mapRef = useRef(null)
    useEffect(() => {
        if (props.originMarker && props.destinationMarker) mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {edgePadding: {left: 50, right: 50}}, true)
    }, [])

    const [region, setRegion] = useState((props.startingRegion==undefined)?TexasTechDefaultRegion:props.startingRegion)
    
    return (
            <MapView
            ref={mapRef}
                style={ styles.map }
                provider={PROVIDER_GOOGLE}
                followsUserLocation
                showsMyLocationButton
                showsUserLocation
                initialRegion={region}>
              {props.originMarker}
              {props.destinationMarker}
              {props.driverMarker}
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

