const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const userAuth = require("../middleware/auth");

userRouter.use(express.json()); // Middleware to parse JSON

userRouter.get("/user", userAuth, (req, res) => {
  res.send("User route called");
});

userRouter.post("/user/signup", async (req, res) => {
  try {
    const { firstName, email, password, phoneNum } = req.body;

    if (!firstName || !email || !password || !phoneNum) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = new User({ firstName, email, password, phoneNum });

    await user.save(); // Ensure we await the save operation

    console.log("User Created: ", user);
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Error occurred while creating user" });
  }
});

userRouter.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInUser = await User.findOne({ email });

    console.log("loggedInuser: ", loggedInUser);
    if (!loggedInUser) {
      throw new Error("Invalid email or password");
    }
    if (loggedInUser.password !== password) {
      throw new Error("Invalid email or password");
    }
    
    const token = await loggedInUser.getJWT();
    // res.cookie('AuthToken',token,{expires: new Date(Date.now() + 900000),httpOnly: true});

    res.cookie('AuthToken',token,{expires: new Date(Date.now() + 900000),httpOnly: true});
    res.status(200).json({ message: "Login successful!!!", token });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = userRouter;
