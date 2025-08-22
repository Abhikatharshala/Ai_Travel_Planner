const googlePlaceModel=require("../model/googlePlace")
const openAiModel=require("../model/openAi")
const Tripmodel=require("../model/trip")


const createGooglePlaces=async(req,res)=>{
    try {
       const {location,days,preferences,startDate,endDAte}=req.body 
       if(!location || !days || !startDate || !endDAte){
        return res.status(400).json({message:"Al feilds Required"})
       }

       const attraction =await getPlaces(location,"tourist_attraction",5);
       const restaurants = await getPlaces(location,"restaurant",5)

         const prompt = `
Plan a ${days}-day trip to ${location} focusing on preferences: ${preferences || "not specified"}.
Include these attractions: ${attractions.map(p => p.name).join(", ")}.
Include these restaurants: ${restaurants.map(p => p.name).join(", ")}.
Return JSON with this structure:
{
  "itinerary": {
    "days": [
      { "day": 1, "morning": "string", "afternoon": "string", "evening": "string" }
    ]
  }
}
`;
let itineraryText=await openAiModel(prompt)
  itineraryText = itineraryText.replace(/```json/g, "").replace(/```/g, "").trim();
    const itineraryJSON = JSON.parse(itineraryText);
    const newtrip=new Tripmodel({
        user:req.userId,
        location,startDate,
        endDate,
        preferences,
        itinerary:itineraryJSON.itinerary
    })
    await newtrip.save()
    res.status(201).json({success:true,trip:newtrip.itinerary})
    } catch (error) {
           console.error("Error creating itinerary:", error);
    res.status(500).json({ message: "Failed to create itinerary", error });
    }
}
module.exports={createGooglePlaces}