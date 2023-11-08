import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios'
import BookingWigget from '../components/BookingWigget'
import PlaceImg from '../components/PlaceImg'

const Placepage = () => {
   
    
    const {id} = useParams()
    const [place,setPlace] = useState("")
    const [showAllPhotos, setShowAllPhotos] = useState(false) 

    useEffect(()=>{

        if(!id){
            return

        }
            axios.get("/places/" + id).then(response =>{
                setPlace(response.data)

            })

    },[id])

    if(!place) return ""

    if(showAllPhotos){
        return(
            <div className="absolute bg-gray min-w-full min-h-screen ">
            <div className="gap-2">
                <button onClick={()=> setShowAllPhotos(false)} className="flex bg-gray-500 rounded-2xl px-2 fixed shadow shadow-black mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                </svg>

                 back
                </button>
               
                {place.photo.length > 0 && place.photo.map((photo, index)=>(
                    <div className=""  key={index}>
                <div className="">
                        <img src={"http://localhost:8080/uploads/"+photo} />
                </div>
                </div>
                ))}          
                </div> 
                </div>
            )
    }

  return (
    <div className='mt-4 bg-gray-200 px-8 py-4'>

      <h1 className='text-xl'> {place.title} </h1>
      
      <a className='flex gap-1 font-semibold underline' target="_blank" href={"http://maps.google.com/?q="+place.address} >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>

        
        
        {place.address}</a>
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] ">
                <div>
                {place.photo?.[0] && (
                    <div>
                    <img onClick={()=> setShowAllPhotos(true)} 
                    className=" aspect-square object-cover rounded-2xl cursor-pointer overflow-hidden shadow-md  " 
                    src={"http://localhost:8080/uploads/"+place.photo[0]}/>
                    </div>
                )}
                </div>
                <div className='grid '> 
                {place.photo?.[1] && (
                    <img  onClick={()=> setShowAllPhotos(true)} className=" aspect-square object-cover rounded-2xl cursor-pointeroverflow-hidden shadow-md "src={"http://localhost:8080/uploads/"+place.photo[1]}/>
                )}
            
                {place.photo?.[2] && (
                    <img onClick={()=> setShowAllPhotos(true)} className=" aspect-square object-cover rounded-2xl cursor-pointer overflow-hidden shadow-md "src={"http://localhost:8080/uploads/"+place.photo[2]}/>
                )}
                </div>
            </div>
                    
           <button onClick={()=> setShowAllPhotos(true)} className=" flex relative  text-sm px-2 py-1 mt-2  bg-gray-500 text-white rounded-2xl shadow shadow-black">show more photos
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>                    
           </button>
                                 
            </div>
                    <BookingWigget place={place} />




        </div>
  )
}

export default Placepage