import { useEffect, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useLogout } from "../api/user";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const logoutMutation = useLogout();
  const navigate = useNavigate();
  const messages = [
    "Logging out... Time to let your brain absorb all that knowledge!",
    "What a great study session! An A+ is in your future!",
    "You're leaving? The flashcards are gossiping about you right now.",
    "Logging out... Even geniuses need a moment to reboot.",
    "Sheesh... after all that studying maybe I need to take a break.",
    "Till next time... Practice makes... well, slightly less terrible, right?",
    ""
  ];

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  const [message, setMessage] = useState(getRandomMessage());

  useEffect(() => {
    const logoutAndNavigate = async () => {
      logoutMutation.mutate();
      setTimeout(() => {
        navigate("/");
      }, 1500);
    };

    logoutAndNavigate();
  }, [logoutMutation, navigate]);

  return (
    <div className="w-screen h-screen">
      <div className="flex h-full w-full justify-center items-center">
        <div className="space-y-4">
          <LoadingSpinner />
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
