import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../api/user";
import { useEffect } from "react";

export default function SearchResults() {
    const query = new URLSearchParams(useLocation().search).get('query');

    const user = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.data === null) {
          navigate("/");
        }
      }, [user, navigate]);
      
    return (
        <>
        Results for "{query}"
        </>
    )

}