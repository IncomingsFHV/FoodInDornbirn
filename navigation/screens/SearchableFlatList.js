import React, { Component } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { MaterialCommunityIcons } from "@expo/vector-icons";


// renders the list of restaurants in the search view, available from the map component

class FlatListRestaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: props.searchableList,
      error: null,
    };


    this.arrayholder = props.searchableList;
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: "#dfe5ec",
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toString().toUpperCase()} ${item.location.toUpperCase()} ${item.type.toUpperCase()}  
              ${item.categories.forEach(function(category){
                return category.toString().toUpperCase();
              })}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderSearch = () => {
    return (
      <View style={{display: "flex", flexDirection: "row",justifyContent: 'center', width: "100%"}}>
        <View style={{
              justifyContent: "center",
              alignItems: "center",
              width: "22%",
            }}>
          <MaterialCommunityIcons.Button
            onPress={() => this.props.hideModal()}
            iconStyle={{ width: "16%" }}
            backgroundColor="#DA948D"
            style={{height: 66, alignItems: "center", paddingRight: 20}}
          >
            <Text>CLOSE</Text>
          </MaterialCommunityIcons.Button>
        </View>
        <View style={{width: "80%"}}>
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
        </View>
      </View>
    );
  };

  render() {

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            return <MyItem item={item} hideModal={this.props.hideModal} selectRestaurant={this.props.selectRestaurant}></MyItem>
          }}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderSearch}
          style={{marginTop: 30}}
        />
      </View>
    );
  }
}

// represents one row in the search list of restaurants

const MyItem = ({ item, hideModal, selectRestaurant }) => {
  return (<TouchableOpacity
    style={{ paddingBottom: 4, paddingLeft: 10, paddingTop: 10, paddingBottom: 10}}
    onPress={() => {
      hideModal();
      selectRestaurant(item);
    }}
  >
    <View style={{flexDirection: "row"}}>
      <View>
        <Image
          source={{ uri: item.image }}
          resizeMode="cover"
          style={{
            width: 50,
            height: 50,
            borderRadius: 15,
          }}
        />
      </View>
      <View style={{paddingLeft: 15}}>
        <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 2}}>
          {item.name}
        </Text>
        <Text>{item.location}</Text>
      </View>
    </View>
  </TouchableOpacity>
  );
};

export default FlatListRestaurant ;