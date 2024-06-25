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

export default function Router() {
  const user = useUser();
  const isAuthenticated = user.data !== null && user.data !== undefined;

  console.log("isauth: " + isAuthenticated);

  const PublicLayout = () => {
    return (
      <>
        <div className="justify-center space-y-4 h-screen">
          <Header />
          <div className="flex w-full  md:justify-center">
            <div className="w-[1200px]">
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
        <div className="justify-center space-y-4 h-screen">
          <ProtectedHeader />
          <div className="flex w-full  md:justify-center">
            <div className="w-[1200px]">
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
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/" element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/login/success" element={<LoginSuccess />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
