const Wishlist = require("../model/wishList");
const Trip = require("../model/trip");

// Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { tripId } = req.body;

    // check if trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // check duplicate
    const existing = await Wishlist.findOne({ user: req.userId, trip: tripId });
    if (existing) return res.status(400).json({ message: "Already in wishlist" });

    const wishlistItem = new Wishlist({ 
      user: req.userId, 
      trip: tripId,
     
      
       });
     await wishlistItem.populate("trip");
    await wishlistItem.save();
    

    res.status(201).json({ message: "Added to wishlist", wishlistItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get wishlist with full trip details
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.userId  }).populate("trip");
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//get by id 

const getById = async (req, res) => {
  try {
    const wishlistById = await Wishlist.findById(req.params.id).populate("trip");
    if (!wishlistById) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json(wishlistById);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};


//delete
const deleteWishlist=async(req,res)=>{
 try {
   const wishListDlt= await Wishlist.findByIdAndDelete(req.params.id)
  res.status(200).json({message:"deleted sucessfully"})
 } catch (error) {
  res.status(400).json({message:"wishlist Trip not deleted"})
 }
}

module.exports = { addToWishlist, getWishlist,getById,deleteWishlist };
