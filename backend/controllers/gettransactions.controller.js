const { json } = require("express");
const { transaction } = require("../config/db.config");
const { client } = require("../config/redis.config");
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
    const key = `transactions:${userId}`;
    const cacheData = await client.get(key);
    
    if(cacheData)
    {
      console.log("cache hit");
      return res.json(JSON.parse(cacheData));
    }
    console.log("cache missed");
    const data = await getTransactions({ userId});
    const response = {
  success: true,
  transactions: data,
};
    await client.setEx(key , 60 , JSON.stringify(response));

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