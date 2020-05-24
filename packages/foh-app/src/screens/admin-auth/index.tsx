import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const AdminAuthScreen: React.FunctionComponent = () => (
  <View style={styles.container}>
    <Text>Open up App.tsx to start working on your app!</Text>
  </View>
);
