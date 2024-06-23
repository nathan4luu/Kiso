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

export default function Router() {
  const user = useUser();
  const isAuthenticated = user.data !== null && user.data !== undefined;

  console.log("isauth: " + isAuthenticated);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const Layout = () => {
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
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login/success" element={<LoginSuccess />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
