const authmiddleware=require("../middleware/authMiddleware")
const express = require("express");
const { createItinerary,getTrips,getTripById,deleteTrip } = require("../Controller/openAicontroller");
const router = express.Router();

router.post("/aiItinerary",authmiddleware, createItinerary);
router.get("/aiGetTrip",authmiddleware,getTrips)
router.get("/aiGetById/:id",authmiddleware,getTripById)
router.delete("/aiDeleteTrip/:id",authmiddleware,deleteTrip)

module.exports = router;

