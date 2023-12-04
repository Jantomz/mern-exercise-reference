import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext(); // destructuring the dispatch function with a different name

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem("user"); // we called it "user" when we made it

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
