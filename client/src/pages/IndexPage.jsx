import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"

const IndexPage = () => {

  const [places, setPlaces] = useState ([])

  useEffect(()=>{

    axios.get("/places").then(response => {
      setPlaces(response.data)
      
    })


  },[])



    return (
      
        <div 
        className='mt-4 gap-x-6 gap-y-6  grid grid-cols-2 md:grid-cols-3 lg:gris-cols-6 '
        >
          {places.length > 0 && places.map((place,index) =>(
            <div className=""key={index}>
            
            <Link to={"/place/" + place._id}>
                <div className='bg-black-500 flex'>
                    {place.photo?.[0] && (
                      <img className="rounded-xl object-cover aspect-square mt-2" src={"http://localhost:8080/uploads/" + place.photo?.[0]}/>
                    )}  
                </div>            
               <h6 className='text-start truncate leading-4'> {place.title}</h6>
               <h3 className='text-sm text-start font-bold leading-4'> {place.address}</h3>
               <h3 className='text-sm text-start  leading-4'> $ {place.price} CL per night</h3>
             </Link>
             </div>  

          ))}
          </div>
      
       )
}

export default IndexPage