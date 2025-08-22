const express=require("express")
const route=express.Router()
const {login,signup,getProfile,upadteProfie}=require("../Controller/authController")
const authMiddleVerifyToken=require("../middleware/authMiddleware")
const authmiddleware = require("../middleware/authMiddleware")



//routes comming from authcontroller
route.post("/signup",signup)
route.post("/login",login)


//routes comming from middleware -> authroutes
route.get("/profile",authMiddleVerifyToken,getProfile)
route.put("/profileUpadte",authmiddleware,upadteProfie)  


module.exports = route