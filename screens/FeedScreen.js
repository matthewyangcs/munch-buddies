import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  Image,
  Pressable,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { Images, DATA as FOOD_DATA } from "../assets/Images";
import { ProgressBar, Card } from "react-native-paper";
import Backbutton from "../components/Backbutton";
import { Ionicons } from "@expo/vector-icons";
import Heart from "../components/animated_overlays/Heart";

const AnimalBar = ({ animals, focus }) => {
  return (
    <View style={styles.animalBar}>
      {animals.map((animal, idx) => {
        if (idx > 3) {
          return;
        }
        if (idx === focus) {
          return (
            <Image
              key={idx}
              source={Images.animals[animal.id.toLowerCase()]}
              style={[styles.animalBarImg, styles.animalBarFocus]}
            />
          );
        }
        return (
          <Image
            key={idx}
            source={Images.animals[animal.id.toLowerCase()]}
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
  const [foods, setFoods] = useState(FOOD_DATA);

  const fetchAnimals = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/animal/all/");
    const res_json = await res.json();
    setLoading(false);
    setAnimals(Object.values(res_json));
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          const copyFoods = [...foods];
          if (item.value === 1) {
            setFoods(copyFoods.filter((copyFood) => copyFood.id !== item.id));
          } else {
            const newFoods = copyFoods.map((copyFood) => {
              if (copyFood.id === item.id) {
                return {
                  ...copyFood,
                  value: copyFood.value - 1
                };
              }
              return copyFood;
            });
            setFoods(newFoods);
          }
        }}
      >
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

  const animalInFocus = animals[animalFocus];

  if (!animalInFocus || loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Heart x={300} y={300} loop={false} />
      <Backbutton customStyles={{ position: "absolute", top: 48, left: 24 }} />
      <AnimalBar animals={animals} focus={animalFocus} />

      {/* Navigation wrapper around animals */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 16
        }}
      >
        {/* Back arrow */}
        <Pressable
          onPress={() => setAnimalFocus(animalFocus - 1)}
          disabled={animalFocus === 0}
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
            source={Images.animals[animalInFocus.id.toLowerCase()]}
            style={{
              height: undefined,
              width: 256,
              aspectRatio: 1,
              resizeMode: "cover"
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
        <FlatList
          data={foods}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  foodImg: {
    width: 48,
    height: 48,
    marginRight: 36,
    position: "relative",
    marginHorizontal: 24
  },
  bottomFoodBar: {
    position: "absolute",
    bottom: 64
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
    alignItems: "center"
  },
  animal: {
    alignItems: "center",
    width: "75%"
  },
  animalStats: {
    width: "100%"
  },
  stats: {
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 24
  },
  animalBar: {
    height: 24,
    position: "absolute",
    top: 96,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 8
  },
  animalBarImg: {
    height: 36,
    width: 36
  },
  animalBarFocus: {
    backgroundColor: "lightgray",
    borderRadius: 8
  }
});
