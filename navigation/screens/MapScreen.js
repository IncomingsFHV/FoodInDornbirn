import * as React from "react";
import { View, Text} from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import MapView from "react-native-maps";

var markers = [{
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
    latitude: 47.414202946015486,
    longitude: 9.742768182277276,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Cafesito"
  }];

const MapScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        {/*Render our MapView*/}
        <MapView
            style={styles.map}
            //specify our coordinates.
            initialRegion={{
            latitude: 47.41235,
            longitude: 9.74324,
            latitudeDelta: 0.06,
            longitudeDelta: 0.02,
            }}
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
      <Text onPress={() => navigation.navigate("Dornbirn")}
            style={{ fontSize: 26, fontWeight: 'bold' }}>BACK</Text>
    </View>
  );
};

//create our styling code:
const styles = StyleSheet.create({
  container: {
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;