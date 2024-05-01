import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
// import toast from 'react-hot-toast';

// Aimation on scroll - Zoom in animation
// import 'aos/dist/aos.css'; 
// import AOS from 'aos';
// AOS.init();

const baseURl = import.meta.env.VITE_BACKEND_BASE_URL;
const inputCSS = "border-2 border-black p-2";
const SignUp = () => {

  const navigate = useNavigate();
  const [input,setInput] = useState({
    name:"",
    email:"",
    password:""
  })
  const handleChange = (e) => {
    const {name,value} = e.target;
    setInput({...input,[name]:value});
  }

  const registerUser = async (e) => {
    e.preventDefault();
    console.log(`User data `, input);
    try {
      const {data} = await axios.post(`http://localhost:8080/api/v1/users/signup`,{userName:input.name,email:input.email,password:input.password});
      console.log("data is ",data);
      if(data){
        console.log("User registered");
        navigate('/login');
      }
      else{
        console.log("User NOT registered");
      }
    } catch (error) {
      console.log(`Error in registerUser fun → ${error}`);
    }
  }

  return (
    <main 
    // data-aos="zoom-in"
    className='h-screen flexCenter mx-auto container'>

      <form className=' shadow-2xl border-2 border-black mt-6 px-4 py-6 flex-col flex items-center gap-y-3 justify-center' action="" onSubmit={registerUser}>

      <h2 className='font-bold text-xl my-2'>REGISTER</h2>

      <input className={inputCSS} type="text" name='name' value={input.name} onChange={(e) => handleChange(e)} placeholder='Name' required/>
      <input className={inputCSS} type="email" name='email' value={input.email} onChange={(e) => handleChange(e)} placeholder='Email' required/>
      <input className={inputCSS} type="password" name='password' value={input.password} onChange={(e) => handleChange(e)} placeholder='Password' required/>

      <button className='my-3 bg-blue-500 p-2 rounded-xl font-bold hover:-translate-y-1 transition-all hover:scale-105'>Submit</button>
      
      <div className='flex'>
        <h2>Already registered?  
        <span className='hover:cursor-pointer text-blue-600' onClick={()=> navigate('/login')} > Login </span>
        </h2>
      </div>
      </form>

    </main>
  )
}

export default SignUp


// name is the name attribute of the input field, and value is the current value of the input field.