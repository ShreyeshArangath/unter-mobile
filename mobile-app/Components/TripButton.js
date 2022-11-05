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
    const buttonColor = props.color ? props.color :  "#B53838"
    const textColor = props.textColor ? props.textColor: "white"
    const styles =  StyleSheet.create({
        boxStyle: {
            width: '90%',
            margin: 5,
        },
        button: {
            borderRadius: 12,
            padding: 50
        },
        text: {
            color: textColor, 
        }
    })
     
    return (
        <Box style={styles.boxStyle}>
            
         <Button  backgroundColor={buttonColor} onPress={props.onPress} style={styles.button}>
                <Text bold style={styles.text}> {props.text} </Text>
            </Button>
        </Box>
       
    )

}

