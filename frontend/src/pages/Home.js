import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

export default function Home() {
  // const [workouts, setWorkouts] = useState(null); // creating states that can be updated later if the fetch response is ok

  const { user } = useAuthContext();

  const { workouts, dispatch } = useWorkoutsContext(); // using our custom hook to update states that are global essentially

  // use effect fires a function upon rendering, and since we only want it to fire once, one of the params is [], stating the dependencies which is none
  useEffect(() => {
    // async function to fetch workouts
    const fetchWorkouts = async () => {
      const response = await fetch(`http://localhost:4000/api/workouts`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // sending the request with the user token
        },
      }); // previously had http://localhost:4000 for the request, but now the package.json holds the automatic redirection to our backend server using proxy, removes cors error in development
      const json = await response.json(); // parses the response json into objects

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json }); // fires the dispatch function which fires the workoutsReducer which updates a global state to the json
      }
    };

    if (user) {
      // only calling the function if the user is there
      fetchWorkouts(); // calling the function we just made, and we can use the await keyword here instead
    }
  }, [dispatch, user]); // needs dispatch dependency

  // Only fires if workouts has something, then it maps out the objects, using () because it is returning stuff, not a function

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}
