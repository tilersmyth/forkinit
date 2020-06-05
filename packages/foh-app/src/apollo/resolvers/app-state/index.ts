import { device } from "./device";
import { company } from "./company";
import { admin } from "./admin";
import { staff } from "./staff";

export default {
  Mutation: {
    setAppState: (_root: any) => ({
      id: "app_state",
      __typename: "AppState",
    }),
  },
  AppState: {
    company,
    device,
    admin,
    staff,
  },
};
