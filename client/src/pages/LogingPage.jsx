import React, { useContext, useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import { UserContext } from '../usercontext'

const LogingPage = () => {

  const [email, setEmail] = useState ("")
  const [password,  setPassword] = useState ("")
  const [redirect, setRedirect] = useState(false)
  const {setUser} = useContext(UserContext);
 
  const handleLoginSubmit = async (e) =>{
    e.preventDefault();
    try{
     const {data} = await axios.post("/login", {email,password})
      setUser(data)
      alert("Login successful")
      setRedirect(true)

    } catch{
      alert("Login Fail")
    }
  }

    if(redirect){
      return <Navigate to={"/account"} />
    }

    
  return(
   
  <div className='mt-4 grow flex items.center justify-around'>
    <div>
      <h1 className='text-xl text-center mb-4'>Login</h1>
        <form 
        onSubmit={handleLoginSubmit} 
        className='max-w-md mx-auto '>
          <input
          type="email" 
          placeholder='your Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <input 
          type="password" 
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />  
          <button className='primary mt-2 text-xl' >Login</button>
        <div className='text-center'>
          Don't have an account yet?
        <Link to={"/register"} className='text-center text-xl underline'>Register Now</Link>
      </div>    
    </form>
    </div>
  </div>
  )
}
export default LogingPage
































