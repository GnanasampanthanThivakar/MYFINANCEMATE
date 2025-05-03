const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0.01, "Amount must be at least 0.01"],
  },
  category: {
    type: String,
    enum: {
      values: [ "Food",
        "Transport",
        "Shopping",
        "salary",
        "Entertainment",
        "Utilities",
        "Health",
        "Other",],
      message: "{VALUE} is not a valid income category",
    },
    required: [true, "Category is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    maxlength: [200, "Description cannot exceed 200 characters"],
  },
});

// Index for faster queries
incomeSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model("Income", incomeSchema);
