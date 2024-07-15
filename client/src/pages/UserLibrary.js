import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../api/user";
import { useEffect, useState } from "react";
import CurrentUserLibrary from "../components/CurrentUserLibrary";
import LoadingSpinner from "../components/LoadingSpinner";

export default function UserLibrary() {
  const { userId, pageId } = useParams();
  const num = parseInt(pageId);
  const isInvalidNum = isNaN(num) || num < 0 || num > 2;

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
      if (isInvalidNum) {
        navigate(`/user/${userId}/library/0`);
      }
    }
  }, [user.data, userId, isInvalidNum, navigate]);

  if (user.isLoading) {
    return <LoadingSpinner />;
  }
  if (user.data && user.fetchStatus !== "fetching") {
    return (
      <div>
        {isCurrentUser ? (
          <CurrentUserLibrary userId={userId} pageId={pageId} />
        ) : (
          <h1 className="text-3xl font-medium py-6">{userId}'s library</h1>
        )}
      </div>
    );
  }
}
