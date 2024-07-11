import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../api/user";
import { useEffect } from "react";

export default function SearchResults() {
  const query = new URLSearchParams(useLocation().search).get("query");

  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.data === null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="pb-6">
      <div className="text-3xl font-medium py-6">Results for "{query}"</div>
    </div>
  );
}
