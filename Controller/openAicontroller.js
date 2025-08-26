const generateItinerary = require("../model/openAi");
const Trip = require("../model/trip");
const middleware = require("../middleware/authMiddleware");

const createItinerary = async (req, res) => {
  try {
    const { location, days, preferences, startDate, endDate } = req.body;

    if (!location || !days || !startDate || !endDate) {
      return res.status(401).json({
        message: "destination, startDate, endDate, and days are required",
      });
    }

    // 1️⃣ Make prompt for AI
    const prompt = `
Plan a ${days}-day trip to ${location}, focusing on Preferences: ${
      preferences || "not Specified"
    }.

The response should be a single JSON object ONLY, with this exact structure:
{
  "itinerary": {
    "days": [
      {
        "day": 1,
        "morning": "string",
        "afternoon": "string",
        "evening": "string"
      },
      {
        "day": 2,
        "morning": "string",
        "afternoon": "string",
        "evening": "string"
      }
    ]
  }
}
`;

    // 2️Generate itinerary from OpenAI
    const itineraryText = await generateItinerary(prompt);

    let textItinerary = itineraryText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      textItinerary = JSON.parse(textItinerary);
    } catch (err) {
      console.error(
        "❌ Failed to parse AI response:",
        err,
        "\nResponse:",
        textItinerary
      );
      return res
        .status(500)
        .json({ message: "Invalid itinerary format from AI" });
    }

    // 3️Save trip with parsed itinerary in MongoDB
    const newTrip = new Trip({
      user: req.userId,
      location,
      startDate,
      endDate,
      preferences,
      itinerary: textItinerary.itinerary,
    });
    await newTrip.save();

    // 4️Send response
    res.status(201).json({
      success: true,
      message: "Trip created with AI itinerary",
      trip: newTrip.itinerary,
    });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    res.status(500).json({ message: "Error generating itinerary", error });
  }
};

const getTrips = async (req, res) => {
  try {
    // Fetch all trips for the logged-in user
    const trips = await Trip.find({ user: req.userId }).select(
      "location startDate endDate preferences itinerary"
    );

    res.status(200).json({
      success: true,
      trips: trips,
    });
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ message: "Error while getting trips", error });
  }
};

const getTripById = async (req, res) => {
  try {
    const tripId = req.params.id;

    const trip = await Trip.findOne({ _id: tripId, user: req.userId }).select(
      "location startDate endDate preferences itinerary"
    );

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({ success: true, trip });
  } catch (error) {
    console.error("Error fetching trip:", error);
    res.status(500).json({ message: "Error while getting trip", error });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const delId = req.params.id;
    const tripDel = await Trip.findByIdAndDelete({ _id: delId });
    res.status(201).json({ message: "Trip is Deleted Sucessfully" });
  } catch (error) {
    console.log(error, "erors");
    res.status(400).json({ message: "trip is not deleted due to error" });
  }
};

module.exports = { createItinerary, getTrips, getTripById, deleteTrip };
