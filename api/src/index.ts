import express from "express";
import { genres, movies } from "./db";

const app = express();
const PORT = 5000;

/**
 * Return movies that match the 'search term' with movie 'title'.
 * If search term is not provided, return all movies.
 */
app.use(express.json());
app.get("/movies", (req, resp) => {
  // req.params.search
  const search = req.query.search?.toString();
  const result: any[] = [];
  if (search) {
    movies.forEach((e) => {
      if (e.title.toLowerCase().includes(search.toLowerCase())) {
        result.push(e);
        console.log(e);
      }
    });
    resp.send(result);
  }
  resp.send(movies);
});

/**
 * Return all genres.
 */
app.get("/genres", (req, resp) => {
  resp.send(genres);
});

/**
 * Return movies that match the provided ID.
 */
app.get("/movies/:id", (req, resp) => {
  // const id = Number(req.params.id)
  // TODO Return the movie
  const { id } = req.params;
  const result = movies.find((e) => e.id.toString() === id);
  if (result === undefined) {
    resp.send("No Movie with this ID exist");
  }
  resp.send(result);
});

/**
 * Return genre that match the provided ID.
 */
app.get("/genres/:id", (req, resp) => {
  // TODO
  const { id } = req.params;
  const result = genres.find((e) => e.id.toString() === id);
  if (result === undefined) {
    resp.send("No Genre with this ID exist");
  }
  resp.send(result);
});

/**
 * Add rating to a movie.
 * For simplicity of the task, the array acts as a DB in runtime.
 */
app.post("/movies/:id/ratings", (req, resp) => {
  // TODO
  // req.body.ratingVal
  const { id } = req.params;
  const { vote_average, vote_count } = req.body;
  const result = movies.find((e) => e.id.toString() === id);
  if (result === undefined) {
    resp.send("No Movie with this ID exist");
  }
  if (result) {
    result.vote_average = vote_average;
    result.vote_count = vote_count;
  }

  resp.send(result);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
