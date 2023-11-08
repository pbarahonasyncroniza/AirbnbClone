import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
place: {type:mongoose.Schema.Types.ObjectId, require:true, ref:"Place"},
user:{type:mongoose.Schema.Types.ObjectId, require:true},
checkIn : {type:Date, require:true},
checkOut : {type:Date, require:true},
name : {type:String, require:true},
phone : {type:String, require:true},
numberGuests: Number,
price : Number

})

export const BookingMoldel = mongoose.model("Booking", PlaceSchema);
