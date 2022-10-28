import { Box, HStack, VStack, Text, Flex } from "native-base";
import {Image, StyleSheet} from 'react-native'

export function VehicleCard(props) {
    const carImage = require('../assets/among_us_blue.png')
    return (
        <Box style={styles.boxStyle}>
            <HStack>
            <Image
                source={require('../assets/among_us_blue.png')}
                style={styles.imageStyle}
             />
                <VStack style={styles.descriptionBox}>
                    <Text bold>{props.header}</Text>
                    <Text>{props.extraInfo}</Text>
                </VStack>
            <VStack style={styles.timeBox}>
                <Text color={"grey"}>5 mins</Text>
            </VStack>
            </HStack>
        </Box>
    )
}

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: 'white', 
        padding: 15,
        width: '90%',
        margin: 5,
        borderRadius: 10,
    }, 
    textStyle: {
        color: 'white'
    },
    imageStyle: {
        width: 35, 
        height: 35,
        margin: 10,
    },
    descriptionBox: {
        margin: 5,
    },
    timeBox: {
        marginLeft: 20,
        marginTop: 10,
        padding: 10,
    }
   
})