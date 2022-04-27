import * as React from "react";
import { View, Text} from 'react-native-ui-lib';
import { StyleSheet, Keyboard } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { GOOGLE_API_KEY } from "@env";

const DELTA_LATITUDE = 0.06;
const DELTA_LONGITUDE = 0.02;

const markers = [{
    latitude: 47.40735,
    longitude: 9.73132,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Tivoli",
  },
  {
    latitude: 47.41323,
    longitude: 9.742263927011363,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Frei",
  },
  {
    latitude: 47.41361683871995,
    longitude: 9.742774217778962,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "San Marco",
  },
  {
    latitude: 47.41227020385477,
    longitude: 9.74245570613719,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Gabriel's Cucina",
  },
  {
    latitude: 47.41343193010803,
    longitude: 9.742170545185651,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Rotes Haus",
  },
  {
    latitude: 47.412534384879606,
    longitude: 9.74254468557075,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Bierlokal",
  },
  {
    latitude: 47.412920576069844,
    longitude: 9.742285984507733,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Bäckerei Mangold",
  },
  {
    latitude: 47.413536835740885,
    longitude: 9.742490869167032,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Schertlerbrot",
  },
  {
    latitude: 47.415359048832684,
    longitude:  9.741850113343025,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Schwanenbäckerei",
  },
  {
    latitude: 47.41422199102713,
    longitude: 9.741850113343025,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Cafe Bäckerei",
  },
  {
    latitude: 47.41697508359887,
    longitude: 9.73945979800233,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Simit Coffee",
  },
  {
    latitude: 47.414202946015486,
    longitude: 9.742768182277276,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Cafesito"
  }];



    // "coordinates": "47.412920576069844, 9.742285984507733", "Bäckerei Mangold"
    // "coordinates": "47.413536835740885, 9.742490869167032",  "Schertlerbrot"


const MapScreen = ({ navigation }) => {

  const [mapRegion, setMapRegion] = React.useState({
    latitude: 47.41235,
    longitude: 9.74324,
    latitudeDelta: 0.06,
    longitudeDelta: 0.02,
  })
 

  return (
    <View style={styles.container}>
        {/*Render our MapView*/}
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            followsUserLocation={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            toolbarEnabled={true}
            zoomEnabled={true}
            rotateEnabled={true}
            onPress={Keyboard.dismiss()}
            region={mapRegion}
            >
            {markers.map((val, index) => {
              return (<MapView.Marker
                      coordinate={{
                      latitude: val.latitude,
                      longitude: val.longitude,
                      latitudeDelta: val.latitudeDelta,
                      longitudeDelta: val.longitudeDelta
                      }}
                      key={index}
                      title = {val.name}
            />); 
             })}
  
        </MapView>
        <GooglePlacesAutocomplete
          placeholder="Search"
          query={{
            key: GOOGLE_API_KEY,
            language: 'en', // language of the results
          }}
          onPress={(data, details = null) => {
            setMapRegion({
              latitude: details["geometry"]["location"]["lat"],
              longitude: details["geometry"]["location"]["lng"],
              latitudeDelta: DELTA_LATITUDE,
              longitudeDelta: DELTA_LONGITUDE,
            })}
          }
          onFail={(error) => console.error(error)}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              width:"90%",
              marginTop: 40,
              opacity: 0.9,
            },
            textInput: {
              height: 38,
              width: 100,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            }
          }}
          requestUrl={{
            url:
              'https://maps.googleapis.com/maps/api',
            useOnPlatform: 'web',
          }} // this in only required for use on the web. See https://git.io/JflFv more for details.
        />
    </View>
  );
};

//create our styling code:
const styles = StyleSheet.create({
  container: {
    flex: 1, //the container will fill the whole screen.
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MapScreen;