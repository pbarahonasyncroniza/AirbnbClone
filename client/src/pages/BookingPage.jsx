import React, { useEffect, useState } from 'react'
import AccountNavegation from '../components/AccountNavegation'
import axios from "axios"
import PlaceImg from '../components/PlaceImg'

const BookingPage = () => {

  const [bookings, setBooking] = useState ([])
  useEffect (()=>{

      axios.get("/bookings").then(response =>{
        setBooking(response.data)
      })


  },[])

  return (

  <div className="">
    <AccountNavegation />
  
      <div className="">

      {bookings?.length > 0 && bookings.map((booking, index) => (
      <div className="flex" key={index}>
        < div className="">
               
        <div className="">
           <PlaceImg place={booking.place} />
        </div>
        <div className="">
            {booking.name}
            
        </div>
    </div>  
  </div>
))}



  </div>


  </div>
  )
}

export default BookingPage