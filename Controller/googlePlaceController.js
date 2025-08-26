
const googlePlaceModel = require("../model/googlePlace");
const openAiModel = require("../model/openAi");
const Tripmodel = require("../model/trip");

const createGooglePlaces = async (req, res) => {
  try {
    const { location, days, preferences, startDate, endDate } = req.body;
    if (!location || !days || !startDate || !endDate) {
      return res.status(400).json({ message: "Al feilds Required" });
    }

    const attractions = await googlePlaceModel(
      location,
      "tourist_attraction",
      5
    );

    const restaurants = await googlePlaceModel(location, "restaurant", 5);

    const prompt = `
Plan a ${days}-day trip to ${location} focusing on preferences: ${
      preferences || "not specified"
    }.
Include these attractions: ${attractions.map((p) => p.name).join(", ")}.
Include these restaurants: ${restaurants.map((p) => p.name).join(", ")}.
Return JSON with this structure:
{
  "itinerary": {
    "days": [
      { "day": 1, "morning": "string", "afternoon": "string", "evening": "string" }
    ]
  }
}
`;
    let itineraryText = await openAiModel(prompt);
    itineraryText = itineraryText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();



      // Remove any leading non-JSON characters (before first "{")
      itineraryText = itineraryText.replace(/^[^{]*/, "");

      // Remove anything after the last "}" 
      itineraryText = itineraryText.replace(/}[^}]*$/, "}");


    const itineraryJSON = JSON.parse(itineraryText);
    const newtrip = new Tripmodel({
      user: req.userId,
      location,
      startDate,
      endDate,
      preferences,
      itinerary: itineraryJSON.itinerary,
    });
    await newtrip.save();
    res.status(201).json({ success: true, trip: newtrip.itinerary });
  } catch (error) {
    console.error("Error creating itinerary:", error);
    res.status(500).json({ message: "Failed to create itinerary", error });
  }
};

 const getGoolePlaces=async(req,res)=>{
  console.log(req.userId,"user")
 try {
   const getPlaces= await Tripmodel.find({user:req.userId})
    res.status(201).json(getPlaces)
  
 } catch (error) {
   res.status(400).json({message:"not getting places"})
 }
 }


const getById=async(req,res)=>{
  const tripId=req.params.id
  try {
    const placesGetById= await Tripmodel.findById(tripId)
    res.status(200).json(placesGetById)
  } catch (error) {
    res.status(400).json({message:"error while getting places"})
  }
}



const deletePlace=async(req,res)=>{
   const tripId=req.params.id
  try {
    const deleteById=await Tripmodel.findByIdAndDelete({_id:tripId})
    res.status(201).json({message:"Trip Deleted Sucessfully"})
  } catch (error) {
    res.status(400).json({message:"Trip Not Deleted "})
  }
}






module.exports = { createGooglePlaces,getGoolePlaces,getById,deletePlace };
