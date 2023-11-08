import React, { useContext, useState } from 'react'
import { UserContext } from '../usercontext'
import { Navigate, Link, useParams } from "react-router-dom"
import axios from "axios"
import PlacesPages from './PlacesPages'
import AccountNavegation from '../components/AccountNavegation'


const ProfilePage = () => {

const {ready, user,setUser} = useContext(UserContext)
const [redirect, setRedirect] = useState(null)

let {subpage} = useParams()
if (subpage === undefined){
    subpage = "profile"
}

const logout = async () =>{
    await axios.post("/logout")
    setRedirect("/")
    setUser(null)
 
}


if(!ready){
    return "Loadind..."
}

if(ready && !user){
    return <Navigate to={"/login"} />
}


if(redirect){
  return  <Navigate to={redirect} />
}

  return (
    <div>
      <AccountNavegation />
      {subpage === "profile" && (
            <div className='text-center max-w-lg mx-auto mt-4'>
                Logged in as {user.name} {user.email}
                <button 
                onClick={logout}
                className='primary mt-4 text-white max-w-sm'>Logout</button>
            </div>
          )}
          {subpage === "places" && (
            <PlacesPages />
          )}
      
    </div>


  )
}

export default ProfilePage