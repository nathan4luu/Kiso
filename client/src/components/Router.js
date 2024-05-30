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

export default function Router() {
  const Layout = () => {
    return (
      <>
        <div className="justify-center space-y-4 h-screen">
          <Header />
          <div className="flex w-full  md:justify-center">
            <div className="border  w-[1200px]">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  };

  const BrowserRoutes = () => {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  };

  return <BrowserRoutes />;
}
