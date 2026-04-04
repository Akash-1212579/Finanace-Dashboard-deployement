const {addTransaction} = require("../services/addTransaction.service");
const addTransactionHandler = async (req, res) => {
  try {
    // userId must come from auth middleware
    const userId = req.userId;
   
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

     const key = `transactions:${userId}`;
    const {
        
      amount,
      type,
      paymentMode,
      category,
      date,
      description,
      rawData,
    } = req.body

  
    if (
      typeof amount !== "number" ||
      !type ||
      !paymentMode ||
      !category ||
      !date
    ) {
      return res.status(400).json({
        message: "Invalid request payload",
      })
    }

  
    const transaction = await addTransaction({
      userId,
      amount,
      type,
      paymentMode,
      category,
      date,
      description,
      rawData,
    })
await client.del(key);
    return res.status(201).json(transaction)
  } catch (err) {
    console.error("Create transaction error:", err)

    return res.status(500).json({
      message: err.message || "Internal server error",
    })
  }
}

module.exports ={addTransactionHandler};