import logo from "../assets/images/logo192.png";
import axios from "axios";
import "@fontsource/shojumaru";
import { redirect, Navigate, useNavigate } from "react-router-dom";
import { useLogout, useUser } from "../api/user";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export default function Header() {
  const navigate = useNavigate();
  const user = useUser();
  const logoutMutation = useLogout();

  const redirecToGoogleSSO = async () => {
    const googleLoginURL = "http://localhost:4040/auth/google";
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      window.addEventListener(
        "message",
        (event) => {
          if (event.origin === "http://localhost:3000") {
            if (event.data === "authenticated") {
              console.log("Yay Authenticated");
              console.log("user data " + user.data);
              redirect("/dashboard");
            }
          }
        },
        false
      );
    }
  };
  const queryClient = useQueryClient();

  const logout = () => {
    logoutMutation.mutate();
    console.log(queryClient.isMutating && "mutating")
    navigate('/')
  };

  const isLoggedIn = user.data !== null;
  //console.log("isLoggedIn", isLoggedIn)
  return (
    <>
      <nav className="mx-auto bg-purple-800 border-gray-200 w-screen border dark:bg-gray-900">
        <div className="max-w-full flex flex-wrap items-center justify-between px-1 py-2">
          <div className="border-solid  border-purple-500 rounded-3xl px-4 py-1">
            <a
              href="/dashboard"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="font-shojumaru self-center text-3xl font-bold text-white whitespace-nowrap dark:text-purple-800">
                Kiso
              </span>
            </a>
          </div>
          <div
            className="hidden flex justify-end w-full md:block md:w-auto ml-auto justify-end px-4 py-1"
            id="navbar-default"
          >
            <ul className="font-medium flex justify-end flex-col text-white p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Blank
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Blank
                </a>
              </li>
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
                  onClick={redirecToGoogleSSO}
                  className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Log In
                </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
