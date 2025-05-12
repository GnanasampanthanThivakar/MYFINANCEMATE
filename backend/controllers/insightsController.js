const Insight = require("../models/insights");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

// Create Financial Insight
exports.createInsight = async (req, res) => {
  try {
    const userId = req.user?.userId; // Use `userId` for consistency with middleware

    console.log("User ID:", userId);

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Fetch all incomes and expenses for the user
    const incomes = await Income.find({ userId });
    const expenses = await Expense.find({ userId });

    // Check if there's any financial data available
    if (incomes.length === 0 && expenses.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No financial data found for the user.",
        });
    }

    // Calculate total income and total expense
    const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Generate an insight message based on spending patterns
    let insightMessage = "You're doing great!";
    if (totalExpense > totalIncome) {
      insightMessage =
        "Your expenses exceed your income. Consider cutting down.";
    } else if (totalExpense > totalIncome * 0.7) {
      insightMessage =
        "You're spending over 70% of your income. Try saving more.";
    } else if (totalExpense < totalIncome * 0.4) {
      insightMessage =
        "Great job! You're spending less than 40% of your income. Keep saving!";
    } else if (totalExpense > totalIncome * 0.9) {
      insightMessage =
        "Warning: You're spending almost all of your income. Consider reviewing your budget.";
    }

    // Create a new Insight document
    const insight = new Insight({
      userId,
      title: "Financial Summary",
      message: insightMessage,
      category: "General",
    });

    // Save the insight to the database
    await insight.save();
    res.status(201).json({ success: true, data: insight });
  } catch (error) {
    console.error("Create Insight Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Insights for a User
exports.getInsights = async (req, res) => {
  try {
    const userId = req.user?.userId; // Use `userId` for consistency with middleware

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Fetch all insights for the user, sorted by creation date
    const insights = await Insight.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: insights });
  } catch (error) {
    console.error("Get Insights Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Insight
exports.updateInsight = async (req, res) => {
  try {
    const insightId = req.params.id;

    // Find and update the insight by ID
    const updatedInsight = await Insight.findByIdAndUpdate(
      insightId,
      { $set: req.body },
      { new: true, runValidators: true } // Ensure schema validation during updates
    );

    // Check if the insight exists
    if (!updatedInsight) {
      return res
        .status(404)
        .json({ success: false, message: "Insight not found." });
    }

    res.status(200).json({ success: true, data: updatedInsight });
  } catch (error) {
    console.error("Update Insight Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Insight
exports.deleteInsight = async (req, res) => {
  try {
    const insightId = req.params.id;

    // Find and delete the insight by ID
    const deletedInsight = await Insight.findByIdAndDelete(insightId);

    // Check if the insight exists
    if (!deletedInsight) {
      return res
        .status(404)
        .json({ success: false, message: "Insight not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Insight deleted successfully." });
  } catch (error) {
    console.error("Delete Insight Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
