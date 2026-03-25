const {
  getTransactionsByDateRange,
} = require("../services/getTransactionsByDateRange.service");
async function getMonthlyAmountForGivenHandler(req, res) {
     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  try {
    const userId = req.userId;

    const year = req.query.year;
    let givenYear = Number(year);
    //console.log("type of year is ",typeof year);
    if (!year || isNaN(year)) {
      throw new Error("Invalid Year");
    }
    // console.log("full year is",new Date(`${givenYear}-01-01T00:00:00`));
    const from = new Date(Date.UTC(givenYear, 0, 1, 0, 0, 0)); // 2025-01-01
    const to = new Date(Date.UTC(givenYear + 1, 0, 1, 0, 0, 0)); // 2026-01-01
    //console.log(from,to);
    const transactions = await getTransactionsByDateRange({ userId, from, to });
    //console.log(transactions);
    //seperating the whole data according to month
    const monthlyTotals = transactions.reduce((acc, txn) => {
  const date = new Date(txn.date);

  // ✅ UTC-safe year check
  if (date.getUTCFullYear() !== givenYear) return acc;

  const month = date.getUTCMonth();

  const existing = acc.find(item => item.month === month);

  if (existing) {
    existing.total += txn.amount;
  } else {
    acc.push({ month, total: txn.amount });
  }

  return acc;
}, []);
// console.log("monthly amounts are",monthlyTotals);
const result = months.map((monthName, index) => {
  const found = monthlyTotals.find(item => item.month === index)

  return {
    month: monthName,
    total: found ? found.total : 0,
  }
})
    res.status(200).json({
      success: true,
      result: result,
    });
  } catch (error) {
    console.log("error for getMonthlyAmountForGivenHandler", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = { getMonthlyAmountForGivenHandler };
