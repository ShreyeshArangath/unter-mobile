import {
    Box,
    NativeBaseProvider,
    Center,
    Pressable,
    Flex,
    Text,
    Container,
    ScrollView,
} from 'native-base';
import React, { useEffect, useState } from 'react';

export const Admin_View_Users = ({navigation, route}) => {
    const [users, setUsers] = useState(route.params.users)//TODO: add refresh

    function showBriefUserInfo(userID){
        const dob = new Date(users[userID].dob?.seconds * 1000).toDateString()
        return (
        <Box flex={1} width="100%" key={userID} bg={"#729EA1"} style={{margin:5, borderRadius:10}}>
            <Pressable h="100%" w="100%" maxWidth="100%" onPress={() => nextScreen(userID)}>
                <Text color={"white"} textColor={"black"} textAlign={"center"} margin={"5px"}>{"UUID: " + userID}</Text>
                <Container bg={"#242424"} w="100%" maxWidth="100%"  style={{paddingHorizontal:10, paddingVertical:5, borderRadius:10}}>
                    <Flex direction='row'>
                        <Text color={"white"}>{"Name: " + users[userID].fName + " " + users[userID].lName }</Text>
                        <Text color={"white"} flex={"1"} textAlign={"right"}>{"DOB: " + dob}</Text>
                    </Flex>
                    <Flex direction='row'>
                        <Text color={"white"}>{"Type: " + users[userID].type}</Text>
                    </Flex>
                </Container>
            </Pressable>
        </Box>)
    }

    const nextScreen = (userID) => {
        navigation.push("Admin_View_Users_info", {"userID": userID, "user": users[userID]})
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <Container style={{height:"100%", width:"100%", maxWidth:"100%", justifyContent:'center', alignItems:'center', padding:10}}>
                    {Object.keys(users).map((userID) => (showBriefUserInfo(userID)) )}
                </Container>
            </ScrollView>
        </NativeBaseProvider>
    )
}
