import React, {useState} from 'react';
import { StyleSheet, View, Text, Image,ImageBackground, FlatList, StatusBar} from 'react-native';

const RestaurantScreen = () => {
    return (
           <FlatList
                   data={offer}
                   renderItem={({ item }) => (
                     <View style={{ padding: 10 }}>
                        <Image
                                     //source={require("../../assets/restaurant-in-valkenswaard.jpg")}
                                     //source={item.source}
                                     style={styles.coverImage}>
                                   </Image>
                                     <Text style={styles.text}>{item.name}</Text>
                                     <Text style={styles.text}>{item.adress}</Text>
                     </View>)}/>
    )
}

const styles = StyleSheet.create({
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