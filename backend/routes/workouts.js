const express = require("express");

// importing the function controllers to manipulate db
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// GET all workouts
router.get("https://mern-exercise-reference-api.onrender.com/api/workouts", getWorkouts);

// GET a single workout
router.get("https://mern-exercise-reference-api.onrender.com/api/workouts/:id", getWorkout);

// POST a new workout
// calls the function to create a workout in the controller to keep the router file clean
router.post("https://mern-exercise-reference-api.onrender.com/api/workouts/", createWorkout);

// DELETE a workout
router.delete("https://mern-exercise-reference-api.onrender.com/api/workouts/:id", deleteWorkout);

// UPDATE a workout
router.patch("https://mern-exercise-reference-api.onrender.com/api/workouts/:id", updateWorkout);

module.exports = router;
