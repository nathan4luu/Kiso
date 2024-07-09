import { Link, useNavigate } from "react-router-dom";
import { useLogout, useUser } from "../api/user";
import { useQueryClient } from "@tanstack/react-query";
import LoginModal from "./LoginModal";
import Logo from "./Logo";
import ProtectedHeader from "./ProtectedHeader";
import { LogOut } from "lucide-react";

export default function Header() {
  const user = useUser();
  if (user.isLoading)
    return (
      <nav className="mx-auto bg-[#6B46C1] w-screen dark:bg-gray-900"></nav>
    );
  if (user.data !== null && user.isSuccess) return <ProtectedHeader />;
  return (
    <>
      <nav className="mx-auto bg-[#6B46C1] w-screen dark:bg-gray-900">
        <div className="max-w-full flex items-center justify-items-center justify-center px-1 py-2">
          <div className="flex items-center flex-1">
            <Logo />
          </div>
          <div className="flex-1 px-4 py-1">
            <div
              className="justify-end w-full  items-center md:block md:w-auto ml-auto justify-end self-center"
              id="navbar-default"
            >
              <ul className="font-medium flex justify-end items-center text-white md:p-0 mt-4 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700">
                <li>
                  <Link
                    className="block py-2 bg-white rounded-lg hover:bg-gray-200 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={() =>
                      document.getElementById("myModal").showModal()
                    }
                  >
                    <div className="flex gap-1line-clamp-1 px-4 py-2 text-[#6B46C1]">
                      <LogOut />
                      Log In
                    </div>
                  </Link>

                  <LoginModal />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
