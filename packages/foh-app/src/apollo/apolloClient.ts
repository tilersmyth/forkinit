import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  concat,
  InMemoryCache,
} from "@apollo/client";
import { AsyncStorage } from "react-native";

import { API_HOST, COOKIE_NAME } from "../utils/expo-env.util";
import { typeDefs } from "../apollo/type-defs";
import { resolvers } from "../apollo/resolvers";
import { GetAppStateDocument } from "./generated";

const httpLink = new HttpLink({ uri: API_HOST });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: AsyncStorage.getItem(COOKIE_NAME) || null,
    },
  });

  return forward(operation);
});

const cache = new InMemoryCache();

// Need to set defaults so we can query after data set by mutation
cache.writeQuery({
  query: GetAppStateDocument,
  data: {
    appState: { __typename: "AppState", id: "app_state", company: null },
  },
});

export default new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
  typeDefs,
  resolvers,
});
