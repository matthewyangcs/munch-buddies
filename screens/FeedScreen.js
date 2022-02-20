import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Images } from "../assets/Images";
import { ProgressBar, Card } from "react-native-paper";
import Backbutton from "../components/Backbutton";
import { Ionicons } from "@expo/vector-icons";
import Heart from "../components/animated_overlays/Heart";
import useShowOnClick from "../components/animated_overlays/useHeartAnimation";
import { useNavigation } from "@react-navigation/native";

const AnimalBar = ({ animals, focus, setFocus }) => {
  return (
    <View style={styles.animalBar}>
      {animals.map((animal, idx) => {
        if (idx === focus) {
          return (
            <Image
              key={idx}
              source={
                Images.animals[
                  `${animal.id.toLowerCase()}${Math.min(2, animal.level)}`
                ]
              }
              style={[styles.animalBarImg, styles.animalBarFocus]}
            />
          );
        }
        return (
          <Image
            key={idx}
            source={
              Images.animals[
                `${animal.id.toLowerCase()}${Math.min(2, animal.level)}`
              ]
            }
            style={styles.animalBarImg}
          />
        );
      })}
    </View>
  );
};

const Stat = ({ label, value, color, last = false, progress, levelUpReq }) => {
  return (
    <View style={[styles.animalStats, !last && { marginBottom: 16 }]}>
      <ProgressBar progress={value} color={color} style={{ marginBottom: 8 }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{label}</Text>
        <Text>{`${progress}/${levelUpReq}`}</Text>
      </View>
    </View>
  );
};

const FeedScreen = () => {
  const [animals, setAnimals] = useState([]);
  const [animalFocus, setAnimalFocus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const { show, onClick } = useShowOnClick(2200);
  const navigation = useNavigation();

  const fetchAnimals = async () => {
    const res = await fetch("http://localhost:8000/animal/all/");
    const res_json = await res.json();
    setAnimals(Object.values(res_json));
  };

  const fetchInventory = async () => {
    const res = await fetch("http://localhost:8000/inventory/");
    const res_json = await res.json();
    setLoading(false);
    let res_arr = [];
    for (let i of Object.keys(res_json)) {
      res_arr.push({
        id: i,
        name: i,
        value: res_json[i],
      });
    }
    setFoods(res_arr.sort((a, b) => b.value - a.value));
  };

  useEffect(() => {
    setLoading(true);
    fetchAnimals();
    fetchInventory();
    setLoading(false);
  }, []);

  const removeFood = async (item, food_id, animal_id) => {
    const res = await fetch("http://localhost:8000/inventory/feedanimal/", {
      method: "PUT",
      body: JSON.stringify({ food_id, animal_id }),
    });
    if (res.status !== 401) {
      onClick();
      const copyFoods = [...foods];
      if (item.value === 1) {
        setFoods(copyFoods.filter((copyFood) => copyFood.id !== item.id));
      } else {
        const newFoods = copyFoods.map((copyFood) => {
          if (copyFood.id === item.id) {
            return {
              ...copyFood,
              value: copyFood.value - 1,
            };
          }
          return copyFood;
        });
        setFoods(newFoods);
      }
      fetchAnimals();
    } else {
      alert("This animal doesn't like this food!");
    }
  };

  const animalInFocus = animals[animalFocus];

  const renderItem = ({ item }) => {
    if (item.value === 0) {
      return;
    }
    return (
      <Pressable onPress={() => removeFood(item, item.name, animalInFocus.id)}>
        <View>
          <Image
            source={Images.foods[item.name.toLowerCase()]}
            style={styles.foodImg}
          />
          <View style={styles.foodImgBadge}>
            <Text style={{ color: "white", fontWeight: "500" }}>
              {item.value}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  if (!animalInFocus || loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Heart x={250} y={300} show={show} />
      <Backbutton
        customStyles={{ position: "absolute", top: 48, left: 24, zIndex: 12 }}
      />
      <Pressable
        style={styles.viewStats}
        onPress={() => navigation.navigate("StatsScreen")}
      >
        <Text style={{ fontWeight: "700" }}>View stats</Text>
      </Pressable>
      <AnimalBar
        animals={animals}
        focus={animalFocus}
        setFocus={setAnimalFocus}
      />

      {/* Navigation wrapper around animals */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          paddingHorizontal: 16,
        }}
      >
        {/* Back arrow */}
        <Pressable
          onPress={() => setAnimalFocus(animalFocus - 1)}
          disabled={animalFocus === 0}
          style={{ position: "absolute", top: 350, left: 10 }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={24}
            style={animalFocus === 0 && { color: "lightgray" }}
          />
        </Pressable>
        {/* Animal and Stats */}
        <View style={styles.animal}>
          <Image
            source={
              Images.animals[
                `${animalInFocus.id.toLowerCase()}${Math.min(
                  2,
                  animalInFocus.level
                )}`
              ]
            }
            style={{
              height: 250,
              width: 256,
              aspectRatio: 1,
            }}
          />
          <Card style={styles.stats}>
            <Card.Title
              title={animalInFocus.display_name}
              subtitle={`Level ${animalInFocus.level}`}
            />
            <Card.Content>
              <Text style={{ marginBottom: 16 }}>
                {animalInFocus.description}
              </Text>
              <Stat
                label="Experience"
                value={animalInFocus.progress / animalInFocus.level_up_req}
                progress={animalInFocus.progress}
                levelUpReq={animalInFocus.level_up_req}
                color={"#BF4011"}
                last={true}
              />
            </Card.Content>
          </Card>
        </View>
        {/* Forward arrow */}
        <Pressable
          onPress={() => setAnimalFocus(animalFocus + 1)}
          disabled={animalFocus >= animals.length - 1}
          style={{ position: "absolute", top: 350, right: 10 }}
        >
          <Ionicons
            name="arrow-forward-outline"
            size={24}
            style={animalFocus >= animals.length - 1 && { color: "lightgray" }}
          />
        </Pressable>
      </View>

      {/* Bottom Food Bar*/}
      <View style={styles.bottomFoodBar}>
        {foods.reduce((prev, curr) => prev + curr.value, 0) === 0 ? (
          <Text>Empty inventory. Add some food!</Text>
        ) : (
          <FlatList
            data={foods}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    height: "100%",
  },
  foodImg: {
    width: 48,
    height: 48,
    marginRight: 36,
    position: "relative",
    marginHorizontal: 24,
  },
  bottomFoodBar: {
    position: "absolute",
    bottom: 64,
  },
  foodImgBadge: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 999999,
    backgroundColor: "#cc614b",
    top: 4,
    right: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  animal: {
    alignItems: "center",
    marginTop: 250,
    width: "75%",
  },
  animalStats: {
    width: "100%",
  },
  stats: {
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 24,
  },
  animalBar: {
    height: 24,
    position: "absolute",
    top: 108,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 8,
  },
  animalBarImg: {
    height: 36,
    width: 36,
  },
  animalBarFocus: {
    backgroundColor: "lightgray",
    borderRadius: 8,
  },
  viewStats: {
    position: "absolute",
    top: 48,
    right: 24,
    backgroundColor: "white",
    height: 35,
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    shadowColor: "#00000099",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,
    zIndex: 8888,
  },
});
