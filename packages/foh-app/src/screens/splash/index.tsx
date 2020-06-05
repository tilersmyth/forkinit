import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  navigation: StackNavigationProp<{}>;
}

export const SplashScreen: React.FunctionComponent<Props> = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
};
