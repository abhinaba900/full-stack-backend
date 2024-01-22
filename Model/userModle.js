const mongoose =require('mongoose');



const userSceema = new mongoose.Schema({
  userName: { type: String, required: true },
  pass: { type: String, required: true },
  email: { type: String, required: true },
},{
    versionKey:false,
});

const Users= mongoose.model("user",userSceema);

const movieSceema = new mongoose.Schema({
  movie_id: Number,
  director_name: String,
  actor_name: String,
  year_of_release: Number,
  imdb_rating: Number,
  genre: String,
  language: String,
});

const Movie = mongoose.model("Movie", movieSceema);

module.exports = {Users,Movie};