import { gql } from "@apollo/client";

export const appStateTypeDef = gql`
  type AppState {
    id: String!
    company: Boolean
    device: Boolean
    admin: Boolean
    staff: Boolean
  }

  extend type Query {
    appState: AppState!
  }

  extend type Mutation {
    setAppState: AppState!
  }
`;
