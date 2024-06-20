import { useContext, useEffect, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import UserContext from "../components/UserContext";
import fetchUserData from "../components/AuthSession";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useUser } from "../api/user";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useUser()
  if (user.status === "success") {
    return (
      <>
        <h1>
          <b>Welcome, {user.data.displayName} you are logged in.</b>
        </h1>
        <p>This is EduCards</p>
      </>
    );
  }
}
