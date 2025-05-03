const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const budgetController = require("../controllers/budgetController");

// Create new budget
router.post("/", authMiddleware, budgetController.createBudget);

// Get all budgets
router.get("/", authMiddleware, budgetController.getBudgets);

// Update budget by ID
router.put("/:id", authMiddleware, budgetController.updateBudget);

// Delete budget by ID
router.delete("/:id", authMiddleware, budgetController.deleteBudget);

// Get budget compliance report
router.get("/compliance", authMiddleware, budgetController.getBudgetCompliance);

module.exports = router;
