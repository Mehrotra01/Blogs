import React from "react";
import authService from "../appwrite/auth";
import { logOut } from "../store/features/authSlice";
import { useDispatch } from "react-redux";

function logOutBtn() {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    authService
      .logout() //this logout is a property of authService
      .then(() => {
        dispatch(logOut());
      })
      .catch((error) => console.log(error));
      // window.location.reload();
  };
  // add a navigate so that the userlogout then the screen can reload
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logOutHandler}
    >
      Logout
    </button>
  );
}

export default logOutBtn;
