import { NativeBaseProvider } from "native-base"
import { StyleSheet } from "react-native"
import MapView, {PROVIDER_GOOGLE} from "react-native-maps"

// TODO: Add l
export default function GoogleMap(props) {
    return (
            <MapView
                style={ styles.map }
                provider={PROVIDER_GOOGLE}>
                {/* TODO: Add logic to add markers based on the locations provided by the user                     */}
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
    },
})

