const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const expenseController = require("../controllers/expenseController");

// Create new expense
router.post("/", authMiddleware, expenseController.createExpense);

// Get expenses with optional filters
router.get("/", authMiddleware, expenseController.getExpenses);

// Update expense by ID
router.put("/:id", authMiddleware, expenseController.updateExpense);

// Delete expense by ID
router.delete("/:id", authMiddleware, expenseController.deleteExpense);

module.exports = router;
