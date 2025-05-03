const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const savingsGoalController = require("../controllers/savingsGoalController");

// Create a saving goal
router.post("/", authMiddleware, savingsGoalController.createSavingGoal);

// Update saving goal progress
router.put(
  "/update-progress/:goalId",
  authMiddleware,
  savingsGoalController.updateSavingGoalProgress
);

// Get all saving goals for the authenticated user
router.get("/", authMiddleware, savingsGoalController.getSavingGoals);

// Delete a saving goal
router.delete(
  "/:goalId",
  authMiddleware,
  savingsGoalController.deleteSavingGoal
);

module.exports = router;
