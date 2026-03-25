const {
  getFilteredTransactions,
} = require("../services/getFilteredTransactions.service");

async function getFilteredTransactionsHandler(req, res) {
  try {
    const userId = req.userId;
    const {type, category, mode} = req.query;
   // console.log(type,category,mode);
// const safeStart = from ?? "1970-01-01T00:00:00.000Z";
// const safeEnd = to ?? new Date().toISOString();

   
      const result = await getFilteredTransactions({userId,type,category,mode});

      res.status(200).json({
        success : true,
        transactions : result
      })
  } catch (error) {
    console.log("error for getFilteredTransactions", error.message);
    res.json({
      error: error.message,
    });
  }
}


module.exports = {getFilteredTransactionsHandler};