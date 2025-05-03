const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0.01, "Amount must be positive"],
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
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    maxlength: [200, "Description cannot exceed 200 characters"],
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
