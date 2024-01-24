const express = require("express");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const { Users } = require("../Model/userModle");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const verifyData = require("../Middleware/auth.middleware");

userRoute.post("/register", async (req, res) => {
  try {
    const { userName, pass, email } = req.body;

    // Data validation (basic example)
    if (!userName || !pass || !email) {
      return res.status(400).send("Missing required fields");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pass, 10);

    const user = new Users({ userName, pass: hashedPassword, email });
    await user.save();

    res.status(200).send("Success");
  } catch (error) {
    console.error(error); // Logging the error can be helpful for debugging
    res.status(500).send("Internal Server Error in registration");
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { userName, pass } = req.body;

    // Find the user by userName or email
    const user = await Users.findOne({ userName });
    if (user) {
      // Verify the password
      const validPassword = await bcrypt.compare(pass, user.pass);
      if (validPassword) {
        const authToken = jwt.sign({ id: user._id }, process.env.AUTHKEY, {
          expiresIn: "1h",
        });
        const refreshToken = jwt.sign(
          { id: user._id },
          process.env.REFRESHKEY,
          { expiresIn: "7d" }
        );

        // Set secure cookies
        res.cookie("authToken", {authToken});
        res.cookie("refreshToken", {refreshToken});

        res.status(200).send({ user, authToken, refreshToken });
      } else {
        res.status(401).send("Invalid password");
      }
    } else {
      res.status(404).send("User not found. Please provide valid data");
    }
  } catch (error) {
    console.error(error); // For debugging
    res.status(500).send("Internal Server Error in login");
  }
});

userRoute.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { pass } = req.body;
    if (pass) {
      const hashedPassword = await bcrypt.hash(pass, 10);
      const user = await Users.findByIdAndUpdate(id, { pass: hashedPassword });
      if (user) {
        res.status(200).send("Data Updated");
      } else {
        res.status(404).send("User not found. please provide true data");
      }
    }
  } catch (error) {
    res.status(404).send("Internal Server Error in login");
  }
});

userRoute.delete("/delete/:id", verifyData, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByIdAndDelete(id);
    if (user) {
      res.status(200).send("Data Deleted");
    } else {
      res.status(404).send("User not found. please provide true data");
    }
  } catch (error) {
    res.status(404).send("Internal Server Error in login");
  }
});

userRoute.get("/", verifyData, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send("internal server error in getting user");
  }
});

module.exports = userRoute;
