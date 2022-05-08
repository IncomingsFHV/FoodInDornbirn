import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainContainer from "./navigation/MainContainer";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screen
import MapScreen from "./navigation/screens/MapScreen";

// Screen names
const homeName = "Home";
const mapName = "Map";

// Tab navigation is working for bottom tab navigation
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === mapName) {
              iconName = focused ? "map" : "map-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#DA948D",
          tabBarInactiveTintColor: "grey",
          tabBarStyle: {
            padding: 5,
            height: 55,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            paddingBottom: 10,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name={homeName} component={MainContainer} />
        <Tab.Screen name={mapName} component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
