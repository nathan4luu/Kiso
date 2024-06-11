import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../components/UserContext";
import fetchUserData from "../components/AuthSession";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  let value = ""
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:4040/user", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data) {
            setUser(response.data._json.email);
          } else {
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);
  console.log(user)
  return (
    <main>
      <h1>
        <b>Welcome, {user}, you are logged in.</b>
      </h1>
      <p>This is EduCards</p>
    </main>
  );
}
