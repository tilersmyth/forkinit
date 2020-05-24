import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AdminAuthScreen } from "../screens/admin-auth";

type AppNavigatorParams = {
  AdminAuth: undefined;
};

const Stack = createStackNavigator<AppNavigatorParams>();

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export const RootNavigator = (
  props: Partial<StackNavigatorProps>
): React.ReactElement => {
  return (
    <Stack.Navigator {...props} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminAuth" component={AdminAuthScreen} />
    </Stack.Navigator>
  );
};
