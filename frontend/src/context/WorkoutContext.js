// this file will locally update your view of the workouts, without needing to refetch all the data upon each change
// this just makes sure the states in the application is up to date with the database without refetching data

import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

// the action is are the properties passed during the dispatch function being called, it has a type and payload with info that it passes to the workouts Reducer function
export function workoutsReducer(state, action) {
  switch (action.type) {
    case "SET_WORKOUTS": // the name is your own name of the action that you input as a param with the dispatch function
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts], // ... spreads out the previous state workouts property alongside the new added workout as the payload
      };
    case "DELETE_WORKOUT":
      return {
        // filter to check if the id of the workout is equal to the one we want to delete
        workouts: state.workouts.filter((w) => w._id !== action.payload._id), // leaves the workouts minus the one that we just deleted
      };
    default:
      return state;
  }
}

// allows for a global state essentially, creating a value that can be accessed anywhere in its children
export function WorkoutsContextProvider({ children }) {
  // similar to useState, but the dispatch function can be called in special syntax shown below and then the workoutsReducer function is invoked and gives the action to the workoutsReducer to update the state
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null, // initial value of state, an object
  });

  // state and dispatch can be used globally as the value of the context
  // ...state spreads out the state object, but for now since state only has the workouts property, it's only going to have the workouts spread out
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
}
