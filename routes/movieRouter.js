const express = require("express");
const router = express.Router;

const movie_controller = require("../controllers/movieController");

// MOVIE ROUTES

// GET request for list of all movie items
router.get("/all", movie_controller.movie_list);

// GET request for creating a movie
router.get("/create", movie_controller.movie_create_get);

// POST request for creating a movie
router.post("/create", movie_controller.movie_create_post);

// GET request to delete a movie
router.get("/:id/delete", movie_controller.movie_delete_get);

// POST request to delete a movie
router.post("/:id/delete", movie_controller.movie_delete_post);

// GET request to update a movie
router.get("/:id/update", movie_controller.movie_update_get);

// POST request to update a movie
router.post("/:id/update", movie_controller.movie_update_post);

// GET request for one movie
router.get("/movie/:id", movie_controller.movie_detail);

module.exports = router;
