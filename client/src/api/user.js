import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function getUser() {
  try {
    const response = await axios.get("http://localhost:4040/user", {
      withCredentials: true,
    });
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

export const useUser = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled:
      queryClient.getQueryData("user") !== null,
  });
};

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

      console.log("logged out");
    },
  });
};
