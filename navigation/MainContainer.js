import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import DetailScreen from "./screens/DetailScreen";
import RestaurantScreen from "./screens/RestaurantScreen";

const Stack = createStackNavigator();

// Stack Navigator provides a way for your app to transition between screens where each new screen is placed on top of a stack.

const MainContainer = () => {
  return (
    <Stack.Navigator initialRouteName={"Dornbirn"}>
      <Stack.Screen name="Dornbirn" component={HomeScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen
        name="RestaurantScreen"
        component={RestaurantScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

export default MainContainer;
