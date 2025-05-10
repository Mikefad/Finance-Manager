import React from 'react'
import { useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Login = ({setLoggedin}) => {

  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[err, setError] = useState("");

  const navigate = useNavigate();

  const recordLogin = () => {
    const now = new Date();
    const monthKey = `logins-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
    const count = parseInt(localStorage.getItem(monthKey)) || 0;
    localStorage.setItem(monthKey, count + 1);
  };

  const clearOldLoginData = () => {
    const now = new Date();
    const currentKey = `logins-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("logins-") && key !== currentKey) {
        localStorage.removeItem(key);
      }
    });
  };
  
  // You can call this after login if you only want to keep the current month
  
  

  async function handlesubmit(){
      let add = "Check"
      let backlist = {username, password};
      let details = {add, backlist};

      try{

          if (username && password){
              let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/`,{
                  method: "POST",
                  headers : {"Content-Type": "application/json"},
                  body: JSON.stringify(details),
                  credentials: 'include'
              });

              const feedback = await response.json();
  
              if (feedback.success){
                setError(feedback.message);
                // If login is successful, navigate to the Todo page
                localStorage.setItem("loggedin", "true");
                setLoggedin(true)
                recordLogin();
                clearOldLoginData();

                navigate('/');
              } 
              else {
      
                setError(feedback.message);
                
              
              }
          }
          else{
              setError("Enter username or password");
          }
  
          
      }
      catch(error){
          console.log(error);
          setError(error)
      }
  }
    


  return (
    <div className='h-[65vh] z-10 '>
        <div className="h-[30vh] py-3 px-5 text-[70px] md:text-[80px] lg:text-[80px] text-gray-400">ℳdev</div>
        <div className="w-[100vw] h-[50vh] flex flex-col justify-center items-center">

            <h1 className="text-center mb-10px text-gray-400">Sign in to your Account</h1>
            <h3 className="text-center text-[15px] font-sans font-light text-[#7787ad]">Don't have an account? <a href = ""> Sign Up </a></h3>


            <div className="flex flex-col justify-center items-center shadow-lg rounded-xl p-[70px] h-[435px] w-[330px] sm:w-[530px] mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-md ">
                Username:
                <input type="text" className="w-[290px] sm:w-[400px] h-[30px] bg-[rgb(237,244,255)] border-none p-[10px] m-[25px] text-black" value={username} onChange={(e) => {setUsername(e.target.value)}} />

                Password:
                <input type="password" className="w-[290px] sm:w-[400px] h-[30px] text-black bg-[rgb(237,244,255)] border-none p-[10px] m-[25px]" value={password} onChange={(e) => {setPassword(e.target.value)}}/>

                
                <input type="submit" className="w-[290px] sm:w-[400px] h-[45px] rounded-md bg-[rgb(7,40,91)] border-none flex justify-center m-[25px] cursor-pointer" onClick = {handlesubmit}/>
                
                

                <div className='text-center'>{err.message}</div>
            </div>

        </div>
    </div>
  )
}

export default Login
