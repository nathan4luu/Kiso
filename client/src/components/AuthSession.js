import axios from "axios";
import { useNavigate } from "react-router-dom";

const fetchUserData = async () => {
  try {
    const response = await axios.get("http://localhost:4040/user", {
      withCredentials: true,
    });
    if (!response.data) {
      return null;
    }
    return response.data._json.email;
  } catch (err) {
    //console.log(err);
    return null;
  }
};

export default fetchUserData;
