import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
// import { TouchableHighlight } from "react-native-gesture-handler";

const Backbutton = ({ customStyles }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Pressable // change to TouchableHighlight
      onPress={() => navigation.goBack()}
      style={[styles.backbutton, customStyles]}
      // underlayColor="#6cae75" <- use with TouchableHighlight
    >
      <Ionicons name="arrow-back-outline" size={28} color="black" />
    </Pressable>
  );
};

export default Backbutton;

const styles = StyleSheet.create({
  backbutton: {
    backgroundColor: "white",
    width: 35,
    height: 35,
    justifyContent: "center",
    borderRadius: 8,
    padding: 4,
  },
});
