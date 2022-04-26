import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import COLORS from "../../consts/colors";
import { View, Text } from "react-native-ui-lib";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Restaurant from "../../backend/data/resturante.json";
import Bar from "../../backend/data/bar.json";
import Bakery from "../../backend/data/bakery.json";

const HomeScreen = ({ navigation }) => {
  const offerCategory = [
    { name: "Breakfast", id: 1, logo: "food-variant" },
    { name: "Lunch", id: 2, logo: "food" },
    { name: "Dinner", id: 3, logo: "food-drumstick" },
    { name: "Pastry", id: 4, logo: "food-croissant" },
    { name: "Coffee", id: 5, logo: "coffee" },
    { name: "Drinks", id: 6, logo: "glass-cocktail" },
  ];

  const restaurantData = [...Restaurant, ...Bar, ...Bakery];

  const [categories, setCategories] = useState(offerCategory);
  const [popular, setPopular] = useState(restaurantData);
  const [restaurants, setRestaurants] = useState(restaurantData);

  const onSelectCategory = (item) => {
    //filter restaurant
    let restaurantList = restaurantData.filter((a) =>
      a.categories.includes(item.id)
    );
    setRestaurants(restaurantList);
    navigation.navigate("RestaurantScreen", {
      restaurants,
    });
  };

  const renderHeader = () => {
    return (
      <View>
        <StatusBar translucent backgroundColor={COLORS.tranparent} />
        <ImageBackground
          imageStyle={{ borderRadius: 15 }}
          source={require("../../assets/DorbnirnOnboardingScreen.jpg")}
          style={styles.coverImage}
        >
          <View style={styles.textView}>
            <Text style={styles.imageText}>Food In Dornbirn</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderMainCategories = () => {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={() => onSelectCategory(item)}
      >
        <MaterialCommunityIcons.Button
          style={{
            height: 70,
            width: 104,
            flexDirection: "column",
            alignContent: "space-around",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
          onPress={() => onSelectCategory(item)}
          size={40}
          iconStyle={{ marginLeft: 10, opacity: 0.6 }}
          borderRadius={15}
          name={item.logo}
          backgroundColor="#DA948D"
        >
          <Text style={{ color: "white" }}>{item.name}</Text>
        </MaterialCommunityIcons.Button>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={categories}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingVertical: 10,
          paddingLeft: 5,
        }}
      />
    );
  };

  const renderRestaurantList = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ marginEnd: 10 }}
          onPress={() =>
            navigation.navigate("DetailScreen", {
              item,
            })
          }
        >
          <View style={{ padding: 0 }}>
            <Image
              // source={require('../../backend/images' + item.image)}
              resizeMode="cover"
              style={{
                width: 250,
                height: 150,
                borderRadius: 15,
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: 40,
              width: 100,
              backgroundColor: COLORS.white,
              borderTopRightRadius: 15,
              borderBottomLeftRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <MaterialCommunityIcons name="star">
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {item.rating}
              </Text>
            </MaterialCommunityIcons>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ paddingLeft: 10 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlignVertical: "top",
            paddingBottom: 10,
          }}
        >
          Popular
        </Text>
        <FlatList
          data={popular.sort((a, b) => (+a.rating > +b.rating ? -1 : 1))}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: 2,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderHeader()}
        {renderMainCategories()}
        {renderRestaurantList()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  coverImage: {
    height: 220,
    width: "100%",
    borderRadius: 15,
    padding: 10,
    marginLeft: 10,
  },
  textView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageText: {
    fontSize: 27,
    color: "white",
    backgroundColor: "grey",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    opacity: 0.7,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
});

export default HomeScreen;
