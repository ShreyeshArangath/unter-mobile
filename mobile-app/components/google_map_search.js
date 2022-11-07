import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {View} from 'react-native'

//TODO: Add additional styling to the GoogleMapSearch component 

export default function GoogleMapSearch(props) {
  const iconType = props.type == "origin"? 'locate-sharp' : 'location-sharp'
  const iconColor = props.type == "origin" ? "#729EA1" : '#DC2626'

    return (
    <GooglePlacesAutocomplete
        placeholder={props.placeholder}
        textInputProps={{
          placeholderTextColor: '#000000',
          fontWeight: "400",
          returnKeyType: "search"
        }}
        fetchDetails={true}
        onPress={(data, details) => {
          props.setter({
            "latitude": details.geometry.location.lat, 
            "longitude": details.geometry.location.lng, 
          })
        }}
        GooglePlacesSearchQuery={{
            rankby: "distance"
        }}
        styles={styles}
        query={{
          key: props.api_key,
          language: 'en',
          components: "country:us",
          radius: 3000,
          location: `${props.region.latitude}, ${props.region.longitude}`
        }}
        renderLeftButton={() => (
          <View style={{ marginLeft : 10 }}>
           <Ionicons name={iconType}  size={24} color={iconColor}/>
          </View>
           )}
        />
    );
  };

  const styles = StyleSheet.create({
    textInput: {
        borderRadius: 20,
        fontWeight: '100',
    },
    textInputContainer:{
        borderRadius: 50,
        width: "100%",
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    }
})