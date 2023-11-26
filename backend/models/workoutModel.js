// import mongoose as it is the component that allows schemas, MongoDB alone is schema-less
const mongoose = require("mongoose");

// initializing the mongoose schema object into our own object
const Schema = mongoose.Schema;

// creating the schema object to model the properties of a workout, defining the schema that must be adhered to
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  // this is a second property object, showing the timestamps of created and updated
  { timestamps: true }
);

// this creates the model, with the name 'Workout' and using the workout schema, then exports
// schema defines the structure of the type of document in the database
// a model applies the schema to a model, then to interact with a collection with the name
// can be imported as 'Workout', it is a collection, the model is the collection of documents
// the collection has documents all using the workoutSchema schema
// use this model to interact with the collection of workouts
module.exports = mongoose.model("Workout", workoutSchema);
