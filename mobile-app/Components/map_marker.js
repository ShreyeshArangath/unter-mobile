import { Image } from 'native-base';
import { Marker } from 'react-native-maps';

export function renderMarker(point, markerImage) 
{
    return (
    <Marker coordinate={{latitude: point.latitude, longitude: point.longitude}}>
        <Image source={markerImage} alt="I" style={{height:35, width:35, resizeMode: 'contain'}}/>
    </Marker>
    )
}