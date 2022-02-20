import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { Images, DATA } from "../assets/Images";
import Backbutton from "../components/Backbutton";

/**
 * FlatList Item component
 * Renders icon of food on left, name of food as title with food subtext underneath on right
 * onPress selects food to be added to inventory, darkening the background color of the item
 */
const Item = ({
  id,
  name,
  description,
  nutrients,
  onPress,
  selected,
  count,
  onDecr,
}) => {
  return (
    <TouchableHighlight
      style={[styles.item, selected && { backgroundColor: "#6cae75" }]}
      underlayColor="#6cae75"
      onPress={() => onPress(name, id)}
    >
      <View style={styles.itemWrapper}>
        {selected && (
          <View style={styles.counter}>
            <Text style={styles.counterText}>{count}</Text>
          </View>
        )}
        {selected && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.minus}
            onPress={(e) => onDecr(e, name, id)}
          >
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
        )}
        <View style={styles.iconWrapper}>
          <Image style={styles.icon} source={Images.foods[name]} />
        </View>

        <View>
          <Text style={styles.title}>{name.replace("_", " ")}</Text>
          <Text style={styles.subtext}>{description}</Text>
          <View style={styles.nutrientsWrapper}>
            <Text style={styles.nutrients}>
              {nutrients.map((nutrient, id) => {
                let output = "";
                if (id !== nutrients.length - 1) {
                  output += nutrient + ", ";
                } else {
                  output += nutrient;
                }
                return output;
              })}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const FoodScreen = ({ route }) => {
  const { username } = route.params;
  const navigation = useNavigation();

  const [masterData, setMasterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [selectedData, setSelectedData] = useState(new Map());
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
    setMasterData(data);

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
      count={selectedData[item.name]}
      onDecr={onDecr}
    />
  );

  const onPress = (name, id) => {
    if (selectedArray[id]) {
      setSelectedData({ ...selectedData, [name]: selectedData[name] + 1 });
    } else {
      selectedData[name] = 1;
      setSelectedData({ ...selectedData });
    }
    selectedArray[id] = true;
    setSelectedArray([...selectedArray]);
  };

  const onDecr = (e, name, id) => {
    e.stopPropagation();
    if (selectedData[name] === 1) {
      selectedArray[id] = false;
    }

    setSelectedData({ ...selectedData, [name]: selectedData[name] - 1 });
    setSelectedArray([...selectedArray]);
  };

  const onSubmit = async () => {
    const body = { food_counts: selectedData };

    await fetch("http://localhost:8000/inventory/add/multiple/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    setSelectedArray(new Array(6).fill(false));
    setSelectedData(new Set());

    navigation.navigate("FeedScreen");
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = filteredDataSource.filter(function (item) {
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
      setFilteredDataSource(masterData);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Hi {username}, let's munch!</Text>

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
    justifyContent: "center",
    fontSize: 30,
    margin: 20,
    marginTop: 100,
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
    width: "80%",
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
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
    width: 200,
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
    marginBottom: 30,
  },
  counter: {
    width: 25,
    height: 25,
    backgroundColor: "#36633c",
    borderRadius: 13,
    justifyContent: "center",
    position: "absolute",
    left: -15,
    top: -15,
  },
  minus: {
    width: 25,
    height: 25,
    backgroundColor: "#b30000",
    borderRadius: 13,
    justifyContent: "center",
    position: "absolute",
    right: -70,
    top: -15,
    zIndex: 999,
  },
  counterText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
