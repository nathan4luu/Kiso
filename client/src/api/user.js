import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function getUser() {
  try {
    const response = await axios.get("http://localhost:4040/user", {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    } else {
      console.error(error);
      throw error;
    }
  }
}

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

async function logout() {
  await axios.post(
    "http://localhost:4040/logout",
    {},
    {
      withCredentials: true,
    }
  );
}

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      navigate("/");
      console.log("logged out");
    },
  });
};
