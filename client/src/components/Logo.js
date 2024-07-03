import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="border-solid rounded-3xl px-4 py-1">
      <Link to="/dashboard"
        className="flex items-center  font-shojumaru space-x-3 rtl:space-x-reverse text-3xl font-bold text-white whitespace-nowrap dark:text-[#6B46C1] select-none"
      >
        <h1 className=" self-center hidden md:block">
          Kiso
        </h1>
        <h1 className=" self-center md:hidden">
          K
        </h1>
      </Link>
    </div>
  );
};
