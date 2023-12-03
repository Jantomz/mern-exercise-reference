import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null); // used to show when the api is loading
  const { dispatch } = useAuthContext(); // getting the dispatch function

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // we are sending json type data
      body: JSON.stringify({ email, password }), // making the body as a json
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);

      setError(json.error);
    }

    if (response.ok) {
      // save the user jwt to local storage
      localStorage.setItem("user", JSON.stringify(json)); // json is originally actually an object, so now we make it a json again

      // update the auth context

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
