import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { View, Text } from "react-native-ui-lib";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Restaurant screen must have route for getting params from HomeScreen

const RestaurantScreen = ({ navigation, route }) => {
  const [restaurants, setRestaurants] = React.useState(null);

  // Getting restaurants filtered list based on category

  React.useEffect(() => {
    let { restaurants } = route.params;
    setRestaurants(restaurants);
    navigation.setOptions({ title: route.params.restaurantTitle })
  });


  // Rendering restaurants

  function renderRestaurantList() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ paddingBottom: 20 }}
          onPress={() => {
            navigation.navigate("DetailScreen", {
              restaurant: item,
              restaurantTitle: item.name,
            });
          }}
        >
          <View style={{ padding: 0 }}>
            <Image
              source={{ uri: item.image }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 200,
                borderRadius: 15,
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Stars
              display={item.rating}
              spacing={1}
              count={5}
              default={2.5}
              half={true}
              starSize={40}
              fullStar={<Icon size={21} name={"star"} />}
              emptyStar={<Icon size={21} name={"star-outline"} />}
            />
          </View>
          <View>
            <Text>{item.location}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <FlatList
        data={restaurants}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default RestaurantScreen;
