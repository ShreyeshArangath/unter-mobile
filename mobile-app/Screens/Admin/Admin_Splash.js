import {
    NativeBaseProvider,
    Center,
    Text,
    Container,
    Spinner
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { TripButton } from '../../Components/TripButton';
import * as Api from '../../api/api_Calls'

export const Admin_Splash = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

    const getTrips = () => {
        setLoading(true);
        Api.GetAllTrips().then(resp => {
            setLoading(false)
            navigation.push("Admin_View_Trips", {"trips":resp})
        }).catch(err =>{
            console.log(err)
        })
    }

    const getUsers = () => {
        setLoading(true);
        Api.GetAllUsers().then(resp => {
            setLoading(false)
            navigation.push("Admin_View_Users", {"trips":resp})
        }).catch(err =>{
            console.log(err)
        })
    }

    return (
        <NativeBaseProvider>
            <Container h="100%" w="100%" maxWidth="100%" bg="#5ccfe0" flex={1} justifyContent='center' alignItems='center'>
                <Center style={{margin: 30}}>
                    <Text fontSize="6xl" color="#FFFFFF">Unter</Text>
                    <Text fontSize="xl" color="#FFFFFF">Admin</Text>
                </Center>
                <Center style={{margin: 30}}>
                    {(loading)?(
                    <>
                        <Spinner  accessibilityLabel={"Loading..."}/>
                        <Text>{"Loading..."}</Text>
                    </>):
                    (<>
                        <TripButton text="View Trips" color={"white"} textColor={"black"}  onPress={getTrips} /> 
                        <TripButton text="View Users" color={"white"} textColor={"black"}  onPress={getUsers} /> 
                    </>)
                    }
                </Center>
               
            </Container>
        </NativeBaseProvider>
    )
}
