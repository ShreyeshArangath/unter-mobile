import { StyleSheet, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input } from 'native-base';

//TODO: Add additional styling to the GoogleMapSearch component 
export default function GoogleMapSearch(props) {
    return (
    <GooglePlacesAutocomplete
        placeholder="Where From?"
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        GooglePlacesSearchQuery={{
            rankby: "distance"
        }}
        query={{
          key: props.api_key,
          language: 'en',
          components: "country:us",
          radius: 3000,
          location: `${props.region.latitude}, ${props.region.longitude}`
        }}
        />
    );
  };

  const styles = StyleSheet.create({
    search: {
        width: "80%"
    }
  })