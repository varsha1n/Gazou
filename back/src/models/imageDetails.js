import mongoose from "mongoose";

// schema for images
const ImageSchema = new mongoose.Schema(
  {
    image: String,
    userID: String,
    username: String, // New field for username
  },
  {
    collection: "imagedetails",
  }
);

export const ImageModel = mongoose.model("imagedetails", ImageSchema);
