import {
    Text,
    Center
} from 'native-base';

import {StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types'; 

function SplashHeader(props)
{
    const textColor = props.textColor ? props.textColor: "white"
    const styles =  StyleSheet.create({
        centerStyle: {
            margin: 30,
        },
        text: {
            color: textColor, 
        }
    })
     
    return (
        <Center style={styles.centerStyle}>
            <Text fontSize="6xl" style={styles.text}>{props.title}</Text>
            <Text fontSize="xl" style={styles.text}>{props.subtitle}</Text>
        </Center>
    )
}
SplashHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};

export {
    SplashHeader
}