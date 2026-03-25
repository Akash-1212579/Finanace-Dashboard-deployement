const {addTransaction} = require("../services/addTransaction.service");
const addTransactionHandler = async (req, res) => {
  try {
    // userId must come from auth middleware
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    // extract payload from frontend
    const {
        
      amount,
      type,
      paymentMode,
      category,
      date,
      description,
      rawData,
    } = req.body

    // minimal validation (shape only)
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

    // pass everything to service
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

    return res.status(201).json(transaction)
  } catch (err) {
    console.error("Create transaction error:", err)

    return res.status(500).json({
      message: err.message || "Internal server error",
    })
  }
}

module.exports ={addTransactionHandler};
