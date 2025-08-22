const mongoose =require("mongoose");


const userSchema= new mongoose.Schema({
    username:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,lowercase:true,trim:true},
    password:{type:String,required:true,minlength:6},
    phone:{type:Number}
},
{timestamps:true}
)

const usermodel= mongoose.model("User",userSchema);

module.exports=usermodel