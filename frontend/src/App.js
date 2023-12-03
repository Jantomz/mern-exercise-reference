import { BrowserRouter, Routes, Route } from "react-router-dom";

// note: cors (Cross Origin Resource Sharing) is helpful to make request from frontend running on port 3000 while backend is running on port 4000
// requests across these servers is not allowed for security reasons
// the proxy to localhost 4000 only works during development to avoid cors error, in reality you need the frontend to point to the right backend each time
// note: when setting up the proxy, make sure you clear the cache by deleting package-lock.json and the node modules folder and reinstalling after adding the

// pages and components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
