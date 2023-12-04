const express = require("express");

// importing the function controllers to manipulate db
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth); // fires the middleware before the routes are used, so it ensures things are authenticated

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
// calls the function to create a workout in the controller to keep the router file clean
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
