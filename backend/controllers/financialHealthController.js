// controllers/financialHealth.controller.js
const FinancialReport = require('../models/financialReport');
const Income = require('../models/Income');
const Expense = require('../models/Expense');

exports.calculateFinancialReport = async (req, res) => {
    try {
        console.log("Authenticated user ID:", req.user?.userId);
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is missing' });
        }

        const report = await calculateFinancialHealthScore(userId);
        res.status(200).json({ success: true, data: report });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getComparison = async (req, res) => {
    try {
        console.log("Authenticated user ID:", req.user?.userId);
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is missing' });
        }

        const comparison = await getMonthlyComparison(userId);
        res.status(200).json({ success: true, data: comparison });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const calculateFinancialHealthScore = async (userId) => {
    console.log("User ID received in service:", userId);

    const incomes = await Income.find({ userId });
    const expenses = await Expense.find({ userId });

    const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const savings = totalIncome - totalExpense;
    const savingsRate = totalIncome ? (savings / totalIncome) * 100 : 0;

    let score = 100;
    if (savingsRate < 10) score -= 30;
    if (totalExpense > totalIncome) score -= 40;
    if (savingsRate > 50) score += 20;

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const existingReport = await FinancialReport.findOne({ userId, month: currentMonth, year: currentYear });

    if (!existingReport) {
        await FinancialReport.create({
            userId,
            score,
            savingsRate,
            totalIncome,
            totalExpense,
            savings,
            month: currentMonth,
            year: currentYear
        });
    } else {
        existingReport.score = score;
        existingReport.savingsRate = savingsRate;
        existingReport.totalIncome = totalIncome;
        existingReport.totalExpense = totalExpense;
        existingReport.savings = savings;
        await existingReport.save();
    }

    return { score, savingsRate, totalIncome, totalExpense, savings };
};

const getMonthlyComparison = async (userId) => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    const currentReport = await FinancialReport.findOne({ userId, month: currentMonth, year: currentYear });
    const previousReport = await FinancialReport.findOne({ userId, month: previousMonth, year: previousYear });

    if (!currentReport || !previousReport) {
        return { message: "Not enough data to compare financial reports." };
    }

    let insightMessage = "Your financial performance is stable.";
    if (currentReport.score > previousReport.score) {
        insightMessage = "Your financial health has improved! Keep up the good work.";
    } else if (currentReport.score < previousReport.score) {
        insightMessage = "Your financial health has declined. Consider adjusting your expenses.";
    } else if (currentReport.savings > previousReport.savings) {
        insightMessage = "You're saving more this month! Great job!";
    } else if (currentReport.savings < previousReport.savings) {
        insightMessage = "Your savings have decreased compared to last month. Try to budget better.";
    }

    return {
        currentReport,
        previousReport,
        insightMessage
    };
};
