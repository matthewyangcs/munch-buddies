import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { Images, DATA } from "../assets/Images";
import Backbutton from "../components/Backbutton";
import { TouchableHighlight } from "react-native-gesture-handler";

/**
 * FlatList Item component
 * Renders icon of food on left, name of food as title with food subtext underneath on right
 * onPress selects food to be added to inventory, darkening the background color of the item
 */
const Item = ({ id, name, description, nutrients, onPress, selected }) => {
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
          <View style={styles.nutrientsWrapper}>
            {nutrients.map((nutrient, id) => {
              return (
                <Text style={styles.nutrients} key={id}>
                  {nutrient + " "}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const FoodScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [selectedData, setSelectedData] = useState(new Set());
  const [selectedArray, setSelectedArray] = useState(new Array(6).fill(false));

  useEffect(() => {
    setLoading(true);
    getFruits();
    setLoading(false);
  }, []);

  const getFruits = async () => {
    const res = await fetch("http://localhost:8000/food/");
    const res_json = await res.json();

    // convert object to array
    const data = [];
    let i = 0;
    for (const [key, value] of Object.entries(res_json)) {
      data.push({
        id: i,
        name: key,
        description: value.description,
        nutrients: value.nutrients,
      });
      i++;
    }

    setFilteredDataSource(data);
  };

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      name={item.name}
      description={item.description}
      nutrients={item.nutrients}
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
    const map = {};
    Array.from(selectedData).map((name) => (map[name] = 1));
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
      <Text style={styles.screenTitle}>SCREEN TITLE HERE</Text>

      <TextInput
        style={styles.searchbar}
        label="Search"
        value={search}
        onChangeText={(text) => searchFilterFunction(text)}
        theme={{ roundness: 10 }}
      />
      <FlatList
        data={filteredDataSource}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableHighlight
        style={styles.submit}
        underlayColor="#6cae75"
        onPress={onSubmit}
      >
        <Text style={{ fontSize: 20 }}>Submit</Text>
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
  screenTitle: {
    fontSize: 30,
    margin: 20,
    marginTop: 100,
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
  nutrientsWrapper: {
    flexDirection: "row",
  },
  nutrients: {
    fontSize: 10,
  },
  searchbar: {
    height: 50,
    width: "75%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#8bbd8b",
    borderRadius: 10,
    marginBottom: 10,
  },
  submit: {
    justifyContent: "center",
    backgroundColor: "#6cae75",
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
});
