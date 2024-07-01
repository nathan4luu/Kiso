import { redirect, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../api/user";
import { useEffect, useState } from "react";
import CurrentUserLibrary from "../components/CurrentUserLibrary";

export default function UserLibrary() {
  const { userId } = useParams();
  const user = useUser();
  const navigate = useNavigate();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  useEffect(() => {
    if (user.data === null) {
      navigate("/");
    }
  }, [user, navigate]);
  useEffect(() => {
    if (user.data && user.data.id === userId) {
      setIsCurrentUser(true);
    }
  }, [user.data, userId]);

  if (user.data && user.fetchStatus !== "fetching") {
    return (
      <div>
        {isCurrentUser ? (
          <CurrentUserLibrary />
        ) : (
          <h1 className="text-3xl font-medium py-6">{userId}'s library</h1>
        )}
      </div>
    );
  }
}
