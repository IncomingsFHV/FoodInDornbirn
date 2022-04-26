import * as React from "react";
import MainContainer from "./navigation/MainContainer";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./navigation/screens/HomeScreen";
import FavoritScreen from "./navigation/screens/FavoritScreen";
import MapScreen from "./navigation/screens/MapScreen";
import DetailScreen from "./navigation/screens/DetailScreen";
import RestaurantScreen from "./navigation/screens/RestaurantScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"HomeScreen"}
        screenOption={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={ MainContainer } />
        <Stack.Screen name="FavoritScreen" component={ FavoritScreen } />
        <Stack.Screen name="MapScreen" component={ MapScreen } />
        <Stack.Screen name="RestaurantScreen" component={ RestaurantScreen }/>
        <Stack.Screen name="DetailScreen" component={ DetailScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
