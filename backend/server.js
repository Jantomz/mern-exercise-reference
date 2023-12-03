// importing dotenv and configuring to load environment variables
require("dotenv").config();

// importing mongoose ODM Object Data Manager that wraps MongoDB with methods we can use
const mongoose = require("mongoose");

// importing the routes
const workoutRoutes = require("./routes/workouts");

const userRoutes = require("./routes/user");

// importing express
const express = require("express");

// creates express app
const app = express();

const cors = require("cors");

const PORT = process.env.PORT || 3001;

// creating middleware, any code that runs between an HTTP request and our response
// the 'next' parameter is a function that will allow the middleware to move on to the next piece of middleware
// this middleware will always run first before the app.get request handler

// this middleware uses a middleware built into express, checking if the request has a body, if so, it will parse and attach it to the request object
app.use(express.json());

app.use(
  cors()
  // {
  //   origin: ["mern-exercise-reference.vercel.app/"],
  //   methods: ["POST", "GET", "PATCH", "DELETE"],
  //   credentials: true
  // }
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// old code section

// receiving a get HTTP request from the browser and handling it, if the get request is just the '/' route
// sending a response in json format
// app.get("/", (req, res) => {
//   // this is considered middleware, as it is code that happens in the middle of the req and res
//   res.json({ mssg: "Welcome to the app" });
// });

// routes, connects all the routes defined in the workouts file to the app
// has a pre route that means the routes will only fire once the pre route is fired
app.use("/api/workouts", workoutRoutes);

// this time it will be /api/user/ either login or signup for the user routes
app.use("/api/user", userRoutes);

// connect to db, it is await async and returns a promise, so we tack on a .then to tell the program what to do after it has completed the connection, catches errors too
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests only if connected to database
    // the function is called once the app is successfully listened on the port
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
