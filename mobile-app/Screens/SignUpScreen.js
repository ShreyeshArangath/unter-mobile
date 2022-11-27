import {
    Button,
    Image,
    Input,
    Box,
    NativeBaseProvider,
    VStack,
    Center,
    KeyboardAvoidingView,
    ZStack, 
    Flex,
    Text,
    Container,
    Heading,
    Spinner,
    Pressable,
    Stack
} from 'native-base';
import {TripButton} from '../Components/TripButton';
import icon from '../assets/icon.png';
import {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Api from '../api/api_Calls';
import {GOOGLE_MAPS_API_KEY} from '@env'


  

export const SignUp_Splash = ({navigation, route }) => {

    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [phone, setPhone] = useState("");

    const changeUN = text =>{
        setUsername(text)
        console.log(username)
    }
    const changePW = text => setPass(text);
    const changeFN = text => setFName(text);
    const changeLN = text => setLName(text);
    const changePN = text => setPhone(text);

    const [user, setUser] = useState(null);



    const signUpUser = (type) => {
        console.log("Frontend Attempting Sign Up, values are %s %s %s %s %s", username, password, fname, lname, phone)
        Api.CreateUserFrontend(username, password, fname, lname, phone, type).then((localUser)=>{
            setUser(localUser)
            console.log(localUser, "from nav attempt")
            navigation.navigate(localUser["type"], {
                "region": route.params.region
            })
        }).catch(err => {
            console.log(err)
            return false
        })
    }

    const back = () => {
        navigation.navigate("Login", {
            "region": route.params.region
          }) 
    }

    const show = true
    return (
        <NativeBaseProvider>
            <Container h="100%" w="100%" maxWidth="100%" bg="#230903" flex={1} justifyContent='center' alignItems='center'>
                <Stack style={{margin:-10}} alignItems='center'>
                    <Image source ={icon} alt="Nani" style={{height:50, width:50, resizeMode: 'contain'}}/>
                    <Text fontSize="3xl" color="#FFFFFF">Sign Up!</Text>
                </Stack>
                <Stack style={{margin:20}} alignItems='center'>
                    <Input onChangeText={changeUN} variant = "underlined" placeholder = "TTU eMail" type={show ? "text" : "usernameField"} w="100%"color="#FFFFFF"/>
                    <Input onChangeText={changePW} variant = "underlined" placeholder = "Password" type={show ? "text" : "passwordField"}w="100%"color="#FFFFFF"/>
                    <Input onChangeText={changeFN} variant = "underlined" placeholder = "First Name" type={show ? "text" : "fnameField"} w="100%"color="#FFFFFF"/>
                    <Input onChangeText={changeLN} variant = "underlined" placeholder = "Last Name" type={show ? "text" : "lnameField"}w="100%"color="#FFFFFF"/>
                    <Input onChangeText={changePN} variant = "underlined" placeholder = "Phone No." type={show ? "text" : "phoneField"} w="100%"color="#FFFFFF"/>
                    <TripButton text="Sign Up (Passenger)!" colorScheme="default" variant="outline" onPress={() => signUpUser("Passenger")}/>         
                    <TripButton text="Sign Up (Driver)!" colorScheme="default" variant="outline" onPress={() => signUpUser("Driver")}/>    
                    <TripButton text="Sign Up (Admin)!" colorScheme="default" variant="outline" onPress={() => signUpUser("Admin")}/>     
                    <TripButton text="Back" colorScheme="default" variant="outline" onPress={() => back()}/>        
                </Stack>
            </Container>
        </NativeBaseProvider>
    )
}