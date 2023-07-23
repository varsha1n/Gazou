import express from "express";
import mongoose from "mongoose";
import { ImageModel } from "../models/imageDetails.js";

const router = express.Router();

// API responsible for creating images collection
router.post("/upload-image", async (req, res) => {
  const { base64, username } = req.body; // Get the 'username' from the request body
  console.log(req.body);
  try {
    await ImageModel.create({ image: base64, username: username }); // Save the 'username' along with the image

    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "error", data: err });
  }
});

router.get("/get-image", async (req, res) => {
  try {
    const { username } = req.query;

    const query = username ? { username: username } : {};

    const images = await ImageModel.find(query);

    // Send only the required fields, excluding _id and __v
    const imageData = images.map((image) => ({
      _id: image._id,
      image: image.image,
      userID: image.userID,
      username: image.username,
    }));

    res.send({ status: "ok", data: imageData });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

router.delete("/delete-image/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image by its _id and remove it from the database
    await ImageModel.findByIdAndRemove(id);

    res.send({ status: "ok" });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: "Something went wrong", error });
  }
});

export { router as imagesRouter };
