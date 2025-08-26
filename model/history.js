const mongoose=require("mongoose")


const historySchema=new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
  },
  { timestamps: true },
)

const histroyMOdel= mongoose.model("histroy",historySchema)

module.exports=histroyMOdel