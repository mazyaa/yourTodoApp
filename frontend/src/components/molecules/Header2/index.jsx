import { Link } from "react-router-dom";
import profile from "../../../assets/profile.svg";
import image1 from "../../../assets/image1.png";
import ShinyText from "../../../TextAnimations/ShinyText/ShinyText";
import Swal from "sweetalert2";
import axios from 'axios';

export default function NavbarV2() {
  function logout () {
    axios.delete(import.meta.env.VITE_API_URL + '/auth/logout')
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Logged out successfully',
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Logout failed',
          text: error.response.data.message,
          timer: 2000,
          showConfirmButton: false,
        });  
  });
  }

  return (
    <nav className="fixed w-full backdrop-blur-sm px-5 py-2 z-1 flex items-center justify-between">
      <Link to="/">
        <img src={image1} alt="logo" className="w-20 h-20" />
      </Link>

      <ul className="flex gap-5 items-center">
        <Link to="/" className="p-2 cursor-pointer border rounded-full hover:bg-sky-950 border-indigo-950 cursor-pointer">
          <button onClick={logout}>
          <ShinyText text="Logout" disabled={false} speed={2} className="" />
          </button>
        </Link>
        <Link to="/Profile" className="p-2 cursor-pointer border-indigo-950 cursor-pointer">
            <img src={profile} alt="profile" className="w-15 h-13" />
        </Link>
      </ul>
    </nav>
  );
}
