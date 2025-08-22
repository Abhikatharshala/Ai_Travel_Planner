const mongoose=require("mongoose")


const tripSchema= new mongoose.Schema({
    
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
location:{
    type:String,
    required:true
},
startDate:{
    type:Date,
    required:true,
},
endDate:{
    type:Date,
    required:true
},
preferences:{
    type:[String],
    default:[]
},
 itinerary: { type: Object },
},
{
    timestamps:true
},
)
const tripmodel= mongoose.model("Trip",tripSchema)

module.exports=tripmodel