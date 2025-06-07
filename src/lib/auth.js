import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
const db = client.db("loyaltyprogram");
 
export const auth = betterAuth({
  database: mongodbAdapter(db),
  trustedOrigins: [
    "http://localhost:*", 
    "https://localhost:*",
    "https://fewsecs-loyaltyprogram.azurewebsites.net"
  ],
  emailAndPassword: {
    enabled: true
  },
  user: {
    modelName: "users",
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "customer",
        input: false
      },
      cart: {
        type: "array",
        required: false,
        defaultValue: [],
        input: true
      },
      rewards: {
        type: "array",
        required: false,
        defaultValue: [],
        input: true
      },
    },
  },
  account: {
    modelName: "accounts"
  },
  session: {
    modelName: "sessions"
  }
});
