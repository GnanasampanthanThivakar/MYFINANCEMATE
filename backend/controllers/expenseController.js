const Expense = require("../models/Expense");

// Create a new expense entry
exports.createExpense = async (req, res) => {
  try {
    // Ensure userId is set from the authenticated user
    const expense = new Expense({
      ...req.body,
      userId: req.user.userId, // Use `userId` for consistency with middleware
    });

    // Save the expense to the database
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    // Handle validation errors or other issues
    res.status(400).json({
      error: error.message,
      details: error.errors
        ? Object.values(error.errors).map((err) => err.message)
        : null,
    });
  }
};

// Get all expenses for the authenticated user (with optional filters)
exports.getExpenses = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    const query = { userId: req.user.userId }; // Only fetch expenses for the current user

    // Add date range filter if startDate and endDate are provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Add category filter if provided
    if (category) {
      query.category = category;
    }

    // Fetch expenses sorted by date in descending order
    const expenses = await Expense.find(query).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an expense entry by ID
exports.updateExpense = async (req, res) => {
  try {
    // Find and update the expense by ID
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true } // Ensure schema validation during updates
    );

    // Check if the expense exists
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    // Handle validation or other errors
    res.status(400).json({
      error: error.message,
      details: error.errors
        ? Object.values(error.errors).map((err) => err.message)
        : null,
    });
  }
};

// Delete an expense entry by ID
exports.deleteExpense = async (req, res) => {
  try {
    // Find and delete the expense by ID
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    // Check if the expense exists
    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
