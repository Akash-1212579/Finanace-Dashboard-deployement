const {getTransactionsByDateRange} = require("../services/getTransactionsByDateRange.service");

async function getTransactionsByDateRangeHandler(req,res) {
    try {
        const userId = req.userId;
        const {from,to} = req.query;

        if (!from || !to) {
      return res.status(400).json({
        error: "from and to date are required",
      });
    }

    const result = await getTransactionsByDateRange({userId,from,to});
    //console.log(result);
      res.json({
      success: true,
      count: result.length,
      data: result,
    });

    } catch (error) {
        console.error("error from getTransactionsByDateRange controller is",error);
    res.status(500).json({ error: error.message });
    }
}

module.exports = {getTransactionsByDateRangeHandler};