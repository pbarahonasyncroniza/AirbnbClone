import React, { useState } from 'react'
import {differenceInCalendarDays} from "date-fns"
import axios from 'axios'
import { Navigate } from "react-router-dom"

const BookingWigget = ({place}) => {

    const [checkIn, setCheckin] = useState("")
    const [checkOut, setcheckout] = useState("")
    const [numberGuests, setNumberGuests] = useState("")
    const [name, setName] =useState("")
    const [phone, setPhone] = useState("")
    const [price, setPrice] = useState("")
    const [redirect, setRedirect] = useState("")
    

    
    const bookThisPlace = async ()=>{
       
        const response = await axios.post("/bookings",{
        checkIn,
        checkOut,
        numberGuests,
        name,
        phone,
        place:place._id,
        price:numberOfNights * place.price    
        })


        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
                
    }

    if(redirect){
        return <Navigate to={redirect}/>

    }
    
    
    let numberOfNights=0
    if(checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkIn), new Date(checkOut))
    }
    
    

  return (
    
    <div className="">
            <div className=" grid grid-cols-1  md:grid-cols-[2fr_1fr] mt-6">
                <div>

                    <h3 className="font-bold ml">Description</h3>
                    <h2 className="text-sm mr-4 leading-4 text-gray-500">{place.description}</h2>
                    <div className="mt-4">
                    <h2 className="text-sm">Ckeck-In: {place.checkIn}</h2>
                    <h2 className="text-sm">Check-Out: {place.checkOut}</h2>
                    <h2 className="text-sm">Max Guests: {place.maxGuests}</h2>
                </div>
                </div>

                <div className="bg-gray-300 rounded-2xl py-2 px-2"> 
                    <h3 className="text-center font-semibold">$ {place.price} CLP / per night</h3>
                    <div className='flex'>
                        <div className="px-4 bg-gray-300 ">
                            <label htmlFor="" className="text-sm ">check In:</label>
                            <input 
                            value={checkIn}
                            onChange={(e)=> setCheckin(e.target.value)}
                            className='rounded-xl text-sm' type="date" />
                        </div>
                        <div className="bg-gray-300">
                            <label htmlFor="" className="text-sm">check out:</label>
                            <input  
                            value={checkOut}
                            onChange={(e)=> setcheckout(e.target.value)}
                            className='rounded-xl text-sm' type="date" />
                        </div>

                    </div>
                    <div className="py-3 px-4  bg-gray-300">
                        <div>
                        <label htmlFor="" className="text-sm mb-2">number of guess</label>
                        </div>
                        <input 
                            className=" w-full border-t-cyan-500 rounded-xl" 
                            type="number" 
                            value={numberGuests}
                            onChange={(e)=>setNumberGuests(e.target.value)}
                        />
                    </div >

                    <div className="">
                     
                        <div className="">
                            <label htmlFor="" className="">your full name</label>
                            <input 
                            className=" w-full border-t-cyan-500 rounded-xl" 
                            type="text"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                                                       
                            />
                            <label htmlFor="" className="">Phone number</label>
                            <input 
                            className=" w-full border-t-cyan-500 rounded-xl" 
                            type="tel" 
                            value={phone}
                            onChange={(e)=> setPhone(e.target.value)}
                            />

                        </div>  
                            </div>
                                    <button onClick={bookThisPlace} className=" primary  mt-3 shadow-xl  text-sm text-white">
                                        Book Now
                                        <span className='text-sm'>{numberOfNights} night</span>
                                        <span>{numberOfNights * place.price} Total + taxs</span>
                                    </button>
                            </div>
                            
                    </div>    
                            <div className=" bg-white mt-6 border-t-3">
                                <h2 className="font-bold mt-5">Extra info:</h2>
                                <h2 className=" text-sm leading-4 text-gray-500">{place.extraInfo}</h2>
                            </div>     
            </div>    
  )
}

export default BookingWigget
