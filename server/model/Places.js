import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
owner: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
title:String,
address: String,
photo: [String],
description : String,
extraInfo: String,
checkIn: Number,
checkOut: Number,
maxGuests : Number,
perks: [String],
price: Number

})

export const PlaceMoldel = mongoose.model("Place", PlaceSchema);
