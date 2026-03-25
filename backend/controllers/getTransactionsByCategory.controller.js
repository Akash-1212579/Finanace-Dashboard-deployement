const {getTransactionsByCategory} = require("../services/getTransactionsByCategory.service");

async function getTransactionsByCategoryHandler(req,res) {
    try {
        const userId = Number(req.userId);
        const {category} = req.query;


        const result =await getTransactionsByCategory({userId,category});
        //console.log(result);
        res.status(200).json({
            result
        })
    } catch (error) {
        console.log("error occured in getTransactionsByCategoryHandler",error.message);
        res.status(500).json({
            status:"failed",
            err : error.message
        })
    }
}

module.exports = {getTransactionsByCategoryHandler};