import "@fontsource/shojumaru";
import { Link, useNavigate } from "react-router-dom";
import { useLogout, useUser } from "../api/user";
import { useQueryClient } from "@tanstack/react-query";
import LoginModal from "./LoginModal";
import Logo from "./Logo";
import { Plus, Library, Search } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const user = useUser();
  const logoutMutation = useLogout();

  const queryClient = useQueryClient();

  const logout = () => {
    logoutMutation.mutate();
    console.log(queryClient.isMutating && "mutating");
    navigate("/");
  };

  const isLoggedIn = user.data !== null;
  //console.log("isLoggedIn", isLoggedIn)
  return (
    <>
      <nav className="mx-auto bg-[#6B46C1] w-screen dark:bg-gray-900">
        <div className="max-w-full flex items-center justify-items-center justify-center px-1 py-2">
          <div className="flex items-center flex-1">
            <Logo />
          </div>
          <div className="flex-1 flex">
            <div className="pr-3 relative group">
              <button className="flex items-center justify-center w-8 h-8 rounded-full transition duration-300 hover:bg-white group">
                <Plus className="text-white w-6 h-6 transition duration-300 group-hover:text-[#6B46C1]" />
              </button>
            </div>
            <div className="flex gap-2 text-gray-600 border border-white bg-white rounded-lg w-full px-4 py-1">
              <Search />
              Search
            </div>
          </div>
          <div className="flex-1 px-4 py-1">
            <div
              className="justify-end w-full  items-center md:block md:w-auto ml-auto justify-end self-center"
              id="navbar-default"
            >
              <ul className="font-medium flex justify-end items-center text-white md:p-0 mt-4 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700">
                <li>
                  <Link
                    to={"/user/"}
                    className="block py-2 px-3 flex rounded-lg hover:bg-white hover:text-[#6B46C1]"
                  >
                    <Library />
                    <div className="pl-1 line-clamp-1"> Your library</div>
                  </Link>
                </li>
                <li>
                  {isLoggedIn ? (
                    <Link
                      className="block py-2 bg-white rounded-lg hover:bg-gray-200 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      onClick={logout}
                    >
                      <p className="line-clamp-1 px-4 py-2 text-[#6B46C1]">
                        Log Out
                      </p>
                    </Link>
                  ) : (
                    <Link
                      className="block py-2 bg-white rounded-lg hover:bg-gray-200 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      onClick={() =>
                        document.getElementById("myModal").showModal()
                      }
                    >
                      <p className="line-clamp-1 px-4 py-2 text-[#6B46C1]">
                        Log In
                      </p>
                    </Link>
                  )}
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
