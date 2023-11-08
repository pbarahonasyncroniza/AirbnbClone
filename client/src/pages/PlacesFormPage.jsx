import React, {useEffect, useState} from 'react'
import PhotosUploader from '../components/PhotosUploader'
import axios from "axios"
import Perks from '../components/Perks'
import { Navigate, useParams } from "react-router-dom"
import AccountNavegation from '../components/AccountNavegation'



const PlacesFormPage = () => {
    
        const {id} = useParams();
        const [title, setTitle] = useState("")
        const [address, setAddress] = useState("")
        const [description, setDescription] = useState("")
        const [extraInfo, setExtraInfo] = useState("")
        const [addedPhoto, setAddedPhoto] = useState ("")
        const [maxGuests, setMaxGuests] = useState(1)
        const [checkIn , setCheckIn] =useState ("")
        const [checkOut, setCheckOut] =useState ("")
        const [perks, setPerks] = useState("")
        const [price, setPrice] = useState ("")
        const [redirect, setRedirect] = useState(false)

     
        useEffect(()=>{
            if(!id){
            }
                axios.get("/places/" + id).then (response=>{
                    const {data} = response;
                    setTitle(data.title),
                    setAddress(data.address),
                    setAddedPhoto(data.photo)
                    setDescription(data.description),
                    setExtraInfo(data.extraInfo)
                    setCheckIn(data.checkIn),
                    setCheckOut(data.checkOut)
                    setMaxGuests(data.maxGuests)
                    setPrice(data.price)
                    setPerks(data.perks)

                })
        }, [id])

        const handleSubmit = (e)=>{
            e.preventDefault();
        }

        const savePlace = async (e) =>{
            const placeData = {

                title, address, addedPhoto, 
                description, extraInfo,perks,
                checkIn,checkOut, maxGuests, price

            }

            if(id){
                //update
                await axios.put("/places", {
                id,...placeData
               });
               setRedirect(true)

            }else{
                //new place
                await axios.post("/places", placeData);
                setRedirect(true)
            }                                
               }
        
         if(redirect){
            return <Navigate to={"/account/places"}/>

         }


  return (
    <div>

        <AccountNavegation />
            <form 
                    onSubmit={handleSubmit}>
                    <h2 className=' text-xl mt-4 mx-2 font-bold'>Title</h2>
                    <p className='text-sm mx-2'>Title for your place, should be shirt and catchy</p>
                    <input 
                    className="bg-gray-300 " 
                    type="text" 
                    placeholder="title"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    />

                    <h2 className=' text-xl mt-4 mx-2 font-bold'>Address</h2>
                    <p className='text-sm mx-2'>address to your place</p>
                    <input 
                    className="bg-gray-300 "
                    type="text"
                    placeholder="address"
                    value={address}
                    onChange={(e)=> setAddress(e.target.value)}
                     />
                         <PhotosUploader addedPhoto={addedPhoto} onChange={setAddedPhoto}/>
                    
                    <h2 className=' text-xl mt-4 mx-2 font-bold'>Description</h2>
                    <p className='text-sm mx-2'>add a short descriptionn</p>
                    <textarea
                    className="bg-gray-300 w-full rounded-2xl "
                    type="text" 
                    placeholder="description"
                    rows ="8"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                     />
                        <Perks selected={perks} onChange={setPerks} /> 
                        
                    <h2 className=' text-xl mt-4 mx-2 font-bold'>Extra information</h2>
                    <p className='text-sm mx-2'>add an important information</p>
                    <textarea
                    className="bg-gray-300 w-full rounded-2xl "
                    type="text" 
                    placeholder="description"
                    rows ="8"
                    value={extraInfo}
                    onChange={(e)=> setExtraInfo(e.target.value)}
                     />
                <div className='grid gap-4 grid-cols-2flex rounded-2xl   md:grid-cols-3 lg:grid-cols-6'>
                    <div>
                        <h3 className="mt-2 -mb-1 text-center">Check in time</h3>
                        <input type="text"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            placeholder="14"/>
                    </div>
                <div>
                    <h3 className="mt-2 -mb-1 text-center">Check out time</h3>
                    <input type="text"
                        value={checkOut}
                        onChange={ev => setCheckOut(ev.target.value)}
                        placeholder="11" />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1 py-1 text-center">Max number of guests</h3>
                    <input className="py-2"type="number" value={maxGuests}
                        onChange={ev => setMaxGuests(ev.target.value)}/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1 py-1 text-center">Price per night</h3>
                    <input className="py-2"type="number" value={price}
                        onChange={ev => setPrice(ev.target.value)}/>
                </div>
                </div>
                    <button
                    onClick={savePlace}
                    className='primary my-4'>
                        Save
                    </button>    

            </form>                

    </div>
  )
}

export default PlacesFormPage