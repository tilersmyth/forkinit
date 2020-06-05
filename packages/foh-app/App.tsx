import React from "react";
import { ApolloProvider } from "@apollo/client";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ApolloClient from "./src/apollo/apolloClient";
import { Entry } from "./src/entry";

export default () => (
  <SafeAreaProvider>
    <ApolloProvider client={ApolloClient}>
      <Entry />
    </ApolloProvider>
  </SafeAreaProvider>
);
