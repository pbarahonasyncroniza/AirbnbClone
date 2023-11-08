import express, { json } from "express"
import mongoose from "mongoose";
import * as dotenv from "dotenv"
import { User } from "../server/model/User.js"
import { PlaceMoldel } from "./model/Places.js";
import { BookingMoldel } from "./model/Booking.js";
import bcrypt from "bcryptjs"
import cors from "cors"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import imageDonwnLoader from"image-downloader"
import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer"
import fs from"fs"



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//dVBK68yCKXHjKvCD
const app = express();
app.use(cookieParser())
// app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/uploads", express.static(path.join(__dirname, '/uploads')))

const bcryptSalt = bcrypt.genSaltSync(12)
const jwtSecret ="dthetjyksjfsgherth"

//JSON Settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


dotenv.config();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));


mongoose.connect(process.env.MONGO_URL ,{
    
        useNewUrlParser: true, // Avoids deprecation warnings -> enables new MongoDB connection string parser
        useUnifiedTopology: true, // Avoids connection errors -> enables new unified topology engine for MongoDB Node.js driver
    }).then(() => {
        console.log("Rocking with mongo:" );
    }).catch(() => {
        console.log("Error connecting Mongo");
    });


app.get("/",(req, res)=>{
    res.status(200).json({message: "Hello from airbnb"})
    
})



app.post("/register", async (req,res)=>{
    const {name,email,password}=req.body
    res.json({name,email,password})

    try{
    const userDoc= await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt)
    })

    res.json(userDoc)
}catch{

    res.status(422).json
}
});

app.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if(passOk){
            jwt.sign({
            email:userDoc.email, 
            id:userDoc._id, 
            name:userDoc.name},
            jwtSecret, {}, (err,token)=>{
                if(err) throw err;
                res.cookie("token", token).json(userDoc)
            })
        }else{
            res.status(422).json("Password not ok")
        }
    }else{
        res.json("not found")
    }

})



app.get("/profile", (req,res)=>{
    const {token} =req.cookies;
    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
            if (err) throw err;
            const {name,email,_id} = await User.findById(userData.id)
            res.json({name,email,_id})
        })
    }else{
 res.json("null")
    }
})



app.post("/logout", (req,res)=>{
    res.cookie( "token", "").json(true)
})


// Photo by Link 

app.post("/uploadbylink", async (req,res)=>{
     const {link} = req.body;
     const newName = "photo" + Date.now() + ".jpg"
    await imageDonwnLoader.image ({
        url : link,
        dest: __dirname + "/uploads/" + newName,

     });
        res.json(newName)
})
 
const photosMiddleware = multer ({ dest : "uploads"})
app.post("/upload", photosMiddleware.array("photos", 100) ,  (req,res)=>{
    const uploadedFiles = [];   
    for(let i=0 ; i< req.files.length; i++){
            const {path, originalname} = req.files[i];
            const parts = originalname.split(".");
            const ext = parts[parts.length -1]
            const newPath =  path + "." + ext
            fs.renameSync(path, newPath);
            uploadedFiles.push(newPath)
            
        }
    
    res.json(uploadedFiles)
    
})



app.post("/places", (req,res)=>{
    try{
    const {token} =req.cookies;
    const  {title, address, addedPhoto,description,perks, extraInfo,checkIn,checkOut,maxGuests,price} = req.body
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        if (err) throw err;
    const placeDoc = await PlaceMoldel.create({
        owner: userData.id,
        title,address, photo:addedPhoto,description,perks, extraInfo,checkIn,checkOut,maxGuests,price
        })
        res.json(placeDoc)
        
    })
}catch (error){
    res.status(500).json({error:"Something went wrong"});
    console.log("Error try later...")

}
})


// user Places

  app.get("/user-places", (req,res)=>{
    try{
    const {token} =req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        const {id} = userData
        res.json (await PlaceMoldel.find({owner:id}))
    });
    }catch{
        res.status(500).json({error:"Something went wrong"});
        console.log("Error Places get...")
        
    }
  })


  app.get("/places/:id", async(req,res)=>{
    try{
    const {id} = req.params
    res.json(await PlaceMoldel.findById(id))
      }catch{
        res.status(500).json({error:"Something went wrong"});
        console.log("Error places by ID...")
    }    
})


app.put("/places", async (req,res)=>{
    try{
    const {token} =req.cookies;
    const  {
    id,title, address, addedPhoto,description,perks,
    extraInfo,checkIn,checkOut,maxGuests,price} = req.body
    
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        
    const placeDoc = await PlaceMoldel.findById(id)
    // console.log("userdata",userData.id)
    // console.log("placedoc",placeDoc.owner)
    if(userData.id === placeDoc.owner.toString()){
    placeDoc.set({
                title, address, photo:addedPhoto,description,perks, extraInfo,checkIn,checkOut,maxGuests,price
            })
            await placeDoc.save()
            res.json ("Put Ok")
        }
        
    });
    
}catch(error){
    res.status(500).json({error:"Put error"})
    console.error("something went wrong", error)

}

})
|

app.get("/places",  async (req,res)=>{

    res.json( await PlaceMoldel.find())
})

//function get booking user data
function getUserDataFromReq(req){
    return new Promise ((resolve, reject)=>{

        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData)=>{
            if(err) throw err;
            resolve(userData)
            })
    })
}

app.post("/bookings", async(req,res)=>{

    const {place, checkIn, checkOut, numberGuests,name,phone,price} = req.body
    try{
    const userData = await getUserDataFromReq(req)
    const bookings = await BookingMoldel.create({
    place, 
    checkIn, 
    checkOut, 
    numberGuests,
    name,
    price,
    phone,
    user:userData.id

    })
        res.json(bookings)
    }catch (error){
        console.error("Something went wrong , try again ", error)
        res.status(500).json({error:"Unsuccessful reservation"})
    }
}

)


app.get("/bookings", async (req,res)=>{
    const userData=getUserDataFromReq(req)
    res.json(await BookingMoldel.find({user:userData.id}).populate("place"))

})





app.listen(8080, ()=> console.log("server is listening port 8080"))




