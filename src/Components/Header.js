import { useState } from "react";
import { BsFillMoonFill } from "react-icons/bs";

export default function Header({ onToggleMode }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode((prevMode) => !prevMode);
    onToggleMode();
  };

  return (
    <div
      className={`flex justify-between px-16 py-7 text-1xl w-full top-0  ${
        darkMode ? "bg-secondary text-black" : "bg-primary text-white"
      }`}
    >
      <h6 className="font-bold text-1xl" >
        Where in the world?
      </h6>
      <button onClick={toggleMode} className="flex items-center gap-2">
        <BsFillMoonFill />
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </button>
    </div>
  );
}

