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

  const hashedPassword = await bcrypt.hash(password, 10); // created a password which is hashed(to make password safe)

  const newUser = new UserModel({ username, password: hashedPassword }); //adding to username,password to database
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
  res.json({ token, userID: user._id });
});

export { router as userRouter };
