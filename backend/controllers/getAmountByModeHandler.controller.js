const { user } = require("../config/db.config");
const {getAmountByMode} = require("../services/getAmountByMode.service");


async function getAmountByModeHandler(req,res) {
    
    try {
        const userId = req.userId;
        if(!userId)
        {
            return res.status(400).json({
                error: "user id is required!",
            });
        }
        const amountByMode = await getAmountByMode(userId);
        console.log("handler",amountByMode);
        res.status(200).json({
            success : true,
            result : amountByMode
        });
    } catch (error) {
        console.log("error from getAmountByMode Controller",error.message);
        res.status(500).json({
            error : error.message
        })
    }
}

module.exports = {getAmountByModeHandler};