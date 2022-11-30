import {
    NativeBaseProvider,
    Text,
    Pressable,
    Flex,
    Box,
    Container,
    Avatar,
    Center,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { TripButton } from '../../Components/TripButton';
import * as Api from '../../api/api_Calls'

const dummyImageURI = "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"

export const Admin_View_Users_info = ({navigation, route}) => {
    const [userID, setUserID] = useState(route.params.userID)
    const [user, setUser] = useState(route.params.user)

    const dob = new Date(user.dob?.seconds * 1000).toDateString()
    const member_since = new Date(user.member_since?.seconds * 1000).toDateString()

    const navTrips = () => {
        (user.type=="driver"?Api.GetDriverTripHistory(userID):Api.GetPassengerTripHistory(userID))
        .then(resp => {
            navigation.push("Admin_View_Trips", {"trips":resp})
        }).catch(err =>{
            console.log(err)
        })
    }

    return (
    <NativeBaseProvider>
            <Box flex={1} key={userID} bg={"#729EA1"} style={{marginHorizontal:5, marginTop:10, borderRadius:10}}>
                <Text color={"white"} textColor={"black"} textAlign={"center"} margin={"5px"}>{"UUID: " + userID}</Text>
                <Container flex={1} bg={"#242424"} w="100%" maxWidth="100%"  style={{paddingHorizontal:10, paddingVertical:5, borderRadius:10}}>
                    <Center w="100%" maxWidth="100%" style={{marginVertical:15}}>
                        <Avatar 
                            size="2xl"
                            source={{
                            uri: dummyImageURI
                            }} 
                        />
                    </Center>  
                    <Text color={"white"}>{"Account Type: " + user.type}</Text>
                    <Text color={"white"}>{"Name: " + user.fName + " " + user.lName }</Text>
                    <Text color={"white"}>{"Member Since: " + member_since}</Text>
                    <Text color={"white"}>{"DOB: " + dob}</Text>
                    <Text color={"white"}>{"Total Trips: " + user.num_trips}</Text>
                    <Text color={"white"}>{"Rating: " + user.rating}</Text>
                    <Center w="100%" maxWidth="100%" style={{marginVertical:15}}>
                        <TripButton text={"View Past Trips"} onPress={navTrips}/>
                    </Center>
                </Container>
            </Box>
    </NativeBaseProvider>
    )
}
