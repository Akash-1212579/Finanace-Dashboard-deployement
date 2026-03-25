
const {getTotalAmount} = require("../services/getTotalAmount.service");
async function handleGetTotalDebitAmount(req,res) {
    try {
        const userId = req.userId;
        console.log("user id is ",userId);
    if(!userId)
    {
        return res.status(400).json({
        error: "user id is required!",
      });
    }
    const debitedAmount = await getTotalAmount(userId,"DEBIT");

    res.status(200).json({
        success : true,
        debitedAmount : debitedAmount
    })

    } catch (error) {
        console.log("error from grtTotalAmount controller is ", error);
    res.status(500).json({
      error: error.message,
    });
    }
    
}
async function handleGetTotalCreditAmount(req,res) {
    try {
        const userId = req.userId;
        if(!userId)
        {
            return res.status(400).json({
                error: "user id is required!",
            });
        }
        const creditedAmount = await  getTotalAmount(userId ,"CREDIT");
        res.status(200).json({
            success : true,
            creditedAmount : creditedAmount
        });
    } catch (error) {
        console.log("error from grtTotalAmount controller is ", error);
    res.status(500).json({
      error: error.message,
    });
    }
}
module.exports = {handleGetTotalCreditAmount,handleGetTotalDebitAmount};