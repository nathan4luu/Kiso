import { useContext, useEffect } from "react";
import UserContext from "../components/UserContext";
import { useNavigate } from "react-router-dom";

export default function Test() {
  const [userFromContext] = useContext(UserContext);
  const navigate = useNavigate();


  //console.log(userFromContext, typeof(userFromContext))
  if (userFromContext === undefined) {
    //window.location.href = "/"
    console.log('hellow')
  }
  return (
    <>
      <h1><b>Hi {userFromContext} </b></h1>
      <p>This is EduCards</p>
    </>
  );
}
