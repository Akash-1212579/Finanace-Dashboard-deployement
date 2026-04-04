
const { client } = require("../config/redis.config");
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

     const key = `debitedAmount${userId}`;

        const cacheData = await client.get(key);
        if (cacheData) {
            console.log("Cache hit for debit amount");
            console.log("cached data for debitedAmounnt",cacheData)
            return res.status(200).json(JSON.parse(cacheData));
        }
        console.log("cache missed for debitedAmount");


    const debitedAmount = await getTotalAmount(userId,"DEBIT");
        const debitResponse = {
        success : true,
        debitedAmount : debitedAmount
    }
        console.log("debited amount",debitedAmount);
        console.log("cache data ",debitResponse);
        await client.setEx(key , 60 , JSON.stringify(debitResponse));
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

        const key = `creditedAmount${userId}`;
        const cacheData = await client.get(key);
        if (cacheData) {
            console.log("cache hit for creditedAmount");
            return res.status(200).json(JSON.parse(cacheData));
        }
        console.log("cache miss for creditedAmount");

        const creditedAmount = await  getTotalAmount(userId ,"CREDIT");
        const response = {
            success : true,
            creditedAmount : creditedAmount
        };
        await client.setEx(key , 60 , JSON.stringify(response));
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