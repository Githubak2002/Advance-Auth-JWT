import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import toast from 'react-hot-toast';

// Aimation on scroll - Zoom in animation
// import 'aos/dist/aos.css';
// import AOS from 'aos';
// AOS.init();

const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;
const inputCSS = "border-2 border-black p-2 sm:w-[300px]";

const ForgotPass = () => {

  const navigate = useNavigate();
  const [userEmail,setUserEmail] = useState("");

  const forgotPassHandler = async (e) => {
    e.preventDefault();
    console.log(`User entered data `, userEmail);
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/users/forgotPass`,
        { email: userEmail}
      );
      if (data) {
        // window.alert("Email sent");
        toast.success("Please Check your Email")
        console.log("Email sent!");
      } else {
        toast.error("User NOT found!")
        console.log("User NOT found!");
      }
    } catch (error) {
      console.log(`Error in forgotPassHandler fun → ${error}`);
    }
  };

  return (
    <main
      // data-aos="zoom-in"
      className="h-screen flexCenter mx-auto container"
    >
      <form
        className=" shadow-2xl border-2 border-black mt-6 px-4 py-6 flex-col flex items-center gap-y-3 justify-center"
        action=""
        onSubmit={forgotPassHandler}
      >
        <h2 className="font-bold text-xl my-2 uppercase">Forget Password</h2>

        <input
          className={inputCSS}
          type="email"
          name="email"
          // value={input.email}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <button className="my-3 bg-blue-500 p-2 rounded-xl font-bold hover:-translate-y-1 transition-all hover:scale-105">
          Submit
        </button>

        <div className="flex">
          <h2>
            Home
            <span
              className="hover:cursor-pointer text-blue-600"
              onClick={() => navigate("/")}
            >
              {" "}
              Register{" "}
            </span>
          </h2>
        </div>
      </form>
    </main>
  );
};

export default ForgotPass;

// name is the name attribute of the input field, and value is the current value of the input field.
