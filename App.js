import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import LoginScreen from "./screens/LoginScreen";
import FoodScreen from "./screens/FoodScreen";
import FeedScreen from "./screens/FeedScreen";
import StatsScreen from "./screens/StatsScreen";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#8bbd8b",
    accent: "#6cae75"
  }
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="FoodScreen" component={FoodScreen} />
          <Stack.Screen name="FeedScreen" component={FeedScreen} />
          <Stack.Screen name="StatsScreen" component={StatsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
