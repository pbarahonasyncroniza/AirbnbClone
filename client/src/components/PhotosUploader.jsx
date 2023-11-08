import React, { useState} from 'react'
import axios from "axios"

const PhotosUploader = ({addedPhoto,onChange}) => {

    // const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState("")

    const addPhotoByLink = async (e)=> {
        e.preventDefault();
        const {data:filename} = await axios.post("/uploadbylink", { link: photoLink})
        onChange(prev =>{
            return[...prev, filename]
        })
        setPhotoLink("")
    }
    
    const upLoadPhoto =(e)=>{
        const files = e.target.files;
        const data = new FormData();
        for(let i=0 ; i < files.length; i++){
            data.append("photos",files[i])
        }
        axios.post("/upload" , data , {
            headers: {"Content-type": "multipart/form-data"}
        }).then(response =>{
            const{data:filenames} = response;
            onChange(prev =>{
                return [...prev, filenames]
            })   
        })
    }

    const removePhoto = (e,filename) =>{
        e.preventDefault()
        onChange([...addedPhoto.filter(photo=> photo !== filename)])


    }

    const selectAsMainPhoto = (e,filename) =>{
        e.preventDefault()
       onChange([filename,...addedPhoto.filter(photo=>photo !==filename)])
    }


  return (
    <>
            <h2 className=' text-xl mt-4 mx-2 font-bold'>Photos</h2>
            <p className='mx-2 text-sm'>more=better</p>
            <div className='flex'>
            <input 
            className="bg-gray-300"
            type="text" 
            placeholder={"Add using a link... jpg"}
            value={photoLink}
            onChange={(e)=> setPhotoLink(e.target.value)}
            />


            <button
            onClick={addPhotoByLink}
            className='primary'
            >Add photo</button>
                 
            </div>

            <div className='grid gap-2 grip-cols-3 md:grid-cols-4 lg:grid-cols-6'>                   
                 {addedPhoto.length > 0 && addedPhoto.map((link ,index)=>(

                <div className='h-32 flex relative ' key={index}>
                    <img className=" rounded-2xl w-full object-cover" src={"http://localhost:8080/uploads/"+link}/>
                    <button onClick={(e)=> removePhoto(e,link)}
                    className=' cursor-pointer absolute bottom-2 right-2 text-white bg-black bg-opacity-70 rounded-full py-2 px-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>

                    <button onClick={(e)=> selectAsMainPhoto(e,link)}
                    className=' cursor-pointer absolute bottom-2 left-2 text-white bg-black bg-opacity-70 rounded-full py-2 px-2'>
                    {link === addedPhoto[0] && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                    )}
                    {link !== addedPhoto[0] &&(
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                          )}
                    </button>



            </div>
                    ))}
                    </div>

                            {/* Upload by PC */}
             <div >
                <label className='h-32 cursor-pointer flex items-center gap-1 justify-end border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                <input type="file"
                className='hidden' 
                onChange={(e)=>upLoadPhoto} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                Upload
                </label>
            </div>
       

    </>
  )
}

export default PhotosUploader