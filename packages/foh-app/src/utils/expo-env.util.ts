import Constants from "expo-constants";

// A: 30.147.208.136
// B: 10.0.0.243

const ENV = {
  dev: {
    API_HOST: "http://10.0.0.243:4000/graphql",
    COOKIE_NAME: "sid",
    COMPANY_ID: "company_id",
  },
  prod: {
    API_HOST: "[to do]",
    COOKIE_NAME: "[to do]",
    COMPANY_ID: "company_id",
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (
    env === null ||
    env === undefined ||
    env === "" ||
    env.indexOf("dev") !== -1
  )
    return ENV.dev;

  return ENV.prod;
};

export const { API_HOST, COOKIE_NAME, COMPANY_ID } = getEnvVars();
