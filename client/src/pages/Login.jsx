import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
// import toast from 'react-hot-toast';

// Aimation on scroll - Zoom in animation
// import 'aos/dist/aos.css';
// import AOS from 'aos';
// AOS.init();

const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;
const inputCSS = "border-2 border-black p-2 sm:w-[300px]";

const Login = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  // allows Axios to include cookies or authentication tokens when making cross-origin requests, enabling access to protected resources across different domains.

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    // console.log(`User entered data `, input);
    try {
      // axios return a res not data therefore destructuring the data obj
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/users/login`,
        { email: input.email, password: input.password }
      );
      // console.log(data);
      if(data.status) {
        console.log("User Logged in");
        toast.success('User Logged in successfully');
        navigate("/");
      } else {
        console.log("User NOT logged in!");
        console.log(data.msg);
      }
    } 
    catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg);
        console.log(`Error in loginUser fun → ${error.response.data.msg}`);
      } else {
        console.log(`Error in loginUser fun → `,error);
      }  
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
        onSubmit={loginUser}
      >
        <h2 className="font-bold text-xl my-2">LOGIN</h2>

        <input
          className={inputCSS}
          type="email"
          name="email"
          value={input.email}
          onChange={(e) => handleChange(e)}
          placeholder="Email"
          required
        />
        <input
          className={inputCSS}
          type="password"
          name="password"
          value={input.password}
          onChange={(e) => handleChange(e)}
          placeholder="Password"
          required
        />

        <button className="my-3 bg-blue-500 p-2 rounded-xl font-bold hover:-translate-y-1 transition-all hover:scale-105">
          Submit
        </button>

        <div className="flex">
          <h2>
            Not registered?{" "}
            <span
              className="hover:cursor-pointer text-blue-600"
              onClick={() => navigate("/signup")}
            >
              Register
            </span>
          </h2>
        </div>
        <Link className="hover:cursor-pointer text-blue-600" to="/forgotPass">
          Forgot Password?
        </Link>
      </form>
    </main>
  );
};

export default Login;

// name is the name attribute of the input field, and value is the current value of the input field.
