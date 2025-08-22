const express = require("express");
const authmiddleware = require("../middleware/authMiddleware");
const {addTrips,findTrips,upadteTrip,deleteTrip}=require("../Controller/itinerary")
const route = express.Router();


//routing from Itinerary controller
route.post("/addTrip/:id",authmiddleware,addTrips)
route.get("/getTrip/:id",authmiddleware,findTrips)
route.put("/updateTrip/:id",authmiddleware,upadteTrip)
route.delete("/deleteTrip/:id",authmiddleware,deleteTrip)

module.exports= route