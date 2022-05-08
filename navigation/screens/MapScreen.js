import React, { useState, useEffect } from "react";
import { View, Text, Button} from 'react-native-ui-lib';
import { StyleSheet, Keyboard, SafeAreaView, Modal, Pressable} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Requester from "../../backend/Requester";
import { SearchBar } from 'react-native-elements';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { GOOGLE_API_KEY } from "@env";
import { color } from "react-native-reanimated";
import FlatListDemo from "./SearchableFlatList";

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

      const [filterModalVisible, setFilterModalVisible] = useState(false);
      const [restaurantsFiltered, setRestaurantsFiltered] = useState([]);
      const [search, setSearch] = useState('');
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
          item["longitudeDelta"] = 0.02
          item["latitudeDelta"] = 0.06

          searchableList.push(item)
          });
          setRestaurantsFiltered(searchableList);
          setRestaurantsAll(searchableList);
        };
    
        useEffect(() => {
          setAll()
        },[]);

        const updateSearch2 = (text) => {
          console.log("yayy")
        };

        const hideModal = () => {
          setFilterModalVisible(false);
        }

        var selectRestaurant = (item) => {
          setRestaurantsFiltered([{id: item.id, name: item.name, type: item.type, latitude : item.latitude, longitude: item.longitude, latitudeDelta: 0.003, longitudeDelta: 0.001, 
            categories: item.categories, image: item.image, location: item.location
            }]);
        }
    
    
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
                    <FlatListDemo hideModal={hideModal} searchableList={restaurantsAll} selectRestaurant={selectRestaurant}>

                    </FlatListDemo>
                  </Modal>
                </View>
               </MapView>
               <View style={{ marginRight: 10, marginTop: 30}}>
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
                    onPress={() => setRestaurantsFiltered(restaurantsAll)}
                    size={40}
                    iconStyle={{marginLeft: 10, color: "white"}}
                    borderRadius={100}
                    name={"refresh"}
                    backgroundColor="#DA948D"
                    />
                </View>
        </View>
      );
    };

//create our styling code:
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
  button: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    width: 70,
    backgroundColor: "#DA948D",
    color: "black",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

/*

 searchFilterFunction = (text) => {
    console.log(text)
    this.setState({ search: text });
    
    const filteredData = this.arrayholder.filter(item => {      
      const itemData = `${item.name.title.toUpperCase()} ${item.location.toUpperCase()} ${item.type.toUpperCase()}  
      ${item.categories.forEach(function(item){
        return item.toUpperCase();
      })}`;
      
      const textData = text.toUpperCase();
        
      return itemData.indexOf(textData) > -1;    
    });
    // console.log(filteredData)
    // this.setState({ data: newData });  
    this.setState({filteredData: filteredData});
  };

processData() {
    const Bar = Requester.getBar();
    const Bakery = Requester.getBakery();
    const Restaurant = Requester.getResturant();
    const data = [...Restaurant, ...Bar, ...Bakery];
    var searchableList = []

    data.forEach(function(item) { 
      var splitCoordinates = item.coordinates.split(", ")
      var latitude = parseFloat(splitCoordinates[0])
      var longitude = parseFloat(splitCoordinates[1])
      searchableList.push({name: item.name, type: item.type, latitude : latitude, longitude: longitude, latitudeDelta: 0.06, longitudeDelta: 0.02, 
                          categories: item.categories, image: item.image, coords: item.coordinates
                          })
    });
      this.setState({ data: data, filteredData: searchableList});
      this.arrayHolder = searchableList;
  };



<GooglePlacesAutocomplete
          placeholder="Search"
          query={{
            key: GOOGLE_API_KEY,
            language: 'en', // language of the results
          }}
          onPress={(data, details = null) => {
            console.log(details["geometry"])
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
*/
export default MapScreen;