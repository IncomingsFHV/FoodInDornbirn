import * as React from "react";
import { View, Text } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image, StyleSheet, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Stars from "react-native-stars";
import { Feather } from "@expo/vector-icons";

// Detail screen with navigation and parameters for tab name

const DetailScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  navigation.setOptions({ title: route.params.restaurantTitle });

  // Name address view with location and rating

  const NameAdressStarComponent = ({ name, location, rating }) => {
    return (
      <View style={{ marginBottom: 10, marginTop: 10, flexDirection: "row" }}>
        <View style={{ width: "70%" }}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.addressText}>{location}</Text>
        </View>
        <View
          style={{
            width: "30%",
            alignItems: "flex-end",
            marginTop: 2,
            paddingRight: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Stars
              display={rating}
              spacing={1}
              count={5}
              default={2.5}
              half={true}
              starSize={40}
              fullStar={<Icon size={21} name={"star"} />}
              emptyStar={<Icon size={21} name={"star-outline"} />}
            />
          </View>
        </View>
      </View>
    );
  };

  // Main detail view for name, location, rating and image

  const MainDetailComponent = ({ name, location, rating, image }) => {
    return (
      <View>
        <Image style={styles.imageStyle} source={{ uri: image }}></Image>
        <NameAdressStarComponent
          name={name}
          location={location}
          rating={rating}
        />
      </View>
    );
  };

  // Description components

  const Description = () => {
    return (
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>{restaurant.description}</Text>
      </View>
    );
  };

  // Opening component 

  const OpeningTextComponent = () => {
    return (
      <View
        style={{
          marginLeft: 5,
          marginRight: 5,
          marginTop: 3,
          marginBottom: 3,
          margin: 5,
          flexWrap: "wrap",
        }}
      >
        <Text style={styles.descriptionText}>
          Monday: {restaurant.OpeningHours.Monday}
        </Text>
        <Text style={styles.descriptionText}>
          Tuesday: {restaurant.OpeningHours.Tuesday}
        </Text>
        <Text style={styles.descriptionText}>
          Wednesday: {restaurant.OpeningHours.Wednesday}
        </Text>
        <Text style={styles.descriptionText}>
          Thursday: {restaurant.OpeningHours.Thursday}
        </Text>
        <Text style={styles.descriptionText}>
          Friday: {restaurant.OpeningHours.Friday}
        </Text>
        <Text style={styles.descriptionText}>
          Saturday: {restaurant.OpeningHours.Saturday}
        </Text>
        <Text style={styles.descriptionText}>
          Sunday: {restaurant.OpeningHours.Sunday}
        </Text>
      </View>
    );
  };

  // Chip list with Tags for restaurants 

  const ChipList = () => {
    return (
      <View style={{ flex: 1, margin: 5, flexWrap: "wrap" }}>
        <Chip
          //key={index}
          mode="outlined"
          height={30}
          textStyle={{ color: "black", fontSize: 15 }}
          style={{ backgroundColor: "gray" }}
        >
          {restaurant.Tag}
        </Chip>
      </View>
    );
  };

  const ChipListInfo = () => {
    return (
      <View style={{ width: "100%" }}>
        <ChipList></ChipList>
      </View>
    );
  };

  // Mobile button with link to the calling app

  const MobileContactInfo = ({}) => {
    return (
      <View style={styles.contactContainer}>
        <View style={styles.contactIconContainer}>
          <AntDesign
            style={styles.contactIcon}
            name="mobile1"
            size={24}
            color="black"
          />
        </View>
        <View style={styles.contactInfoContainer}>
          <Text style={styles.contactItemHeadline}>Mobile</Text>
          <Text style={styles.contactItemContent}>
            {restaurant.phoneNumber}
          </Text>
        </View>
        <View style={styles.contactButtonContainer}>
          <MaterialCommunityIcons.Button
            onPress={() => {
              Linking.openURL("tel:" + restaurant.phoneNumber);
            }}
            style={styles.contactButton}
          >
            Call
          </MaterialCommunityIcons.Button>
        </View>
      </View>
    );
  };

  // Website button with link to the browser

  const WebsiteContactInfo = ({}) => {
    return (
      <View style={styles.contactContainer}>
        <View style={styles.contactIconContainer}>
          <MaterialCommunityIcons
            style={styles.contactIcon}
            name="web"
            size={24}
          ></MaterialCommunityIcons>
        </View>
        <View style={styles.contactInfoContainer}>
          <Text style={styles.contactItemHeadline}>Website</Text>
          <Text style={styles.contactItemContent}>{restaurant.website}</Text>
        </View>
        <View style={styles.contactButtonContainer}>
          <MaterialCommunityIcons.Button
            onPress={() => {
              Linking.openURL(restaurant.website);
            }}
            style={styles.contactButton}
          >
            Browse
          </MaterialCommunityIcons.Button>
        </View>
      </View>
    );
  };

  // Mailing button with intent to the email app 

  const MailContactInfo = ({}) => {
    return (
      <View style={styles.contactContainer}>
        <View style={styles.contactIconContainer}>
          <Feather
            style={styles.contactIcon}
            name="mail"
            size={24}
            color="black"
          />
        </View>
        <View style={styles.contactInfoContainer}>
          <Text style={styles.contactItemHeadline}>Mail</Text>
          <Text style={styles.contactItemContent}>{restaurant.email}</Text>
        </View>
        <View style={styles.contactButtonContainer}>
          <MaterialCommunityIcons.Button
            onPress={() => {
              Linking.openURL(`mailto:${restaurant.email}`)
            }}
            style={styles.contactButton}
          >
            Message
          </MaterialCommunityIcons.Button>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <MainDetailComponent
        image={restaurant.image}
        name={restaurant.name}
        location={restaurant.location}
        rating={restaurant.rating}
      />
      <ChipListInfo></ChipListInfo>
      <Description></Description>
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

const styles = StyleSheet.create({
  contactContainer: {
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
    alignItems: "center",
    width: "15%",
  },
  contactButtonContainer: {
    width: "25%",
    marginTop: 8,
    padding: 6,
  },
  contactButton: {
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    backgroundColor: "gray",
  },
  imageStyle: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 7,
    marginRight: 7,
  },
  addressText: {
    zIndex: 1,
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 7,
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
    marginRight: 7,
    marginBottom: 5,
  },
});

export default DetailScreen;
