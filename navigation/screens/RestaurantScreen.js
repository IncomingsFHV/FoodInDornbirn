import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, StatusBar} from 'react-native';

const RestaurantScreen = ({navigation, route}) => {
  const [restaurants, setRestaurants] = React.useState(null)

  React.useEffect(() => {
    let { restaurants } = route.params

    setRestaurants(restaurants)
  })

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <Image
          source={require("../../backend/images/bierlokal.jpg")}
          style={styles.coverImage} />
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.adress}</Text>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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