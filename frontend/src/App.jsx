import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import Navbar from "./components/Navbar";
import NavbarV2 from "./components/NavbarV2";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Otp from "./pages/Otp";

function App() {
  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/Signup"
          element={
            <>
              <Navbar />
              <SignUp />
            </>
          }
        />

        <Route
          path="/Signin"
          element={
            <>
              <Navbar />
              <SignIn />
            </>
          }
        />

        <Route
          path="/Todos"
          element={
            <>
              <NavbarV2 />
              <Todos />
            </>
          }
        />

        <Route
          path="/Otp"
          element={
            <>
              <Navbar />
              <Otp />
            </>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
