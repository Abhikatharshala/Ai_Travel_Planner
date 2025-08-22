const tripmodel = require("../model/trip");

const createTrip = async (req, res) => {
  try {
    const { location, startDate, endDate, preferences } = req.body;

    const trip = new tripmodel({
      user: req.userId,
      location,
      startDate,
      endDate,
      preferences,
    });
    await trip.save();
    res.status(201).json({ message: "Trip created successfully", new: trip });
  } catch (error) {
    res.status(500).json({ message: "Error creating trip", error });
  }
};

// Get all trips for logged in user
const getTrips = async (req, res) => {
  try {
    const trips = await tripmodel.find({ user: req.userId }).select("-__v");
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips", error });
  }
};

// Get trip by ID
const getTripById = async (req, res) => {
  try {
    const trip = await tripmodel.findById(req.params.id.trim()).select("-__v");

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this trip" });
    }

    res.json(trip);
  } catch (error) {
    console.error("Error in getTripById:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching trip", error: error.message });
  }
};

//Delete Trip

const deleteTrip = async (req, res) => {
  try {
    const trip = await tripmodel.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trip", error });
  }
};

module.exports = { createTrip, getTrips, getTripById, deleteTrip };
