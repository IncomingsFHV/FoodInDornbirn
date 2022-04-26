import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import COLORS from "../../consts/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "react-native-ui-lib";

const RestaurantScreen = ({ navigation, route }) => {
  const [restaurants, setRestaurants] = React.useState(null);

  React.useEffect(() => {
    let { restaurants } = route.params;

    setRestaurants(restaurants);
  });

  function renderRestaurantList() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ paddingBottom: 20 }}
          onPress={() => 
            navigation.navigate("DetailScreen", {
              item,
            })
          }
        >
          <View style={{ padding: 0 }}>
            <Image
              source={require("../../backend/images/7er-bar.jpg")}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 200,
                borderRadius: 15,
              }}
            />
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{ fontSize: 18, fontWeight: "bold"}}>
              {item.name}
            </Text>
              <MaterialCommunityIcons
                name="star"
                size={20}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold"}}>
                  {item.rating}
                </Text>
              </MaterialCommunityIcons>
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
