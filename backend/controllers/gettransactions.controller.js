const { transaction } = require("../config/db.config");
const { getTransactions } = require("../services/gettransactions.service");

async function getTransactionsHandler(req, res) {
  try {
    const userId = req.userId; // getting from authorized token
   // const accountId = req.quey.accountId;

    if (!userId) {
      return res.status(400).json({
        error: "user id is required!",
      });
    }
    const data = await getTransactions({ userId});
    res.json({
      success: true,
      transactions: data,
    });
  } catch (error) {
    console.log("error from gettransaction controller is ", error);
    res.status(500).json({
      error: error.message,
    });
  }
}
module.exports = {getTransactionsHandler};