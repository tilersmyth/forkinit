import { ApolloCache, ApolloClient } from "@apollo/client";

type GetCacheKey = (obj: { __typename: string; id: string | number }) => any;

export interface IApolloContext {
  cache: ApolloCache<{}>;
  getCacheKey: GetCacheKey;
  client: ApolloClient<{}>;
}
