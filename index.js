const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
dotenv.config();
const movieRoute = require("./Routs/movieRouts");
const { Movie } = require("./Model/userModle");
const userRoute = require("./Routs/userRouts");
const verifyData = require("./Middleware/auth.middleware");

app.use(cookieParser());
app.use(express.json());

app.use("/movie", movieRoute);

app.use("/user", userRoute);

app.get("/", verifyData, async (req, res) => {
  try {
    const movie = await Movie.find();
    res.send(movie);
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(process.env.PORT, () => {
  try {
    connectDB();
    console.log("server is running on post 8000");
  } catch (error) {
    console.log(error.message);
  }
});
