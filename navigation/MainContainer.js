import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import FavoritScreen from "./screens/FavoritScreen";
import MapScreen from "./screens/MapScreen";
import DetailScreen from "./screens/DetailScreen";
import RestaurantScreen from "./screens/RestaurantScreen";

const Stack = createStackNavigator();

const MainContainer = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Dorbnirn"}
    >
      <Stack.Screen name="Dorbnirn" component={HomeScreen} />
      <Stack.Screen name="FavoritScreen" component={FavoritScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default MainContainer;
