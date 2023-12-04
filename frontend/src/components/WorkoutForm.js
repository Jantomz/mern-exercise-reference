import { useState } from "react";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import { useAuthContext } from "../hooks/useAuthContext";

export default function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]); // empty fields array state

  // handleSubmit is an async function as we will be reaching out to the api
  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = {
      title,
      load,
      reps,
    };

    if (!user) {
      // if we have a user, then we skip this error
      setError("You must be logged in"); //
      return;
    }

    const response = await fetch(`http://localhost:4000/api/workouts`, {
      // can change the localhost:4000 thing to the actual origin
      method: "POST", // make the fetch request a post
      body: JSON.stringify(workout), // make the body the object, but we need to send it as json, so we call JSON.stringify to make the object json
      headers: {
        "Content-Type": "application/json", // makes the content type specified as json
        Authorization: `Bearer ${user.token}`, // sending the request with the user token
      },
    });

    const json = await response.json(); // when we make the post request, our backend also sends back the response as a json

    if (!response.ok) {
      setError(json.error); // setting the error state as the error since the error returns json with an error property
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError(null);
      console.log("New Workout Added", json);
      setTitle("");
      setReps("");
      setLoad("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className={emptyFields.includes("title") ? "error" : ""} // giving dynamic classname based on if the empty field array includes this part
        value={title}
      ></input>
      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e) => {
          setLoad(e.target.value);
        }}
        className={emptyFields.includes("load") ? "error" : ""}
        value={load}
      ></input>
      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => {
          setReps(e.target.value);
        }}
        className={emptyFields.includes("reps") ? "error" : ""}
        value={reps}
      ></input>
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
