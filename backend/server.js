const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
// const reportRoutes = require("./routes/reportRoutes");
const insightRoutes = require("./routes/insightsRoutes");
const budget = require("./routes/budgetRoutes");
const savings = require("./routes/savegoalRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const financialHealth = require("./routes/financialHealthRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// Database connection
require("./config/db");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
// app.use("/api/reports", reportRoutes);
app.use("/api/financial-health", financialHealth);

app.use("/api/insights", insightRoutes);
app.use("/api/budgets", budget);
app.use("/api/savings", savings);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
