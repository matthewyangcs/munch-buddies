import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Backbutton from "../components/Backbutton";

import Chart from "./Chart";
const StatsScreen = () => {
  return (
    <View style={styles.container}>
      <Backbutton customStyles={{ position: "absolute", top: 48, left: 24 }} />
      <Chart stacked={false} />
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
