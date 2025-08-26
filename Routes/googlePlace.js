const express=require("express")
const router=express.Router()
const {createGooglePlaces,getGoolePlaces,getById,deletePlace}=require("../Controller/googlePlaceController")
const middleWare=require("../middleware/authMiddleware")



router.post("/goglePlacesGet",middleWare,createGooglePlaces)
router.get("/getPlaces",middleWare,getGoolePlaces)
router.get("/getPlacesById/:id",middleWare,getById)
router.delete("/deletePlacesById/:id",middleWare,deletePlace)



module.exports=router