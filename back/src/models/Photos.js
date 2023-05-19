import mongoose from "mongoose";

//schema is an object that will define structure of data
const PhotosSchema = new mongoose.Schema({
  name,
});

export const PhotoModel = mongoose.model("photos", UserSchema); // table or collection called users
