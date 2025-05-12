// models/financialReport.model.js
const mongoose = require('mongoose');

const FinancialReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: Number,
    savingsRate: Number,
    totalIncome: Number,
    totalExpense: Number,
    savings: Number,
    month: Number,  // Stores the month (1-12)
    year: Number,   // Stores the year
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FinancialReport', FinancialReportSchema);
