import React from "react";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Colors,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import { RootNavigator } from "./navigators/root.navigator";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue400,
  },
};

export const Main: React.FunctionComponent = () => (
  <PaperProvider theme={theme}>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  </PaperProvider>
);
