import {
  StatusBar
} from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function App() {
  return ( < View style = {styles.container} >
    <Text > Unter </Text> 
    <StatusBar style = "auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2fe3c2',
    color: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});