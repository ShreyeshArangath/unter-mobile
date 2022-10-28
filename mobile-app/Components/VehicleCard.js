import { Box, HStack, VStack, Text, Flex } from "native-base";
import {Image, StyleSheet} from 'react-native'

export function VehicleCard(props) {
    //TODO: Replace it with better images
    const findingDriver = require('../assets/among_us_blue.png')
    const foundDriver = require('../assets/among_us_red.png')
    const vehicleCardImage = props.found ? foundDriver : findingDriver

    return (
        <Box style={styles.boxStyle}>
            <HStack>
            <Image
                source={vehicleCardImage}
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
        width: 25, 
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