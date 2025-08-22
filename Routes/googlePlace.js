const express=require("express")

const router=express.Router()

const {createGooglePlaces}=require("../Controller/googlePlaceController")
const middleWare=require("../middleware/authMiddleware")

router.get("/goglePlacesGet",middleWare,createGooglePlaces)

module.exports=router