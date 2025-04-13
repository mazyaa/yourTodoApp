import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Index.jsx";
import Todos from "./pages/Todos/index.jsx";
import Navbar from "./components/molecules/Header1/index.jsx";
import NavbarV2 from "./components/molecules/Header2/index.jsx";
import SignUp from "./pages/SignUp/index.jsx";
import SignIn from "./pages/Signin/index.jsx";
import Otp from "./pages/Otp/index.jsx";
import Profile from "./pages/Profile/index.jsx";
import Footer from "./components/molecules/Footer/index.jsx";

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
              <Footer />
            </>
          }
        />

        <Route
          path="/Signup"
          element={
            <>
              <Navbar />
              <SignUp />
              <Footer />
            </>
          }
        />

        <Route
          path="/Signin"
          element={
            <>
              <Navbar />
              <SignIn />
              <Footer />
            </>
          }
        />

        <Route
          path="/Otp"
          element={
            <>
              <Navbar />
              <Otp />
              <Footer />
            </>
          }
        />

        <Route
          path="/Profile"
          element={
            <>
              <NavbarV2 />
              <Profile />
              <Footer />
            </>
          }
        />

        <Route
          path="/Todos"
          element={
            <>
              <NavbarV2 />
              <Todos />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
