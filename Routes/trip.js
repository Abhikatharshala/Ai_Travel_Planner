const express=require("express")
const route=express.Router()
const {createTrip,getTrips,getTripById,deleteTrip}=require("../Controller/tripController")

const authmiddleware = require("../middleware/authMiddleware")


//Routes for tripControllers
route.post("/posttrip",authmiddleware,createTrip)
route.get("/getalltrips",authmiddleware,getTrips)
route.get("/get/:id",authmiddleware,getTripById)
route.delete("/delete/:id",authmiddleware,deleteTrip)

module.exports=route