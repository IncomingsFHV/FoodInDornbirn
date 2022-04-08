import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import COLORS from "../../consts/colors";
import { View, Text } from "react-native-ui-lib";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [offer, setOffer] = useState([
    { name: "Breakfast", id: "1", logo: "food-variant" },
    { name: "Lunch", id: "2", logo: "food" },
    { name: "Dinner", id: "3", logo: "food-drumstick" },
    { name: "Pastry", id: "4", logo: "food-croissant" },
    { name: "Coffee", id: "5", logo: "coffee" },
    { name: "Drinks", id: "6", logo: "glass-cocktail" },
  ]);

  const pressHandler = (id) => {
    console.log(id);
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <FlatList
        numColumns={3}
        data={offer}
        renderItem={({ item }) => (
          <View style={{ padding: 5 }}>
            <MaterialCommunityIcons.Button
              style={styles.offerButton}
              onPress={() => pressHandler(item.id)}
              size={40}
              iconStyle={{marginLeft: 10, opacity: 0.6}}
              borderRadius={15}
              name={item.logo}
              backgroundColor="#DA948D"
            >
              <Text style={{ color: "white" }}>{item.name}</Text>
            </MaterialCommunityIcons.Button>
          </View>
        )}
      />
      <View style={{justifyContent: "center"}}><Text style={styles.title}>Recently viewed</Text></View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
  offerButton: {
    height: 70,
    width: 100,
    flexDirection: "column",
    alignContent: "space-around",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  coverImage: {
    height: 220,
    width: "100%",
    borderRadius: 15,
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlignVertical: "top"
  },
});

export default HomeScreen;
