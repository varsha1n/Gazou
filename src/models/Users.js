import mongoose from "mongoose";
//schema is an object that will define structure of data
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model("users", UserSchema); // table or collection called users
