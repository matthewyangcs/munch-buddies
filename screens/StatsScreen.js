import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import { Menu, Card, Divider } from "react-native-paper";
import Backbutton from "../components/Backbutton";
import { Images } from "../assets/Images";

import Chart from "./Chart";
const StatsScreen = () => {
  const [data, setData] = useState({});
  const [animalStats, setAnimalStats] = useState();
  const [visible, setVisible] = React.useState(false);
  const [view, setView] = useState("vitamins");

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    const f = async () => {
      const res = await fetch("http://localhost:8000/animal/all/");
      const json = await res.json();

      setAnimalStats(json);
    };

    f();
  }, []);

  useEffect(() => {
    const f = async () => {
      const res = await fetch("http://localhost:8000/stats/food/history/");

      const data = await res.json();
      setData(data);
    };

    f();
  }, []);

  const setCurrView = (name) => {
    setView(name);
    closeMenu();
  };

  console.log(animalStats);

  return (
    <View style={styles.container}>
      <Backbutton customStyles={{ position: "absolute", top: 48, left: 24 }} />

      <View
        style={{
          width: "60%",
          height: 48,
          borderRadius: 15,
          position: "absolute",
          top: 42,
          left: 80,
          justifyContent: "center",
          backgroundColor: "white",
          flexDirection: "column",
          paddingVertical: 8,
          paddingHorizontal: 15
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{view}</Text>
      </View>

      <Chart stacked={false} data={data?.[view] || []} />

      <Text style={{ position: "absolute", top: 110, left: 40 }}>
        {view} eaten
      </Text>

      <View>
        <View style={{ position: "absolute", top: 420 }}>
          <Menu
            style={{ height: 50 }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Text
                  style={{
                    color: "blue",
                    marginTop: 10,
                    marginLeft: 5,
                    fontSize: 15,
                    fontWeight: "600"
                  }}
                >
                  pick graph
                </Text>
              </TouchableOpacity>
            }
            style={styles.btn}
          >
            <Menu.Item
              onPress={() => setCurrView("vitamins")}
              title="vitamins"
            />
            <Menu.Item
              onPress={() => setCurrView("antioxidants")}
              title="antioxidants"
            />
            <Menu.Item
              onPress={() => setCurrView("minerals")}
              title="minerals"
            />
            <Menu.Item onPress={() => setCurrView("protein")} title="protein" />
          </Menu>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "600",
            padding: 5,
            position: "absolute",
            top: 450
          }}
        >
          Animal Summary
        </Text>
        <FlatList
          contentContainerStyle={{ marginTop: 10, marginLeft: 15 }}
          data={animalStats ? Object.values(animalStats) : []}
          style={{ position: "absolute", top: 480, height: 400 }}
          renderItem={({ item }) => (
            <Card
              style={{
                height: 90,
                width: 350,
                display: "flex",
                justifyContent: "center",
                borderRadius: 15,
                marginBottom: 15
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={
                    Images.animals[
                      `${item.id.toLowerCase()}${Math.min(3, item.level)}`
                    ]
                  }
                  style={{ marginLeft: 16, width: 48, height: 48 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      height: 20,
                      fontWeight: "600",
                      marginTop: 15,
                      marginLeft: 15
                    }}
                  >
                    {item.display_name}:
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      height: 20,
                      fontWeight: "600",
                      marginTop: 15,
                      marginLeft: 15
                    }}
                  >
                    level: {item.level} {"   "} | {"   "} progress:{" "}
                    {Math.round((item.progress / item.level_up_req) * 100)} %
                  </Text>
                </View>
              </View>
              {/* <Text>{item.timestamp}</Text> */}
            </Card>
          )}
        />
      </View>
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
    // backgroundColor: "white"
  },

  btn: {
    fontSize: 10,
    marginLeft: -5
  }
});
