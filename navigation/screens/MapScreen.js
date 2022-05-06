import React, { useState, useEffect } from "react";
import { View, Text, Button} from 'react-native-ui-lib';
import { StyleSheet, Keyboard } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Requester from "../../backend/Requester";

import { GOOGLE_API_KEY } from "@env";

const DELTA_LATITUDE = 0.06;
const DELTA_LONGITUDE = 0.02;


    // "coordinates": "47.412920576069844, 9.742285984507733", "Bäckerei Mangold"
    // "coordinates": "47.413536835740885, 9.742490869167032",  "Schertlerbrot"


const MapScreen = ({ navigation }) => {

  const [mapRegion, setMapRegion] = React.useState({
    latitude: 47.41235,
    longitude: 9.74324,
    latitudeDelta: 0.03,
    longitudeDelta: 0.02,
  });

  const [restaurantsCoords, setRestaurantsCoords] = useState([])
  const setAll = () => {
    const Bar = Requester.getBar();
    const Bakery = Requester.getBakery();
    const Restaurant = Requester.getResturant();
    const data = [...Restaurant, ...Bar, ...Bakery];
    var coords = []

    data.forEach(function(item) { 
      var splitCoordinates = item.coordinates.split(", ")
      var latitude = parseFloat(splitCoordinates[0])
      var longitude = parseFloat(splitCoordinates[1])
   
      coords.push({"name": item.name, "latitude": latitude, "longitude": longitude, "latitudeDelta": 0.06, "longitudeDelta": 0.02})
    });
    setRestaurantsCoords(coords);
  };

  useEffect(() => {
    setAll()
  },[])

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
            {
            restaurantsCoords.map((val, index) => {
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