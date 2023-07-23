import express from "express";
import cors from "cors"; // setup routes between front & back-end
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { imagesRouter } from "./routes/imageUpload.js";

const app = express();

//middleware
app.use(express.json()); // data front-end is converted into json
app.use(cors());
app.use(express.static("public"));

app.use("/auth", userRouter);
app.use("/images", imagesRouter);

mongoose.connect(
  "mongodb+srv://narravarsha1:VK8h1eHZ0zCVtuUH@photos.e3jknqo.mongodb.net/photos?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("server started"));
