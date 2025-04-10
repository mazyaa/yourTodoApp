import ShinyText from "../../../TextAnimations/ShinyText/ShinyText";

export default function Footer() {
  return (
    <footer className="fixed w-full backdrop-blur-sm py-2 z-1 flex items-center justify-center bottom-0">
      <div className="flex gap-1 items-center">
        <ShinyText
          text="Created With ❤️ by"
          disabled={false}
          speed={2}
        />
        <a href="https://github.com/mazyaa" target="_blank">
          <ShinyText
            text="Mazyaa"
            disabled={false}
            speed={2}
          />
        </a>
      </div>
    </footer>
  );
}
