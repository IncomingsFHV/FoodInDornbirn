import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import COLORS from "../../consts/colors";
import { View, Text } from "react-native-ui-lib";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  const [offer, setOffer] = useState([
    { name: "Breakfast", id: "1" },
    { name: "Lunch", id: "2" },
    { name: "Dinner", id: "3" },
    { name: "Pastry", id: "4" },
    { name: "Coffee", id: "5" },
    { name: "Drinks", id: "6" },
  ]);

  const pressHandler = (id) => {
    console.log(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />
      <ImageBackground
      imageStyle={{borderRadius: 15}}
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
          <TouchableOpacity onPress={() => pressHandler(item.id)}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
  item: {
    marginTop: 24,
    borderRadius: 15,
    padding: 30,
    backgroundColor: "pink",
    fontSize: 15,
    marginHorizontal: 10,
    marginTop: 24,
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
    opacity: .7,
    fontFamily: 'sans-serif',
    fontWeight: "bold",
  },
});

export default HomeScreen;
