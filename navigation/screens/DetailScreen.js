import * as React from "react";
import { View, Text} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Image,
  StyleSheet
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Chip } from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Stars from 'react-native-stars';
import { Feather } from '@expo/vector-icons'; 

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
  "Tag" : ["vegetarian","take-out", "wtf", "lmao"],
  "OpeningHours": [
    "Monday\t\t\t\t11:00-00:00",
    "Tuesday\t\t\t11:00-00:00",
    "Wednesday\t\t\t11:00-00:00",
    "Thursday\t\t\t11:00-00:00",
    "Friday\t\t\t\t11:00-00:00",
    "Saturday\t\t\t10:00-00:00",
    "Sunday\t\t\t\tClosed"
  ],
};

const ChipList = () => {
  const items = mineRestaurant.Tag;

  return ( 
  <View style = {{flex:1}}>
      {
      items.map((item, index) => {
        return (
          <View style={{ margin: 5, flexWrap: 'wrap',}}>
            <Chip
              key={index}
              mode="outlined" // changing display mode, default is flat.
              height={30} // give desirable height to chip
              textStyle={{ color:'black',fontSize: 15 }} // label properties
              style={{ backgroundColor: "gray" }} // display diff color BG
              onPress={() => console.log('Clicked Chip'+ item)}>
              {item}
            </Chip>
          </View>)
    })}
  </View>)
}

const ChipListInfo = () => {
  return (
    <View style={{ width:"100%"}}>
      <ChipList></ChipList>
    </View>
  )
}

const NameAdressStarComponent = ({ name, location, rating }) => {

  // const { name, location, rating} = props;

  return (
  <View style={{marginBottom: 10, marginTop: 10, flexDirection: "row",}}>
    <View style={{width: "70%"}}>
      <Text style={styles.nameText}>
        {name}
      </Text>
      <Text style={styles.addressText}>
        {location}
      </Text>
    </View>
    <View style={{width: "30%", alignItems: "flex-end", marginTop: 2, paddingRight: 10}}>
      <View style={{flexDirection: "row"}}>
        <Stars
          display={rating}
          spacing={1}
          count={5}
          default={2.5}
          half={true}
          starSize={40}
          fullStar= {<Icon size={21} name={"star"}/>}
          emptyStar= {<Icon size={21} name={"star-outline"}/>}/>
      </View>
      <View style={{ marginTop: 6}}>
        <Ionicons name="heart-outline" size={40}/>
      </View>
    </View>
  </View>
  )
};

const MainDetailComponent = ( data ) => {

  const { name, location, rating, image } = data;

  return (
    <View>
      <Image style={styles.imageStyle}
        source={{uri: image}}>
      </Image>
      <NameAdressStarComponent name={name} location={location} rating={rating}/>
    </View>
  );
}

const TextComponent = () => {
  return(
   <View style={styles.descriptionBox}>
    <Text style={styles.descriptionText}>
      {mineRestaurant["description"]}
    </Text>
  </View>
  );
};

const OpeningTextComponent = () => {
  const items = mineRestaurant.OpeningHours;

  return (
    <View style={styles.descriptionBox}>
      {
      items.map((item, index) => {
        return (
          <View style={{ margin: 5, flexWrap: 'wrap',}}>
            <Text style={styles.descriptionText}>
              {item}
            </Text>
          </View>)
    })}
    </View>
  )
}

const DetailScreen = ({ route, navigation }) => {

  const { itemId, restaurant } = route.params;

  return (
    <ScrollView>
      <MainDetailComponent 
          image={restaurant.image} 
          name={restaurant.name} 
          location={restaurant.location} 
          rating={restaurant.rating}/>
      <ChipListInfo></ChipListInfo>
      <TextComponent></TextComponent>
      <Text style={{ fontSize: 25, margin: 10 }}>Opening Hours</Text>
      <OpeningTextComponent></OpeningTextComponent>
      <Text style={{ fontSize: 25, margin: 10 }}>Contact</Text>
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
    <View style={styles.contactContainer}>
      <View style={styles.contactIconContainer}>
        <AntDesign style={styles.contactIcon} name="mobile1" size={24} color="black" />
      </View>
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactItemHeadline}>Mobile</Text>
        <Text style={styles.contactItemContent}>{mineRestaurant["phone number"]}</Text>
      </View>
      <View style={styles.contactButtonContainer}>
        <MaterialCommunityIcons.Button style={styles.contactButton}>Call</MaterialCommunityIcons.Button >
      </View>
    </View>
  )
}

const WebsiteContactInfo = ({}) => {
  return (
    <View style={styles.contactContainer}>
      <View style={styles.contactIconContainer}>
        <MaterialCommunityIcons  style={styles.contactIcon} name="web" size={24}></MaterialCommunityIcons>
      </View>
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactItemHeadline}>Website</Text>
        <Text style={styles.contactItemContent}>{mineRestaurant["website"]}</Text>
      </View>
      <View style={styles.contactButtonContainer}>
      <MaterialCommunityIcons.Button style={styles.contactButton}>Browse</MaterialCommunityIcons.Button>
      </View>
    </View>
  )
}

const MailContactInfo = ({}) => {
  return (
    <View style={styles.contactContainer}>
      <View style={styles.contactIconContainer}>
        <Feather style={styles.contactIcon} name="mail" size={24} color="black" />
      </View>
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactItemHeadline}>Mail</Text>
        <Text style={styles.contactItemContent}>email@email.com</Text>
      </View>
      <View style={styles.contactButtonContainer}>
        <MaterialCommunityIcons.Button style={styles.contactButton}>Message</MaterialCommunityIcons.Button>
      </View>
    </View>
  )
}


//create our styling code:
const styles = StyleSheet.create({
  contactContainer:{
    flexDirection: "row",
    marginRight: 15,
  },
  contactItemHeadline: {
    marginLeft: 10,
    fontSize: 20,
    marginBottom: 5,
  },
  contactItemContent: {
    marginLeft: 10,
    fontSize: 14,
    marginBottom: 5,
  },
  contactIcon: {
    padding: 10,
    color: "gray",
  },
  contactInfoContainer: { 
    width: "60%", 
    paddingBottom: 15,
  },
  contactIconContainer: { 
    alignItems: 'center', 
    width: "15%", 
  },
  contactButtonContainer: {
    width: "25%",
    marginTop: 8,
    padding: 6,
  },
  contactButton: {
    justifyContent: 'center',
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    backgroundColor: "gray",
  },
  imageStyle:{
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 24,
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
  },
  descriptionText: {
    fontSize: 15,
    marginLeft: 7,
    marginRight:7,
    marginBottom: 5,
  },


});

export default DetailScreen;

