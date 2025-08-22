const ItineraryModel=require("../model/itinerary")


const addTrips = async (req, res) => {
  try {
    const { day, activities } = req.body;

    if (!day || !activities) {
      return res.status(400).json({ message: "Day and activities are required" });
    }

    const itinerary = new ItineraryModel({
      trip: req.params.id, // match your route param
      day,
      activities
    });

    await itinerary.save();
    res.status(201).json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding itinerary", error });
  }
};


const findTrips=async (req,res)=>{
    
try {
    const itinerary= await ItineraryModel.find({trip:req.params.id})
    console.log(itinerary,"getting all Trips")
    res.json(itinerary)
} catch (error) {
    res.status(500).json({ message: "Error fetching itinerary", error });
}
}

const upadteTrip=async (req,res)=>{

   try {
     const itinerary= await ItineraryModel.findByIdAndUpdate(req.params.id.trim(),req.body,{new:true,})
    
    res.json(itinerary)
   } catch (error) {
     res.status(500).json({ message: "Error updating itinerary", error });
   }
}

const deleteTrip = async (req, res) => {
  try {
    const id = req.params.id.trim();

    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid itinerary ID" });
    }

    const deletedItinerary = await ItineraryModel.findByIdAndDelete(id);

    if (!deletedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    console.log(deletedItinerary, "deleted");
    res.status(200).json({ message: "Itinerary deleted successfully", deletedItinerary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting itinerary", error });
  }
};


module.exports={addTrips,findTrips,upadteTrip,deleteTrip}