const express = require("express");
const movieRoute = express.Router();
const { Movie } = require("../Model/userModle");
const verifyData = require("../Middleware/auth.middleware");

movieRoute.post("/posts", verifyData, async (req, res) => {
  try {
    const movie = req.body;
    const newMovie = await Movie.insertMany(movie);
    res.status(200).send("Movie updated successfully!");
  } catch (error) {
    res.status(404).send("Update issue in movie post failed!");
  }
});

movieRoute.patch("/update/:id", verifyData, async (req, res) => {
  try {
    const id = req.params.id;
    const movie = req.body;
    if (!movie || !id) {
      res.status(404).send("Movie not found");
    } else {
      const updateMovie = await Movie.findByIdAndUpdate(id, movie, {
        new: true,
      });
      res.status(200).send(id, " Movie data updated");
    }
  } catch (error) {
    res.status(404).send("data not found. updating failed");
  }
});

movieRoute.delete("/delete/:id", verifyData, async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(400).send("Please provide a valid id for deletion.");
    }

    const deleteMovie = await Movie.findByIdAndDelete(id);
    if (deleteMovie) {
      res.status(200).send(`Movie with id ${id} deleted successfully.`);
    } else {
      res.status(404).send("Movie not found.");
    }
  } catch (error) {
    console.error(error); // For debugging
    res.status(500).send("Internal server issue in delete");
  }
});



module.exports = movieRoute;
