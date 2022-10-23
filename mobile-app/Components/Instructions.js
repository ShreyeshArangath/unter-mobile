import {
    Button,
    Text,
    Modal,
    Center,
    FormControl,
    Input,
    NativeBaseProvider,
    Box,
    Image,
} from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import React, { Component, useState } from 'react';


//the item that displays the instruction popup for each user type
export function Instructions(props)
{
    return (
        <Box style={styles.boxStyle}>
            <Text fontSize={"15"} bold style={styles.textStyle}>{props.header}</Text>
            <Text fontSize={"10"} style={styles.textStyle}>{props.body}</Text>
        </Box>
    )
}

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: '#729EA1', 
        padding: 15,
        width: '90%',
        margin: 5,
        borderRadius: 10,
    }, 
    textStyle: {
        color: 'white'
    }
   
})