import {
    Button,
    Text,
    Center,
    Box,
    HStack
} from 'native-base';

import {View, StyleSheet } from 'react-native';
import React, { Component, useState } from 'react';


//allow us to go to next page of the screen
export function TripButton(props)
{
    return (
        <Box style={styles.boxStyle}>
         <Button onPress={props.onPress} style={styles.button}>
                <Text bold style={styles.text}> {props.text} </Text>
            </Button>
        </Box>
       
    )
}

const styles =  StyleSheet.create({
    boxStyle: {
        width: '90%',
        margin: 5,
    },
    button: {
        backgroundColor: "#B53838",
        borderRadius: 12,
        padding: 50
    },
    text: {
        color: 'white', 
    }
})