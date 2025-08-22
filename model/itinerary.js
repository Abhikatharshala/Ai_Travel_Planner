const mongoose=require("mongoose")


const activitySchema= new mongoose.Schema({
    time:{type:String},
    description:{type:String,required:true},
    location:{type:String}
})
  
const itinerarySchema =new mongoose.Schema({
 trip:{type:mongoose.Schema.Types.ObjectId,ref:"Trip",required:true},
    day:{type:Number,required:true},
    activities:[activitySchema]
})


const itineraryModel= mongoose.model("Itinerary",itinerarySchema);

module.exports=itineraryModel