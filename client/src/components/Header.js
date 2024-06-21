import "@fontsource/shojumaru";
import { useNavigate } from "react-router-dom";
import { useLogout, useUser } from "../api/user";
import { useQueryClient } from "@tanstack/react-query";
import LoginModal from "./LoginModal";
import Logo from "./Logo";

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
      <nav className="mx-auto bg-white border-gray-200 w-screen border dark:bg-gray-900">
        <div className="max-w-full flex flex-wrap items-center justify-between px-1 py-2">
          <Logo />
          <div
            className="hidden flex justify-end w-full md:block md:w-auto ml-auto justify-end px-4 py-1"
            id="navbar-default"
          >
            <ul className="font-medium flex justify-end flex-col text-purple-600 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700">
              <li>
                <a
                  href="/test"
                  className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Test
                </a>
              </li>
              <li>
                {isLoggedIn ? (
                  <button
                    onClick={logout}
                    className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={() =>
                      document.getElementById("myModal").showModal()
                    }
                  >
                    Log In
                  </button>
                )}
                <LoginModal />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
