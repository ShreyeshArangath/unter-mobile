
import React, {useState, useEffect, createContext} from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager'
import {Accuracy} from "expo-location";
import { realTimeDatabase } from "./api/firebase";
import {updateUserLiveLocationInfo, UnterLocation} from './api/live_location'

export const LocationContext = createContext(null);

export function LocationProvider(props) {
    const [location, setLocation] = useState(null);
    const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';

    TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
        if (error) {
        // check `error.message` for more details.
        return;
        }
        const location = UnterLocation(locations[0].coords.latitude, locations[0].coords.longitude)
        await updateUserLiveLocationInfo(realTimeDatabase, props.name, location)
    });

    const watchLocation = async () => {
        let {status} = await Location.requestBackgroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        await Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
            deferredUpdatesInterval: 2000,
            requiredAccuracy: Accuracy.Balanced
        });
    }

    useEffect(() => {
        let location = watchLocation();
    }, []);

    return (
        <LocationContext.Provider value={[location,setLocation]}>
            {props.children}
        </LocationContext.Provider>
    )
}