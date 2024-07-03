import { Link, useNavigate } from "react-router-dom";
import { useLogout, useUser } from "../api/user";
import { useQueryClient } from "@tanstack/react-query";
import LoginModal from "./LoginModal";
import Logo from "./Logo";
import { Settings, Library, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";

export default function ProtectedHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickOnButton, setClickOnButton] = useState(false);
  const dropdownRef = useRef(null);

  const user = useUser();

  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const queryClient = useQueryClient();

  const logout = () => {
    logoutMutation.mutate();
    console.log(queryClient.isMutating && "mutating");
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
    }
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
              className="justify-end w-full items-center md:block md:w-auto ml-auto justify-end self-center"
              id="navbar-default"
            >
              <ul className="font-medium flex justify-end items-center gap-2 text-white">
                <li>
                  <Link
                    to={`/user/${user.data.id}/library/0`}
                    className="block py-2 px-3 flex rounded-lg hover:bg-white hover:text-[#6B46C1] dark:hover:bg-gray-800 dark:hover:text-[#6B46C1]"
                  >
                    <Library />
                    <div className="pl-1 line-clamp-1"> Your library</div>
                  </Link>
                </li>
                {/*<li>
                  <Link
                    className="block py-2 bg-white rounded-lg hover:bg-gray-200 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={logout}
                  >
                    <p className="line-clamp-1 px-4 py-2 text-[#6B46C1] whitespace-nowrap">
                      Log Out
                    </p>
                  </Link>
                </li>*/}
                <li>
                  <div className="relative flex items-center inline-block">
                    <button
                      type="button"
                      id="profile-button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={toggleDropdown}
                    >
                      <img
                        src={user.data.pfp}
                        alt="Profile"
                        className=" rounded-full w-10 h-10"
                      ></img>
                    </button>
                    {isOpen && (
                      <div
                        ref={dropdownRef}
                        className=" absolute mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 transition-opacity"
                        style={{
                          top: "100%",
                          right: 0,
                        }}
                      >
                        <div className="py-1">
                          <a
                            href="#"
                            className="flex gap-2 block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          >
                            <Settings strokeWidth={2}/>
                            Settings
                          </a>
                          <hr className="my-1" />
                          <Link
                            onClick={logout}
                            className="flex gap-2 block px-4 py-2 text-red-500 hover:bg-gray-200"
                          >
                            <LogOut strokeWidth={2}/>
                            Logout
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
