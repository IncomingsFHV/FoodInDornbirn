import * as React from "react";
import { View, Text } from 'react-native-ui-lib';
import {
  Image,
  SafeAreaView,
  StyleSheet
} from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { back } from "react-native/Libraries/Animated/Easing";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const mineRestaurant = {
  "id": "5",
  "name": "Bierlokal",
  "type": "restaurant",
  "rating": 4,
  "categories": [2,3,6],
  "description": "Das Bierlokal liegt im Zentrum von Dornbirn am Eingang zur Fußgängerzone.\n\nHier können Sie auf zwei Etagen genießen.\n\nDas Erdgeschoß lädt zu einem gemütlichen Hock mit Freunden und Kollegen ein. Genießen sie eines der feinen Bierspezialitäten vom Faß oder aus der Flasche. Auch für ein gepflegtes Achtele haben wir immer eine feine Auswahl.\n\nIm ersten Stock in unserem schönen Restaurant können Sie zu Zweit, mit der Familie oder der Firma schöne Stunden verbringen. Genießen Sie die saisonale Auswahl unserer\nSpeisen.\n\nDas Gasthaus Bierlokal ist das Lokal für Jederman zu jeder Zeit.\n\nDie Wirtin Christine Bertsch freut sich auf Euch!",
  "image": "bierlokal.jpg",
  "website": "http://www.bierlokal.at/",
  "phone number": "+43 5572 538500",
  "location": "Marktstraße 12, 6850 Dornbirn, Österreich",
  "coordinates": "47.412534384879606, 9.74254468557075",
  "OpeningHours": {
    "Monday": "11:00-00:00",
    "Tuesday": "11:00-00:00",
    "Wednesday": "11:00-00:00",
    "Thursday": "11:00-00:00",
    "Friday": "11:00-00:00",
    "Saturday": "10:00-00:00",
    "Sunday": "Closed"
  }
};

const RenderScreen = () => {
  return (
    <View>
      <Image style={styles.imageStyle}
        //source={mineRestaurant["image"]}
        source={require('../../backend/images/bierlokal.jpg')}>
      </Image>

      <View>
        <Text style={styles.nameText}>
          {mineRestaurant["name"]}
        </Text>
      
        <Text style={styles.addressText}>
          {mineRestaurant["location"]}
        </Text>
      </View>
    </View>
  );
}

/*
const DetailScreen = ({ navigation }) => {
  return(
    <ScrollView>
      {renderScreen()}
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>
          {mineRestaurant["description"]}
        </Text>
      </View>

      
    </ScrollView>
  );
};
  */
const DetailScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <RenderScreen></RenderScreen>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <MobileContactInfo></MobileContactInfo>
        <WebsiteContactInfo></WebsiteContactInfo>
        <MailContactInfo></MailContactInfo>
      </View>
    </ScrollView>
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
        <Text style={{ marginLeft: 20,}}>{mineRestaurant["phone number"]}</Text>
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
        <Text style={{ marginLeft: 20,}}>{mineRestaurant["phone number"]}</Text>
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


//create our styling code:
const styles = StyleSheet.create({
  topBar:{
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  backButton:{
    height: 50,
    width: 50,
    backgroundColor: "#FFFFFF",
  },
  shareButton:{
    height: 50,
    width: 50,
    backgroundColor: "#FFFFFF",
    marginLeft: 255,
  },
  imageStyle:{
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 7,
    marginRight: 7
  },
  addressText: {
    zIndex: 1,
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 7
  },
  descriptionBox: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3,
    marginBottom: 3,
    borderColor: "#DA948D",
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: "#FFD9D9"
    
  },
  descriptionText: {
    fontSize: 15,
    marginLeft: 7,
    marginRight:7,
    marginBottom: 5,
  },


});

export default DetailScreen;

