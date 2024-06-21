import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../api/user";

export default function Home() {
  const navigate = useNavigate();
  const user = useUser();
  useEffect(() => {
    if (user.data) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (user.data === null) {
    return (
      <main>
        <h1>
          <b>Homepage</b>
        </h1>
        <p>This is EduCards</p>
      </main>
    );
  }
}
