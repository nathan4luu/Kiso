import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Test from "../pages/Test";
import UserContext from "./UserContext";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Router() {
  const [user, setUser] = useState();

  async function fetchData() {
    await axios
      .get("http://localhost:4040/user", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          setUser(response.data._json.email);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const Layout = () => {
    return (
      <>
        <div className="justify-center space-y-4 h-screen">
          <Header />
          <div className="flex w-full  md:justify-center">
            <div className="border w-[1200px]">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  };
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={[user, setUser]}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/test" element={<Test />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
