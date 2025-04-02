const Budget = require("../models/budgetModel");
const Expense = require("../models/Expense");

// Create Budget
exports.createBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;

    // Validate required fields
    if (!category || !amount) {
      return res.status(400).json({
        success: false,
        message: "Both category and amount are required.",
      });
    }

    // Ensure the user ID is available
    const userId = req.user?.userId; // Use `userId` for consistency with middleware

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be a positive number." });
    }

    // Create a new budget
    const budget = new Budget({
      category,
      amount,
      userId,
    });

    await budget.save();
    res.status(201).json({ success: true, data: budget });
  } catch (error) {
    console.error("Create Budget Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Budgets
// Get all budgets for the authenticated user
exports.getBudgets = async (req, res) => {
  try {
    const userId = req.user?.userId; // Use `userId` for consistency with middleware

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Fetch all budgets for the user, sorted by creation date
    const budgets = await Budget.find({ userId }).sort({ createdAt: -1 });

    // Ensure the response always contains an array, even if empty
    res.status(200).json({ success: true, data: budgets || [] });
  } catch (error) {
    console.error("Get Budgets Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Update Budget
exports.updateBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;
    const budgetId = req.params.id;

    // Validate at least one field is provided
    if (!category && !amount) {
      return res.status(400).json({
        success: false,
        message:
          "At least one field (category or amount) is required for update.",
      });
    }

    // Validate amount if provided
    if (amount !== undefined && (isNaN(amount) || amount <= 0)) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be a positive number." });
    }

    // Find and update the budget by ID
    const updatedBudget = await Budget.findByIdAndUpdate(
      budgetId,
      { $set: { category, amount } },
      { new: true, runValidators: true } // Ensure schema validation during updates
    );

    // Check if the budget exists
    if (!updatedBudget) {
      return res
        .status(404)
        .json({ success: false, message: "Budget not found." });
    }

    res.status(200).json({ success: true, data: updatedBudget });
  } catch (error) {
    console.error("Update Budget Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Budget
exports.deleteBudget = async (req, res) => {
  try {
    const budgetId = req.params.id;

    // Find and delete the budget by ID
    const deletedBudget = await Budget.findByIdAndDelete(budgetId);

    // Check if the budget exists
    if (!deletedBudget) {
      return res
        .status(404)
        .json({ success: false, message: "Budget not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Budget deleted successfully." });
  } catch (error) {
    console.error("Delete Budget Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get Budget Compliance Report
exports.getBudgetCompliance = async (req, res) => {
  try {
    const userId = req.user?.userId; // Use `userId` for consistency with middleware

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Fetch all budgets and expenses for the user
    const budgets = await Budget.find({ userId });
    const expenses = await Expense.find({ userId });

    // Calculate compliance for each budget
    const compliance = budgets.map((budget) => {
      const totalSpent = expenses
        .filter((expense) => expense.category === budget.category)
        .reduce((sum, expense) => sum + expense.amount, 0);

      const compliancePercentage =
        budget.amount > 0
          ? ((totalSpent / budget.amount) * 100).toFixed(2)
          : "N/A"; // Handle division by zero

      return {
        category: budget.category,
        budgetedAmount: budget.amount,
        spentAmount: totalSpent,
        compliancePercentage,
      };
    });

    res.status(200).json({ success: true, data: compliance });
  } catch (error) {
    console.error("Get Budget Compliance Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
