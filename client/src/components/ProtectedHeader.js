import { Link, useNavigate } from "react-router-dom";
import { useLogout, useUser } from "../api/user";
import { useQueryClient } from "@tanstack/react-query";
import LoginModal from "./LoginModal";
import Logo from "./Logo";
import { X, Library, Search } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function ProtectedHeader() {
  const user = useUser();

  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const queryClient = useQueryClient();

  const logout = () => {
    logoutMutation.mutate();
    console.log(queryClient.isMutating && "mutating");
    navigate("/");
  };

  return (
    <>
      <nav className="mx-auto bg-[#6B46C1] w-screen dark:bg-gray-900">
        <div className="max-w-full flex items-center justify-items-center justify-center px-1 py-2">
          <div className="items-center flex-1">
            <Logo />
          </div>
          <div className="flex-1 px-4 py-1">
            <SearchBar />
          </div>
          <div className="flex-1 px-4 py-1">
            <div
              className="justify-end w-full  items-center md:block md:w-auto ml-auto justify-end self-center"
              id="navbar-default"
            >
              <ul className="font-medium flex justify-end items-center text-white md:p-0 mt-4 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700">
                <li>
                  <Link
                    to={`/user/${user.data.id}/library`}
                    className="block py-2 px-3 flex rounded-lg hover:bg-white hover:text-[#6B46C1] dark:hover:bg-gray-800 dark:hover:text-[#6B46C1]"
                  >
                    <Library />
                    <div className="pl-1 line-clamp-1"> Your library</div>
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 bg-white rounded-lg hover:bg-gray-200 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={logout}
                  >
                    <p className="line-clamp-1 px-4 py-2 text-[#6B46C1] whitespace-nowrap">
                      Log Out
                    </p>
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
