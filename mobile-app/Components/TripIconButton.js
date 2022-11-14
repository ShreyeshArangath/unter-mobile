import {
    Button,
    Text,
    Box,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {View, StyleSheet } from 'react-native';
import React from 'react';

export const TripIconButtonType = {
    Message: 'chatbox-ellipses-sharp',
    Emergency: 'alert-sharp'
}

//allow us to go to next page of the screen
export function TripIconButton(props)
{
    const buttonColor =  props.color ? props.color :  "#B53838"

    return (
        <Box style={styles.boxStyle}>
         <Button  backgroundColor={buttonColor} onPress={props.onPress} style={styles.button}>
                <Ionicons name={props.type} size={20} color={"white"}/>
        </Button>
        </Box>
       
    )
}

const styles =  StyleSheet.create({
    boxStyle: {
        width: 50,
        height: 50,
        margin: 5,
    },
    button: {
        borderRadius: 12,
        padding: 50
    },
    text: {
        color: 'white', 
    }
})