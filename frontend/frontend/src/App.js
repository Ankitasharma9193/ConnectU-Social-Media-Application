import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/login"
import Register from "./pages/reg/Register";
import {
  BrowserRouter as Router,
  useRoutes,
  Route,
  Navigate,
  Redirect,
  Routes,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const user = useContext(AuthContext);
  return(
  <Router>
      <Routes>
        <Route exact path="/" element={
          user ? <Home /> : <Register />} />

        <Route path="/profile/:userName" element={<Profile />} />

        {/* <Route path="/login" element={
          user ? <Navigate to="/" /> : <Login />} /> */}

        <Route path="/login" element={ <Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
    
}

export default App;