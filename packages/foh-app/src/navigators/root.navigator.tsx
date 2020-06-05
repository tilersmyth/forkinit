import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useQuery } from "@apollo/client";

import {
  GetAppStateDocument,
  GetAppStateQueryVariables,
  GetAppStateQuery,
} from "../apollo/generated";
import { AdminAuthScreen } from "../screens/admin-auth";
import { SplashScreen } from "../screens/splash";

type AppNavigatorParams = {
  Splash: undefined;
  AdminAuth: undefined;
};

const Stack = createStackNavigator<AppNavigatorParams>();

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

const navRouter = () => {
  const { loading, data, error } = useQuery<
    GetAppStateQuery,
    GetAppStateQueryVariables
  >(GetAppStateDocument, { variables: { id: 1 } });

  if (loading) {
    return <Stack.Screen name="Splash" component={SplashScreen} />;
  }

  console.log("DATA", data, error);

  return <Stack.Screen name="AdminAuth" component={AdminAuthScreen} />;
};

export const RootNavigator = (
  props: Partial<StackNavigatorProps>
): React.ReactElement => {
  return (
    <Stack.Navigator {...props} screenOptions={{ headerShown: false }}>
      {navRouter()}
    </Stack.Navigator>
  );
};
