import * as React from "react";
import { View, Text } from 'react-native-ui-lib';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const restaurant = {
  "id": "8",
  "name": "Rotes Haus",
  "type": "restaurant",
  "rating": 4,
  "categories": [2,3,6],
  "description": "Das Rote Haus ist das Wahrzeichen der österreichischen Stadt Dornbirn. Am Dornbirner Marktplatz neben der Stadtpfarrkirche St. Martin stehend, wurde das hölzerne, im Stil eines Rheintalhauses gebaute Gebäude im Jahr 1639 errichtet und zählt heute zu den Sehenswürdigkeiten der Stadt.",
  "image": "/roteshaus.jpg",
  "website": "https://roteshaus.at/restaurant/",
  "phone number": "+43 5572 31555",
  "location": "Marktpl. 13, 6850 Dornbirn, Österreich",
  "coordinates": "47.41343193010803, 9.742170545185651",
  "OpeningHours": {
    "Monday": "11:30–14:00\n17:30–00:00",
    "Tuesday": "11:30–14:00\n17:30–00:00",
    "Wednesday": "11:30–14:00\n17:30–00:00",
    "Thursday": "11:30–14:00\n17:30–00:00",
    "Friday": "11:30–14:00\n17:30–00:00",
    "Saturday": "11:30–14:00\n17:30–00:00",
    "Sunday": "11:30–14:00\n17:30–00:00"
  }
};


const DetailScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Home")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Detail Screen Learning Git
      </Text>
      <MobileContactInfo></MobileContactInfo>
      <WebsiteContactInfo></WebsiteContactInfo>
      <MailContactInfo></MailContactInfo>
    </View>
  );
};

const MobileContactInfo = ({}) => {
  return (
    <View style={{ flexDirection: "row"}}>
      <View style={{ alignItems: 'center', width: "15%", backgroundColor: "green"}}>
        <Text>aa</Text>
      </View>
      <View style={{ width: "60%", backgroundColor: "red"}}>
        <Text style={{ marginLeft: 20,}}>Mobile</Text>
        <Text style={{ marginLeft: 20,}}>{restaurant["phone number"]}</Text>
      </View>
      <View style={{ width: "25%"}}>
        <MaterialCommunityIcons.Button>cc</MaterialCommunityIcons.Button >
      </View>
    </View>
  )
}

const WebsiteContactInfo = ({}) => {
  return (
    <View style={{ flexDirection: "row"}}>
      <View style={{ alignItems: 'center', width: "15%", backgroundColor: "green"}}>
        <Text>aa</Text>
      </View>
      <View style={{ width: "60%", backgroundColor: "red"}}>
        <Text style={{ marginLeft: 20,}}>Website</Text>
        <Text style={{ marginLeft: 20,}}>{restaurant["phone number"]}</Text>
      </View>
      <View style={{ width: "25%", backgroundColor: "black"}}>
        <Text>cc</Text>
      </View>
    </View>
  )
}

const MailContactInfo = ({}) => {
  return (
    <View style={{ flexDirection: "row"}}>
      <View style={{ alignItems: 'center', width: "15%", backgroundColor: "green"}}>
        <Text>aa</Text>
      </View>
      <View style={{ width: "60%", backgroundColor: "red"}}>
        <Text style={{ marginLeft: 20,}}>Mail</Text>
        <Text style={{ marginLeft: 20,}}>email@email.com</Text>
      </View>
      <View style={{ width: "25%", backgroundColor: "black"}}>
        <Text>cc</Text>
      </View>
    </View>
  )
}

export default DetailScreen;
