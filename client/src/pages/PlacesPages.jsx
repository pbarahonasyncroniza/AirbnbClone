import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

import AccountNavegation from '../components/AccountNavegation'


const PlacesPages = () => {

    const [places,setPlaces] =useState ("")

    useEffect(()=>{
      axios.get("/user-places").then (({data})=>{
            setPlaces(data)
      })
     }, [])


      
  
  return (
    <div>
        <AccountNavegation />
        
        <div className='text-center mt-4'>
            <Link className='inline-flex gap- 2 bg-primary text-white rounded-full py-2 px-4 ' to={"/account/places/new"}>         
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add New Places
            </Link>      
            <div className='mt-6'>
              {places.length > 0 && places.map((place, index) => (
                <Link to={"/account/places/" + place._id}  
                className="mt-4 cursor-pointer flex bg-gray-100 rounded-2xl"
                key={index}>
                 <div className='w-32 h-32 bg-gray-500 m-4 grow shrink-0'>
                    {place.photo.length > 0 && (
                    <img className="object-cover"src={"http://localhost:8080/uploads/" + place.photo[0]} alt=""/>
                )}
                </div>   
                <div>
                    <h2 className='text-2xl '>{place.title}</h2>
                    <p className=''>{place.description}</p>
                    </div>
                </Link>
              ))}

            </div>   
        </div>
    </div>
  )
}

export default PlacesPages