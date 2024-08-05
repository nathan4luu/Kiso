import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../api/user";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import LoginModal from "../components/LoginModal";

export default function Home() {
  const navigate = useNavigate();
  const user = useUser();
  useEffect(() => {
    if (user.data) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  if (user.isLoading) {
    return <LoadingSpinner />;
  }
  if (user.data === null) {
    return (
      <main className="flex h-full items-center justify-center">
        <div>
          <div className="flex text-7xl">
            <div className="mr-3 font-bold">This is</div>
            <p className="font-shojumaru text-purple-800">Kiso</p>
          </div>
          <div className="flex justify-center text-xl mt-4 font-semibold text-gray-500">
            Limitless learning. Mastery made easy.
          </div>
          <div className="flex justify-center mt-2">
            <Link
              className="inline-block py-2 bg-purple-secondary rounded-lg hover:bg-purple-main md:p-0"
              onClick={() => document.getElementById("myModal").showModal()}
            >
              <div className="flex gap-1 line-clamp-1 px-4 py-2 text-[#6B46C1] hover:text-white justify-center">
                Get Started
              </div>
            </Link>
          </div>

          <LoginModal />
        </div>
      </main>
    );
  }
}
