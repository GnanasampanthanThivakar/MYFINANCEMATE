const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  category: { type: String, required: true }, // Example: "Food", "Transport"
  date: { type: Date, default: Date.now },
});

const Insight = mongoose.model("Insight", insightSchema);
module.exports = Insight;
