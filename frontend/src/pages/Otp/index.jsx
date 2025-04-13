// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { otpVerify } from '../../services/authServices.js';
import { sendOtp } from '../../services/authServices.js';
// import Swal from 'sweetalert2';
import Particles from "../../Backgrounds/Particles/Particles.jsx";
import Swal from 'sweetalert2';
// import ShinyText from '../TextAnimations/ShinyText/ShinyText';

export default function Otp () {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(localStorage.getItem("userEmail"));
  }, []);

  async function resendOtp (e) {
    e.preventDefault();
    sendOtp(email)
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Otp Sent',
        text: response.message,
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      });
      console.log(error.response.data.message);
    });
  }
  async function verifyToken (e) {
    e.preventDefault()
    otpVerify(email, otp)
    .then((response) =>{
      Swal.fire({
        icon: 'success',
        title: 'Otp Verified',
        text: response.message,
      });
      localStorage.removeItem("userEmail");
      navigate('/Signin');
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      });
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
        <div className="absolute flex flex-col justify-center h-4/10 backdrop-blur-md w-90 bg-white/10 drop-shadow-lg rounded-xl">
          <form onSubmit={verifyToken} className="flex flex-col mx-5">
            <h1 className="font-bold text-2xl">EMAIL VERIFICATION</h1>
            <div className="flex flex-col">
              <label htmlFor="Otp" className="">
                We have sent an OTP to your email
              </label>
              <input
                type="text"
                id="Otp"
                name="Otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Input your Otp..."
                className="w-80 mt-8 h-10 p-3 rounded-lg text-white"
              />
            </div>
            <input
              type="submit"
              value="Verify"
              className="mt-5 p-2 border rounded-full text-white hover:bg-sky-900 bg-sky-950 border-indigo-950 cursor-pointer"
            />
            <div className="flex justify-end">
              <button onClick={resendOtp} className='mt-3 p-1 w-30 border rounded-full text-sm text-white hover:bg-sky-900 bg-sky-950 border-indigo-950 cursor-pointer'>
                resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
