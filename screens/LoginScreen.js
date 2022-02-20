import { StyleSheet, Image, View, ImageBackground } from "react-native";
import React, { useState } from "react";
import { useTheme, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../assets/Images";

const LoginScreen = () => {
  const { colors } = useTheme();
  const [text, setText] = useState("");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.external.loginBackground}
        resizeMode="cover"
        style={styles.backgroundImg}
      >
        <Image
          source={Images.animals.wolf}
          style={{ width: 128, height: 128 }}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.loginInput}
            label="Name"
            value={text}
            onChangeText={setText}
            theme={{ roundness: 10 }}
            right={
              <TextInput.Icon
                name="arrow-right"
                onPress={() => navigation.navigate("FoodScreen")}
                color={colors.primary}
              />
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 32
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  container: {
    flex: 1
  },
  loginInput: {
    height: 50,
    width: "75%",
    marginRight: 16,
    backgroundColor: "white",
    borderRadius: 10
  },
  backgroundImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
