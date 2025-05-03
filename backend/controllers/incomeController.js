const Income = require("../models/Income");

// Create a new income entry
exports.createIncome = async (req, res) => {
  try {
    const income = new Income({ ...req.body, userId: req.user.userId });
    await income.save();
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all incomes for the authenticated user
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.userId }).sort({
      date: -1,
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an income entry by ID
exports.updateIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }

    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an income entry by ID
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);

    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
