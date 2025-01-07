import { BsFillMoonFill } from "react-icons/bs";
export default function Header({ onToggleMode }) {
  return (
    <div className="flex justify-between px-16 py-4  bg-primary">
      <a className="font-bold text-white text-1xl" href="#">
        Where in the world?
      </a>
      <button
        onClick={onToggleMode}
        className=" text-white "
      ><BsFillMoonFill />
        Dark Mode
      </button>
    
    </div>
  );
}
