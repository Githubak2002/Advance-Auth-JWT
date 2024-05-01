import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const backendURl = import.meta.env.VITE_BACKEND_BASE_URL;

const Home = () => {
  const logoutHandler = async () => {
    const logOut = await axios.get(`${backendURl}/api/v1/users/logout`);
    try {
      if (logOut) {
        // toast.success("Log out successfull!");
        // console.log("logOut - ", logOut);
        toast.success(logOut.data.msg);
      }
    } catch (err) {
      toast.error("Error in log out!");
      console.log("Error from Logout Handler - ", err);
    }
  };
  return (
    <section className="flexCenter flex-col h-screen gap-6 text-4xl">
      <Link to="/signup">SignUp</Link>
      <Link to="/login">Login</Link>

      <button className="mt-5 p-2 border-black border rounded-xl" onClick={logoutHandler}>
        Logout
      </button>
    </section>
  );
};

export default Home;
