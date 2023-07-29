// import * as functions from "firebase-functions";

// interface IConfig {
//   config: {
//     serviceAccount: string;
//     nodeUrl: string;
//   };
// }

// export const Config = functions.config() as IConfig;

export const Config = {
  config: {
    nodeUrl: process.env.NODE_URL,
  },
};
