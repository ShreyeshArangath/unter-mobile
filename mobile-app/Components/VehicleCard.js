import { Box, HStack, VStack, Text, Flex, Avatar} from "native-base";
import {Image, StyleSheet} from 'react-native'
import { FINDING_DRIVER, FOUND_DRIVER } from "../config/default_images";

export function VehicleCard(props) {
    //TODO: Replace it with better images
    const vehicleCardImage = props.found ? FOUND_DRIVER : FINDING_DRIVER
    return (
        <Box style={styles.boxStyle}>
            <HStack>
            <Avatar 
                size="lg"
                source={{uri: vehicleCardImage}} 
            />
                <VStack style={styles.descriptionBox}>
                    <Text bold>{props.header}</Text>
                    <Text>{props.extraInfo}</Text>
                </VStack>
                <VStack style={styles.timeBox} backgroundColor={"gray.100"}>
                    <Text bold>ETA</Text>
                    <Text>{props.time} mins</Text>
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
        margin: 10
    },
    descriptionBox: {
        marginLeft: 40,
        margin: 5,
    },
    timeBox: {
        marginLeft: 40,
        padding: 10,
        borderRadius: 5
    }
})