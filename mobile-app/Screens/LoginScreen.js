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
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Api from '../api/api_Calls';
import {GOOGLE_MAPS_API_KEY} from '@env'
import { SignUp_Splash } from './SignUpScreen';
import {useState} from 'react';


//import { auth } from '../api/firebase';

//var firebaseui = require('firebaseui')

//var ui = new firebaseui.auth.AuthUI(firebase.auth())

/*ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });*/
  

export const Login_Splash = ({navigation, route }) => {


    //Text Handlers
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");
    const changeUN = text =>{
        setUsername(text)
        console.log(username)
    }
    const changePW = text => setPass(text);

    const [user, setUser] = useState(null);


    const signInUser = () => {
        console.log("Frontend Attempting Sign In")
        Api.SignInUserFrontend(username, password).then((localUser)=>{
            if(localUser)
            {
                setUser(localUser)
                navigation.navigate(localUser["userType"], {
                    "region": route.params.region
                })  
            }})
    }

    const signUpUser = () => {
        console.log("Moving to SignUp Page")
        navigation.navigate("SignUp", {
            "region": route.params.region
          }) 
    }

    const moveout = () => {

    }

    const show = true
    return (
        <NativeBaseProvider>
            <Container h="100%" w="100%" maxWidth="100%" bg="#230903" flex={1} justifyContent='center' alignItems='center'>
                <Stack style={{margin:-10}}>
                    <Image source ={icon} alt="Nani" style={{height:50, width:50, resizeMode: 'contain'}}/>
                    <Text fontSize="6xl" color="#FFFFFF">Unter</Text>
                    <Text fontSize="3xl" color="#FFFFFF">Login</Text>
                </Stack>
                <Stack style={{margin:20}}>
                    <Input onChangeText={changeUN} variant = "underlined" placeholder = "TTU eMail" type={show ? "text" : "usernameField"} w="100%"color="#FFFFFF"/>
                    <Input onChangeText={changePW} variant = "underlined" placeholder = "Password" type={show ? "text" : "passwordField"}w="100%"color="#FFFFFF"/>
                    <TripButton text="Sign In" colorScheme="default" variant="outline" onPress={() => signInUser()}/>
                    <TripButton text="Sign Up" colorScheme="default" variant="outline" onPress={() => signUpUser()}/>                
                </Stack>
            </Container>
        </NativeBaseProvider>
    )
}