import React, { useState, useEffect } from "react";
import { View } from 'react-native-ui-lib';
import { StyleSheet, Keyboard, SafeAreaView, Modal, Pressable} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Requester from "../../backend/Requester";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FlatListRestaurant  from "./SearchableFlatList";
import DetailScreen from "./DetailScreen";
import { createStackNavigator } from "@react-navigation/stack";


const DELTA_LATITUDE = 0.06;
const DELTA_LONGITUDE = 0.02;
const DEFAULT_REGION = {
  latitude: 47.41235,
  longitude: 9.74324,
  latitudeDelta: 0.03,
  longitudeDelta: 0.02,
}

const Stack = createStackNavigator();

// wrapper for the MapScreen component, with separate stack navigator which provides possible routes from the map tab

const MapContent = () => {
  return (
    <Stack.Navigator initialRouteName={"Map"}>
      <Stack.Screen options={{headerShown: false}} name="Map" component={MapScreen} />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}

// main view for the map component, renders the map and markers also with the buttons for searching and reloading

const MapScreen = ({ navigation }) => {

  const [mapRegion, setMapRegion] = React.useState(DEFAULT_REGION);

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [restaurantsFiltered, setRestaurantsFiltered] = useState([]);
  const [restaurantsAll, setRestaurantsAll] = useState([]);

  const setAll = () => {
    const Bar = Requester.getBar();
    const Bakery = Requester.getBakery();
    const Restaurant = Requester.getResturant();
    const data = [...Restaurant, ...Bar, ...Bakery];
    var searchableList = [];

    data.forEach(function(item) { 
      var splitCoordinates = item.coordinates.split(", ");
      var latitude = parseFloat(splitCoordinates[0]);
      var longitude = parseFloat(splitCoordinates[1]);
      item["latitude"] = latitude
      item["longitude"] = longitude
      item["longitudeDelta"] = DELTA_LONGITUDE
      item["latitudeDelta"] = DELTA_LATITUDE

      searchableList.push(item)
      });
      setRestaurantsFiltered(searchableList);
      setRestaurantsAll(searchableList);
    };

    useEffect(() => {
      setAll()
    },[]);

    const hideModal = () => {
      setFilterModalVisible(false);
    }

    var selectRestaurant = (item) => {
      setRestaurantsFiltered([item]);
    }

    const reloadRestaurants = () => {
      setRestaurantsFiltered(restaurantsAll)
    }


  return (
    <View style={styles.container}>
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
            restaurantsFiltered.map((val, index) => {
              return (<MapView.Marker
                      coordinate={{
                      latitude: val.latitude,
                      longitude: val.longitude,
                      latitudeDelta: val.latitudeDelta,
                      longitudeDelta: val.longitudeDelta
                      }}
                      key={index}
                      title = {val.name}
                      onPress={() => { 
                        navigation.navigate("DetailScreen", {
                          restaurant: val,
                          restaurantTitle: val.name,
                        });
                      }}
            />); 
              })}
            <View styles={styles.centeredView}> 
              <Modal
                animationType="slide"
                visible={filterModalVisible}
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                  setFilterModalVisible(!modalVisible);
                }}
              >
                <FlatListRestaurant hideModal={hideModal} searchableList={restaurantsAll} selectRestaurant={selectRestaurant}>

                </FlatListRestaurant>
              </Modal>
            </View>
            </MapView>
            <MapButtons reloadRestaurants={reloadRestaurants} setFilterModalVisible={setFilterModalVisible}></MapButtons>
    </View>
  );
};


// buttons on top of map, concretely for search and reload

const MapButtons = ({reloadRestaurants, setFilterModalVisible}) => {

  return (
    <View style={{ marginRight: 10, marginTop: 40}}>
      <MaterialCommunityIcons.Button
        style={{
          margin: "auto",
          opacity: 0.3,
        }}
        onPress={() => setFilterModalVisible(true)}
        size={40}
        iconStyle={{marginLeft: 10, color: "white"}}
        borderRadius={100}
        name={"magnify"}
        backgroundColor="#DA948D"
        />
        <View style={{margin: 3}}></View>
        
        <MaterialCommunityIcons.Button
        style={{
          margin: "auto",
          opacity: 0.3,
        }}
        onPress={() => reloadRestaurants()}
        size={40}
        iconStyle={{marginLeft: 10, color: "white"}}
        borderRadius={100}
        name={"refresh"}
        backgroundColor="#DA948D"
        />
    </View>
  )
}


const styles = StyleSheet.create({
  container: { //the container will fill the whole screen.
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MapContent;