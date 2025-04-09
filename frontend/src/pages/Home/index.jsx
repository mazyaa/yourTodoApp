import { Link } from "react-router-dom";
import TrueFocus from "../../TextAnimations/TrueFocus/TrueFocus";
import ShinyText from "../../TextAnimations/ShinyText/ShinyText";
import Particles from "../../Backgrounds/Particles/Particles";

export default function Home() {
  return (
    <>
      <div className="bg-gray-950 flex w-full flex-col items-center justify-center h-screen text-white">
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

        <div className="absolute flex flex-col gap-7 justify-center items-center">
          <TrueFocus
            sentence="Make It More Productive"
            manualMode={false}
            blurAmount={5}
            borderColor="blue"
            animationDuration={1}
            pauseBetweenAnimations={0.5}
          />
          <Link to="/Todos" className="p-2 border rounded-full text-white hover:bg-sky-950 border-indigo-950 cursor-pointer">
            <ShinyText
              text="Create Todos"
              disabled={false}
              speed={2}
              className=""
            />
          </Link>
        </div>
      </div>
    </>
  );
}
