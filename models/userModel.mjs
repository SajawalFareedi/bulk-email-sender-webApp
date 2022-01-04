import mongoose from "mongoose";
import Keys from "../config/keys.js";

mongoose
  .connect(Keys.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected To MongoDB...");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  Name: String,
  googleID: String,
});

const Users = mongoose.model("users", userSchema, "users");

export default Users;
