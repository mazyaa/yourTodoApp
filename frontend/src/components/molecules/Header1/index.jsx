import { Link } from "react-router-dom";
import image1 from "../../../assets/image1.png";
import ShinyText from "../../../TextAnimations/ShinyText/ShinyText";

export default function Navbar() {
  return (
    <nav className="fixed w-full backdrop-blur-sm px-5 py-2 z-1 flex items-center justify-between">
      <Link to="/">
        <img src={image1} alt="logo" className="w-20 h-20" />
      </Link>

      <ul className="flex gap-5 items-center">
        <Link to="/Signup" className="p-2 cursor-pointer border rounded-full hover:bg-sky-950 border-indigo-950 cursor-pointer">
          <ShinyText text="Sign Up" disabled={false} speed={2} className="" />
        </Link>
        <Link to="/Signin" className="p-2 cursor-pointer border rounded-full hover:bg-sky-700 border-indigo-950 cursor-pointer">
          <ShinyText text="Sign In" disabled={false} speed={2} className="" />
        </Link>
      </ul>
    </nav>
  );
}
