import { Box, HStack, VStack, Text, Avatar } from "native-base";
import {Image, StyleSheet} from 'react-native'

export function PassengerCard(props) {
    //TODO: Replace it with better images
    const passengerCardImage = "https://images.unsplash.com/photo-1603065881771-8aa5eb1ed8bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=678&q=80"
    return (
        <Box style={styles.boxStyle}>
            <HStack>
            <Avatar 
                size="lg"
                source={{
                uri: passengerCardImage 
                }} 
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