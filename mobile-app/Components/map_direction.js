import { Image } from 'native-base';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useState } from 'react';

export function renderDirection(origin, destination, onMapPress) 
{

    return (
        <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={process.env.GOOGLE_MAPS_API_KEY}
            strokeWidth={5}
            strokeColor="blue"
            onReady={onMapPress}
        />
    )
}