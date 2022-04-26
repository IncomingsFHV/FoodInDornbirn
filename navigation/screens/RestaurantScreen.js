import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image,ImageBackground, FlatList, StatusBar} from 'react-native';

const RestaurantScreen = () => {
  const [selectedId, setSelectedId] = useState(null);

  const [offer, setOffer] = useState([
    { name: "RESTAURANT1", id: "1", adress: "address123456", source: require("../../backend/images/bierlokal.jpg")},
    { name: "RESTAURANT2", id: "2", adress: "address123356", source: require("../../backend/images/7er-bar.jpg") },
    { name: "RESTAURANT3", id: "3", adress: "address123556", source: require("../../backend/images/bierlokal.jpg") },
  ]);

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <Image
          //source={require("../../assets/restaurant-in-valkenswaard.jpg")}
          source={item.source}
          style={styles.coverImage}>
        </Image>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.adress}</Text>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={offer}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  coverImage: {
    height: 300,
    width: null,
    borderRadius: 15,
  },
    text: {
      fontSize: 15,
      color: "black",
      padding: 3,
      paddingLeft: 10,
      paddingRight: 200,
    },
});

  export default RestaurantScreen;