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
        if (props.originMarker && props.destinationMarker) mapRef.current.fitToSuppliedMarkers(
                ["origin", "destination"], {edgePadding: {top: 43, bottom: 20, left: 50, right: 50}}, true
            )
    }, [])

    const [region, setRegion] = useState((props.startingRegion==undefined)?TexasTechDefaultRegion:props.startingRegion)

    function getRegion(origin, destination, zoom) {
        const oLat = Math.abs(origin.latitude);
        const oLng = Math.abs(origin.longitude);
        const dLat = Math.abs(destination.latitude);
        const dLng = Math.abs(destination.longitude);
      
        return {
            latitude: (origin.latitude + destination.latitude) / 2,
            longitude: (origin.longitude + destination.longitude) / 2,
            latitudeDelta: Math.abs(oLat - dLat) + zoom,
            longitudeDelta: Math.abs(oLng - dLng) + zoom,
        };                                                                                  
      }
    
    return (
            <MapView
                ref={mapRef}
                style={ props.style ? props.style : styles.map }
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

