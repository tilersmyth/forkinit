import React, { useEffect } from "react";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Colors,
  Text,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import { useMutation } from "@apollo/client";

import { RootNavigator } from "./navigators/root.navigator";
import { SetAppStateDocument } from "./apollo/generated";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue400,
  },
};

export const Entry: React.FunctionComponent = () => {
  const [setAppState, { loading, data, error }] = useMutation(
    SetAppStateDocument
  );

  useEffect(() => {
    (async () => {
      await setAppState();
    })();
  }, []);

  if (loading || !data) {
    return <AppLoading />;
  }

  if (error) {
    console.log(error);
    return <Text>Oh, got an error</Text>;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};
