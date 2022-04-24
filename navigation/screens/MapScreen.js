import * as React from "react";
import { View, Text} from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

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
    latitude: 47.414202946015486,
    longitude: 9.742768182277276,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Cafesito"
  }];


const MapScreen = ({ navigation }) => {
  
  const getInitialState = () => {
    return {
        latitude: 47.41235,
        longitude: 9.74324,
        latitudeDelta: 0.06,
        longitudeDelta: 0.02,
      };
  }

  const [region, setRegion] = React.useState(getInitialState())

  const onRegionChange = (region) => {
    setRegion({region});
  }

  const componentDidMount = () => {
    Geolocation.getCurrentPosition(
        (position) => {
            console.warn(position.coords.latitude);
            console.warn(position.coords.longitude);
            setRegion({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0,
                }
            });
        },
        (error) => {
            console.warn(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    )
}

  return (
    <View style={styles.container}>
        {/*Render our MapView*/}
        <Text onPress={() => navigation.navigate("Dornbirn")}
            style={{ position: "absolute",
            top: 0,
            left: 0,
        fontSize: 26, fontWeight: 'bold', zIndex: 1 }}>HOME</Text>
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation = {true}
            followsUserLocation = {true}
            //specify our coordinates.
            initialRegion={{
              latitude: 47.41235,
              longitude: 9.74324,
              latitudeDelta: 0.06,
              longitudeDelta: 0.02,
            }}
            onRegionChange={region => {
              setRegion({region})
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
    </View>
  );
};

//create our styling code:
const styles = StyleSheet.create({
  container: {
    flex: 1, //the container will fill the whole screen.
    backgroundColor: '#fff',
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