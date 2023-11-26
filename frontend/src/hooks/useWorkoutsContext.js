// this is a custom hook that can be called so that we can use the dispatch and state context by using this hook

import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react"; // typically, you can just use this react hook, but we can make custom hooks for each context we have to make it better

export function useWorkoutsContext() {
  const context = useContext(WorkoutsContext); // this hook returns the value object when called

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside a WorkoutsContextProvider"
    );
  }

  return context;
}
