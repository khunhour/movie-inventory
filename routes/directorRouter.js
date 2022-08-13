const express = require("express");
const router = express.Router;

const director_controller = require("../controllers/directorController");

// MOVIE ROUTES

// GET request for list of all director items
router.get("/all", director_controller.director_list);

// GET request for creating a director
router.get("/create", director_controller.director_create_get);

// POST request for creating a director
router.post("/create", director_controller.director_create_post);

// GET request to delete a director
router.get("/:id/delete", director_controller.director_delete_get);

// POST request to delete a director
router.post("/:id/delete", director_controller.director_delete_post);

// GET request to update a director
router.get("/:id/update", director_controller.director_update_get);

// POST request to update a director
router.post("/:id/update", director_controller.director_update_post);

// GET request for one director
router.get("/director/:id", director_controller.director_detail);

module.exports = router;
