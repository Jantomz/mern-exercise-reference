// this file holds functions that hold the logic for manipulating the database, as we don't want to clutter the router file

// imports the workout collection model
const Workout = require("../models/workoutModel");

const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id; // grabbing the id property that we sent earlier in the request header

  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 }); // sorting in descending order
  res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  // destructuring, grabbing the dynamic id parameter in the url
  const { id } = req.params;

  // checking to make sure if the id is a valid mongoose type of id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    // have to return or else the rest of the code will be run
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
  // the express.json() loads the body into the req body, and we destructure it into these constants when we want to post it to the db
  const { title, reps, load } = req.body;

  let emptyFields = []; // validating the form inputs

  if (!title) {
    emptyFields.push("title");
  }

  if (!load) {
    emptyFields.push("load");
  }

  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add document to db
  try {
    const user_id = req.user._id;

    // workout.create() is asynchronous, it is calling the collection and using a method to create a document, the response we are promised is the new document that was created along with its ID
    const workout = await Workout.create({ title, reps, load, user_id });

    // this returns the response that the workout was created
    // tacking on status 200 means the response was received and things were good, then the dot notation just sends the json format of the newly added document
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  // _id is the property name in MongoDB
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body, // spreading the properties of the body into this object, that is what the three dots are
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  // the returned workout is the version before the update, so it will be updated in the db, but the 'workout' json object will look not updated
  res.status(200).json(workout);
};

// exporting all the function controllers
module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
