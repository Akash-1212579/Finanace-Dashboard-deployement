const {getTransactionsByMode} = require("../services/getTransactionsByMode.service");

async function getTransactionsByModeHandle(req,res) {
    
    try {
        const userId = req.userId;
        const {mode} = req.query;
        if(!mode)
        {
            throw new Error("give mode to filter!");
        }

        const result = await getTransactionsByMode({userId,mode});
        res.status(200).json({
            count:result.length,
            data:result
        });


    } catch (error) {
        console.log("getTransactionsByMode controller is",error);
        res.status(500).json({
            error:error.message
        });
    }
}

module.exports = {getTransactionsByModeHandle};