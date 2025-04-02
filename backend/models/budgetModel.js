const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    enum: {
      values: [
        "Food",
        "Transport",
        "Shopping",
        "Entertainment",
        "Utilities",
        "Health",
        "Other",
      ],
      message: "{VALUE} is not a valid category",
    },
    required: [true, "Category is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0.01, "Amount must be positive"],
  },
});

module.exports = mongoose.model("Budget", budgetSchema);
