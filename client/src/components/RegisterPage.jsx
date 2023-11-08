import React, { useState} from 'react'
import { Link } from "react-router-dom"
import axios from 'axios';

const RegisterPage = () => {

  const [name, setName]=useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")

  const handleSubmit = (e) =>{
        e.preventDefault();
    try{
    axios.post("/register",{
    name,
    email,
    password

    })
      alert("Registration successful")
   } catch{
    alert("Registration Fail, Please try again later")
   }
  }


  return (
    <div className='mt-4 grow flex items.center justify-around'>
     <div>
      <h1 className='text-xl text-center mb-4'>Register</h1>
        <form 
        onSubmit={handleSubmit}
        action="" className='max-w-md mx-auto '>
          <input 
          type="text" 
          placeholder='John Doe'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
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
          <button className='primary mt-2 text-xl' >Register</button>
            <div className='text-center'>
              All ready a menber
        <Link to={"/login"} className='text-center text-xl underline'>Back to Login</Link>
      </div>    
    </form>
    </div>
  </div>
  )
}

export default RegisterPage