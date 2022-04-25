import * as React from "react";
import { View, Text } from 'react-native-ui-lib';

const DetailScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Home")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Detail Screen
      </Text>
    </View>
  );
};

export default DetailScreen;
