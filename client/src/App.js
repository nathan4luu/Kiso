import "./App.css";
import Router from "./components/Router";
import UserContext from "./components/UserContext";
import fetchUserData from "./components/AuthSession";
import axios from "axios";
import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  
  return (
    <>
        <Router />
    </>
  );
}
