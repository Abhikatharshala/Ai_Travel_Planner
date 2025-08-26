const historyModel=require("../model/history")
const Trip=require("../model/trip")

const addHistory=async (req,res)=>{

    const today=new Date()

    const oldTrip=await Trip.find({
        user:req.userId,
        endDate:{$lt:today}
    })
    for (let trip in oldTrip){
        const exists=await historyModel.findOne({user:userId,trip:trip._id})
        if(!exists){
            await historyModel.create({user:userId,trip:trip._id})
        }
    }
}

const getHistory = async (req, res) => {
  try {
    
 
    const history = await historyModel.find({ user: req.userId }).populate("trip");
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getHistory };