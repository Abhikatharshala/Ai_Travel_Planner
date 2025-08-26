const express = require("express");
const router = express.Router();
const { addToWishlist, getWishlist,getById,deleteWishlist } = require("../Controller/wishListController")
const authMiddleware = require("../middleware/authMiddleware");

router.post("/wishlist", authMiddleware, addToWishlist);   
router.get("/getWishlist", authMiddleware, getWishlist); 
router.get("/getWishlistById/:id", authMiddleware, getById);   
router.delete("/getWishlistById/:id", authMiddleware, deleteWishlist);      

    

module.exports = router;
