const express = require("express");
const cors=require("cors")
const mongoose = require("mongoose");  
require("dotenv").config();
const authRoutes=require("./Routes/auth")
const tripRoutes=require("./Routes/trip")
const ItineraryRoutes=require("./Routes/Itinerary")
const router=require("./Routes/openAi")
const googlePlaceRouter=require("./Routes/googlePlace")



// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is connecteng"))
  .catch((err) => console.log("Not connected to MongoDB:", err));



const app = express();
app.use(express.json())
app.use(cors())


//authenticationRoutes
app.use("/api/auth",authRoutes)


//tripRoutes
app.use("/api",tripRoutes)


//ItineraryRoute
app.use("/Itinerary",ItineraryRoutes)

//openAiRoute
app.use("/openAI",router)

//GooglePlacesApi
app.use("/googlePlace",googlePlaceRouter)

// Testing route
app.get("/test", (req, res) => {
  res.json({ message: "Postman test working!" });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
