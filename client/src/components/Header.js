import { Link, useNavigate } from "react-router-dom";
import { useLogout, useUser } from "../api/user";
import { useQueryClient } from "@tanstack/react-query";
import LoginModal from "./LoginModal";
import Logo from "./Logo";
import ProtectedHeader from "./ProtectedHeader";
import { LogIn, LogOut } from "lucide-react";

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
          <div className="flex items-center flex-1 items-center">
            <Logo />
          </div>
          <div className="flex-1 px-4 py-1 items-center flex justify-end">
            <Link
              className="inline-block py-2 bg-white rounded-lg hover:bg-gray-200 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              onClick={() => document.getElementById("myModal").showModal()}
            >
              <div className="flex gap-1 line-clamp-1 px-4 py-2 text-[#6B46C1] justify-center">
                <LogIn />
                Log In
              </div>
            </Link>

            <LoginModal />
          </div>
        </div>
      </nav>
    </>
  );
}
