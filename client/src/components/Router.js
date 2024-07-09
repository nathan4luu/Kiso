import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import { LoginSuccess } from "../pages/LoginSuccess";
import { useUser } from "../api/user";
import ProtectedHeader from "./ProtectedHeader";
import UserLibrary from "../pages/UserLibrary";
import DeckDetails from "../pages/DeckDetails";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import SearchResults from "../pages/SearchResults";

export default function Router() {
  const user = useUser();

  const isAuthenticated = user.data !== null && user.data !== undefined;

  console.log("isauth: " + isAuthenticated);
  console.log("user: " + user.data)

  const PublicLayout = () => {
    return (
      <>
        <div className="flex flex-col justify-between min-h-screen overflow-x-hidden">
          <Header />
          <div className="flex bg-[#ebe6f5] justify-center flex-1 w-full overflow-hidden p-4">
            <div className="shadow-lg rounded-lg bg-gray-50 border border-gray-200 w-full max-w-[1200px] px-4 md:px-6 ">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  };
  const ProtectedLayout = () => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return (
      <>
        <div className="flex flex-col justify-between min-h-screen overflow-x-hidden">
          <ProtectedHeader />
          <div className="flex bg-[#ebe6f5] justify-center flex-1 w-full overflow-hidden p-4">
            <div className="shadow-lg rounded-lg bg-gray-50 border border-gray-200 w-full max-w-[1200px] min-w-[800px] px-4 md:px-6 ">
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
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route exact path="/" element={<Home />} />
          </Route>

          <Route path="/" element={<PublicLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user/:userId/library/:pageId?" element={<UserLibrary />} />
            <Route path="/decks/:deckId" element={<DeckDetails />} />
            <Route path="/search" element={<SearchResults />} />
          </Route>
          

          <Route path="/login/success" element={<LoginSuccess />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
