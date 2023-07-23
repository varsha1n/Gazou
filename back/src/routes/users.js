// everything related to login & register
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body; //username is cmg from front-end

  const user = await UserModel.findOne({ username: username }); //search for user in db

  if (user) {
    return res.json({ message: "user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10); // created a password which is hashed with a salt factor of 10

  const newUser = new UserModel({ username, password: hashedPassword }); //creating & adding new user document with username & password
  await newUser.save();

  res.json({ message: "user registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username: username });

  if (!user) {
    return res.json({ message: "user doesnt exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password); // bcrypt hashes the user entered password & compares it with the hashedpassword

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password Is Incorrect" });
  }

  // creating a token for user if username & password are correct
  const token = jwt.sign({ id: user._id }, "secret"); //token will be string of letters&numbers but can be converted into this obj {id:user,_id} , secret(password for token) is used to verify is user is authenticated
  //payload of the token contains the user's _id, and a secret key is used for signing the token.
  res.json({ token, username: user.username });
});

export { router as userRouter };
