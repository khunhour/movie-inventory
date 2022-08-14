const express = require("express");
const router = express.Router();

const genre_controller = require("../controllers/genreController");

// MOVIE ROUTES

// GET request for list of all genre items
router.get("/all", genre_controller.genre_list);

// GET request for creating a genre
router.get("/create", genre_controller.genre_create_get);

// POST request for creating a genre
router.post("/create", genre_controller.genre_create_post);

// GET request to delete a genre
router.get("/:id/delete", genre_controller.genre_delete_get);

// POST request to delete a genre
router.post("/:id/delete", genre_controller.genre_delete_post);

// GET request to update a genre
router.get("/:id/update", genre_controller.genre_update_get);

// POST request to update a genre
router.post("/:id/update", genre_controller.genre_update_post);

// GET request for one genre
router.get("/genre/:id", genre_controller.genre_detail);

module.exports = router;
