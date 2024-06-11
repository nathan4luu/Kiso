import logo from "../assets/images/logo192.png";
import axios from "axios";
import '@fontsource/shojumaru'

export default function Header() {
  return (
    <>
      <nav className="bg-purple-800 border-gray-200 w-screen border dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between px-1 py-2">
          <div className = "border-solid  border-purple-500 rounded-3xl px-4 py-1">
            <a
              href="/dashboard"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="font-shojumaru self-center text-3xl font-bold text-white whitespace-nowrap dark:text-purple-800">
                Kiso
              </span>
            </a>
          </div>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Blank
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Blank
                </a>
              </li>
              <li>
                <a
                  href="/test"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Test
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:4040/auth/google"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Log In
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
