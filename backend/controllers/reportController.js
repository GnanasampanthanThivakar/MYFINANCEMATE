const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getSummaryReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const [totalIncome, totalExpense] = await Promise.all([
      Income.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Expense.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    const incomeTotal = totalIncome[0]?.total || 0;
    const expenseTotal = totalExpense[0]?.total || 0;
    const netSavings = incomeTotal - expenseTotal;

    res.status(200).json({
      totalIncome: incomeTotal,
      totalExpense: expenseTotal,
      netSavings,
      chartData: {
        labels: ["Income", "Expenses"],
        datasets: [
          {
            label: "Amount",
            data: [incomeTotal, expenseTotal],
            backgroundColor: ["#4CAF50", "#FF5252"],
          },
        ],
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
