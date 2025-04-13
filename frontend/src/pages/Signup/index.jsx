import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from '../../services/authServices.js';
import Swal from "sweetalert2";
import Particles from "../../Backgrounds/Particles/Particles.jsx";
import ShinyText from "../../TextAnimations/ShinyText/ShinyText.jsx";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  async function Register(e) {
    e.preventDefault();
      // The signUp "function" is called with the name, email, and password as arguments
     signUp(name, email, password)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: response.data.message,
        });
        setErrors({});
        localStorage.setItem("userEmail", email);
        navigate("/Otp");
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
        className="bg-gray-950 flex w-full flex-col items-center justify-center h-screen text-white"
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
          <h1 className="font-bold text-4xl">SIGN UP</h1>
          <form onSubmit={Register} className="flex flex-col gap-3">
            <div>
              <label htmlFor="Name" className="pl-4">
                Name
              </label>
              <input
                type="text"
                className="border rounded-full w-75 px-4 py-2"
                placeholder="your name"
                value={name} // value is set to the name state
                onChange={(e) => setName(e.target.value)} // onChange event is used to update the name state
              />
              {errors.name && <p className="text-red-500 font-bold text-sm pl-4 pt-1">! {errors.name}</p>}
            </div>

            <div>
              <label htmlFor="Email" className="pl-4">
                Email
              </label>
              <input
                type="text"
                className="border rounded-full w-75 px-4 py-2"
                placeholder="your email"
                value={email} // value is set to the email state
                onChange={(e) => setEmail(e.target.value)} // onChange event is used to update the email state
              />
              {errors.email && <p className="text-red-500 font-bold text-sm pl-4 pt-1">{errors.email}</p>}
              {typeof errors === 'string' && <p className="text-red-500 font-bold text-sm pl-4 pt-1">{errors}</p>}
            </div>

            <div>
              <label htmlFor="Password" className="pl-4">
                Password
              </label>
              <input
                type="password"
                className="border rounded-full w-75 px-4 py-2"
                placeholder="*****"
                value={password} // value is set to the password state
                onChange={(e) => setPassword(e.target.value)} // onChange event is used to update the password
              />
              {errors.password && <p className="text-red-500 font-bold text-sm pl-4 pt-1">{errors.password}</p>}
            </div>

            <input
              type="submit"
              value="Submit"
              className="mt-2 p-2 border rounded-full mx-23 text-white hover:bg-sky-900 bg-sky-950 border-indigo-950 cursor-pointer"
            />
            <div className="text-center">
              Have an account?{" "}
              <Link to="/signin" className="text-blue-500">
                <ShinyText
                  text="Sign In Here"
                  disabled={false}
                  speed={2}
                  className=""
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
