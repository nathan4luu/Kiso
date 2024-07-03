import { useState,  } from "react";
import GoogleLogo from "../assets/images/google-icon.svg";
import { useUser } from "../api/user";
import { redirect } from "react-router-dom";

export default function LoginModal() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const user = useUser();


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
  return (
    <dialog id="myModal" className="modal">
      <div className="modal-box text-black">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-semibold text-xl ">Login</h3>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-xs">CONTINUE WITH</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <button
          disabled={googleLoading}
          onClick={async () => {
            setGoogleLoading(true);
            redirecToGoogleSSO();
          }}
          className="w-full hover:bg-gray-200 rounded-lg border"
        >
          <div className="flex justify-center py-2">
            <img src={GoogleLogo} alt="google" width="15" height="15" />
            <p className="px-2">Google</p>
          </div>
        </button>
      </div>
    </dialog>
  );
}
