const SavingsGoal = require("../models/savingsGoalModel");

// Create a savings goal
exports.createSavingGoal = async (req, res) => {
  try {
    const { goalAmount, targetDate } = req.body;

    // Validate required fields
    if (!goalAmount || !targetDate) {
      return res.status(400).json({
        success: false,
        message: "Both goalAmount and targetDate are required.",
      });
    }

    // Ensure the user ID is available
    const userId = req.user?.userId; // Use `userId` for consistency with middleware

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Create a new savings goal
    const savingsGoal = new SavingsGoal({
      userId,
      goalAmount,
      targetDate,
      currentAmount: 0, // Initialize current amount to 0
      status: "in-progress", // Default status
    });

    await savingsGoal.save();
    res.status(201).json({ success: true, data: savingsGoal });
  } catch (error) {
    console.error("Create Savings Goal Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all savings goals for the authenticated user// Get all savings goals for the authenticated user
exports.getSavingGoals = async (req, res) => {
  try {
    const userId = req.user?.userId; // Use `userId` for consistency with middleware

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Fetch all savings goals for the user, sorted by creation date
    const savingsGoals = await SavingsGoal.find({ userId }).sort({
      createdAt: -1,
    });

    // Ensure the response always contains an array, even if empty
    res.status(200).json({ success: true, data: savingsGoals || [] });
  } catch (error) {
    console.error("Get Savings Goals Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
// Update savings goal progress
exports.updateSavingGoalProgress = async (req, res) => {
  try {
    const { goalId } = req.params;
    const { amount } = req.body;

    // Validate the amount
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be a positive number." });
    }

    // Find the savings goal by ID
    const savingsGoal = await SavingsGoal.findById(goalId);

    if (!savingsGoal) {
      return res
        .status(404)
        .json({ success: false, message: "Savings goal not found." });
    }

    // Ensure the goal belongs to the authenticated user
    if (savingsGoal.userId.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized." });
    }

    // Update the current amount
    savingsGoal.currentAmount += amount;

    // Check if the goal is completed
    if (savingsGoal.currentAmount >= savingsGoal.goalAmount) {
      savingsGoal.status = "completed";
    }

    await savingsGoal.save();
    res.status(200).json({ success: true, data: savingsGoal });
  } catch (error) {
    console.error("Update Savings Goal Progress Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete a savings goal
exports.deleteSavingGoal = async (req, res) => {
  try {
    const { goalId } = req.params;

    // Find the savings goal by ID
    const savingsGoal = await SavingsGoal.findById(goalId);

    if (!savingsGoal) {
      return res
        .status(404)
        .json({ success: false, message: "Savings goal not found." });
    }

    // Ensure the goal belongs to the authenticated user
    if (savingsGoal.userId.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized." });
    }

    // Delete the savings goal
    await SavingsGoal.findByIdAndDelete(goalId);
    res
      .status(200)
      .json({ success: true, message: "Savings goal deleted successfully." });
  } catch (error) {
    console.error("Delete Savings Goal Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
