
import {Box, Divider, Flex} from 'native-base';
import { StyleSheet } from 'react-native';
import GoogleMapSearch from './google_map_search';

export function SearchBox(props) {
    return (
        <Box style={styles.boxStyle}>
            <Flex alignItems="center" direction="column">
                <GoogleMapSearch 
                    type={"origin"}
                    placeholder="Where from?"
                    api_key={props.api_key}
                    region={props.region}
                    setter={props.originSetter}/>
                <Divider style={styles.divider}/>
                <GoogleMapSearch 
                type={"destination"}
                placeholder="Where to?"
                api_key={props.api_key}
                region={props.region} 
                setter={props.destinationSetter}/>  
            </Flex>   
        </Box>
       
    )
}

const styles =  StyleSheet.create({
    boxStyle: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        margin: 5,
    },
    divider: {
        width: "80%"
    }
})