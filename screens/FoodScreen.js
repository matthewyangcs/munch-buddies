import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { Images, DATA } from "../assets/Images";
import Backbutton from "../components/Backbutton";
import { TouchableHighlight } from "react-native-gesture-handler";

const Item = ({ id, name, description, onPress, selected }) => {
  return (
    <TouchableHighlight
      style={[styles.item, selected && { backgroundColor: "#6cae75" }]}
      underlayColor="#6cae75"
      onPress={() => onPress(name, id)}
    >
      <View style={styles.itemWrapper}>
        <View style={styles.iconWrapper}>
          <Image style={styles.icon} source={Images.foods[name]} />
        </View>

        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtext}>{description}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const FoodScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState(DATA);
  const [selectedData, setSelectedData] = useState(new Set());
  const [selectedArray, setSelectedArray] = useState(new Array(6).fill(false));

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      name={item.name}
      description={item.description}
      onPress={onPress}
      selected={selectedArray[item.id]}
    />
  );

  const onPress = (name, id) => {
    if (selectedArray[id]) {
      selectedData.delete(name);
      setSelectedData(new Set(selectedData));
      selectedArray[id] = false;
      setSelectedArray([...selectedArray]);
    } else {
      selectedData.add(name);
      setSelectedData(new Set(selectedData));
      selectedArray[id] = true;
      setSelectedArray([...selectedArray]);
    }
  };

  const onSubmit = async () => {
    const data = Array.from(selectedData);
    const map = {};

    data.map((name) => (map[name] = 1));
    const body = { food_counts: map };

    await fetch("http://localhost:8000/inventory/add/multiple/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    navigation.navigate("FeedScreen");
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = DATA.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(DATA);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.animalWrapper}>
        <Text>animal name here</Text>
        <Image
          source={Images.animals.redpanda}
          style={{ width: 128, height: 128 }}
        />
      </View>

      <TextInput
        style={styles.searchbar}
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search"
      />
      <FlatList
        data={filteredDataSource}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableHighlight
        style={styles.item}
        underlayColor="#6cae75"
        onPress={onSubmit}
      >
        <Text>Submit</Text>
      </TouchableHighlight>
      <Backbutton customStyles={{ position: "absolute", top: 48, left: 24 }} />
    </SafeAreaView>
  );
};

export default FoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  animalWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 200,
    paddingTop: 10,
    marginTop: 25,
    marginBottom: 10,
    backgroundColor: "#8bbd8b",
    borderRadius: 10,
  },
  item: {
    justifyContent: "center",
    backgroundColor: "#cfe2cf",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  itemWrapper: {
    flexDirection: "row",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    marginRight: 30,
    justifyContent: "center",
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "center",
  },
  title: {
    fontSize: 22,
  },
  subtext: {
    width: 200,
  },
  searchbar: {
    height: 50,
    width: "75%",
    marginRight: 16,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8bbd8b",
    paddingLeft: 20,
    margin: 5,
  },
});
