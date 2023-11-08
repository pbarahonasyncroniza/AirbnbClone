import React from 'react'

const PlaceImg = ({place,index=0,className=null}) => {

    if(!place.photo?.length){
        return ""
    }

    if (!className){
        className = "object-cover"
    }

  return (
    <div>
       <img src={"http://localhost:8080/uploads/"+place.photo[index]} />
    </div>
  )
}

export default PlaceImg