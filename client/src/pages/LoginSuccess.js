import { useEffect } from "react";
import { useUser } from "../api/user";
import { useNavigate } from "react-router-dom";

export function LoginSuccess() {
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.data) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="items-center">
        <p> One step closer to studying with </p>
        <p></p>
        <div className="flex row">
          <p className="font-shojumaru self-center text-purple-800"> Kiso</p>
          <p>...</p>
        </div>
      </div>
    </div>
  );
}
