import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/auth.jsx";
import Swal from "sweetalert2";
import Particles from "../../Backgrounds/Particles/Particles.jsx";
import ShinyText from "../../TextAnimations/ShinyText/ShinyText.jsx";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function Login(e) {
    e.preventDefault();
    // The signIn "function" is called with the email and password as arguments
    signIn(email, password)
      .then((response) => {
        if (!response.data.verified) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please verify your email to continue",
          });
          navigate("/Otp");
        }
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: response.data.message,
        });
        setErrors({});
        navigate("/todos");
      })
      .catch((error) => {
        setErrors(error.response.data.message || {});
        console.log(error.response.data.message);
      });
  }

  return (
    <>
      <div
        style={{ height: "110vh" }}
        className="bg-gray-950 flex flex-col items-center justify-center h-screen text-white"
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        <div className="absolute flex h-auto backdrop-blur-md w-90 bg-white/10 drop-shadow-lg p-12 rounded-xl h-100 flex-col gap-7 justify-center items-center">
          <h1 className="font-bold text-4xl">SIGN IN</h1>
          {typeof errors === "string" && (
            <p className="text-red-500 font-bold text-sm pl-4 pt-1">
              ! {errors}
            </p>
          )}
          <form onSubmit={Login} className="flex flex-col gap-3">
            <div>
              <label htmlFor="Name" className="pl-4">
                Email
              </label>
              <input
                type="text"
                className="border rounded-full w-75 px-4 py-2"
                placeholder="your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 font-bold text-sm pl-4 pt-1">
                  ! {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="Password" className="pl-4">
                Password
              </label>
              <input
                type="password"
                className="border rounded-full w-75 px-4 py-2"
                placeholder="*****"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 font-bold text-sm pl-4 pt-1">
                  ! {errors.password}
                </p>
              )}
            </div>

            <input
              type="submit"
              value="Submit"
              className="mt-2 p-2 border rounded-full mx-23 text-white hover:bg-sky-900 bg-sky-950 border-indigo-950 cursor-pointer"
            />
            <p className="text-center">
              Dont Have an account?{" "}
              <Link to="/Signup" className="text-blue-500">
                <ShinyText
                  text="Sign Up Here"
                  disabled={false}
                  speed={2}
                  className=""
                />
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
