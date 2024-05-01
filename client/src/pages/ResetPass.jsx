import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

// Aimation on scroll - Zoom in animation
// import 'aos/dist/aos.css';
// import AOS from 'aos';
// AOS.init();

const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;
const inputCSS = "border-2 border-black p-2 sm:w-[300px]";

const ResetPass = () => {

  const navigate = useNavigate();
  const [pass,setPass] = useState("");
  const {token} = useParams();

  const resetPassHandler = async (e) => {
    e.preventDefault();
    // console.log(`New pass `, pass);
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/users/resetPass/`+token,
        { newPass: pass}
      );
      console.log("Data from pass Reset route - ",data);
      if (data) {
        toast.success(data.msg);
        console.log("Password Reset Successfully!");
        navigate('/login');
      } else {
        console.log("Could NOT reset pass (invalid TOKEN)");
      }
    } catch (error) {
      console.log(`Error in resetPassHandler fun → ${error}`);
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
        onSubmit={resetPassHandler}
      >
        <h2 className="font-bold text-xl my-2 uppercase">Reset Password</h2>

        <input
          className={inputCSS}
          type="password"
          // name="newPass"
          // value={input.email}
          onChange={(e) => setPass(e.target.value)}
          placeholder="New Password"
          required
        />

        <button className="my-3 bg-blue-500 p-2 rounded-xl font-bold hover:-translate-y-1 transition-all hover:scale-105">
          Submit
        </button>

        {/* <div className="flex">
          <h2>
            Home Page - 
            <span
              className="hover:cursor-pointer text-blue-600"
              onClick={() => navigate("/")}
            >
              {" "}
              Home{" "}
            </span>
          </h2>
        </div> */}
      </form>
    </main>
  );
};

export default ResetPass;

// name is the name attribute of the input field, and value is the current value of the input field.
