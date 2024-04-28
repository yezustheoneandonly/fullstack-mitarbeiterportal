import mongoose from "mongoose";
import config from "../config/config.js";

const { dbUser, dbPass, dbHost, dbName } = config;

class MongooseError extends Error {}

class Mongoose {
  static connect() {
    mongoose
      .connect(
        `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority`
      )
      .then(() => console.log(`Connected to the database!`))
      .catch((err) => {
        throw new MongooseError(err);
      });
  }
}

export default Mongoose;
