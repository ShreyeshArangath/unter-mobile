
import React, {useState, useEffect, createContext} from 'react';
import * as Location from 'expo-location';
import {Accuracy} from "expo-location";
import { realTimeDatabase } from "./api/firebase";
import {updateUserLiveLocationInfo, UnterLocation} from './api/live_location'

export const LocationContext = createContext(null);

export function LocationProvider(props) {
    const [location, setLocation] = useState(null);

    const watchLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        await Location.watchPositionAsync({
            distanceInterval: 200,
            requiredAccuracy: Accuracy.Balanced
        }, (location)=>{
            setLocation(location)
            setTimeout(updateUserLiveLocationInfo(realTimeDatabase, props.name, UnterLocation(location.coords.latitude, location.coords.longitude)), 10000)    
        });
    }

    useEffect(() => {
        let location = watchLocation();
    }, []);

    return (
        <LocationContext.Provider>
            {props.children}
        </LocationContext.Provider>
    )
}