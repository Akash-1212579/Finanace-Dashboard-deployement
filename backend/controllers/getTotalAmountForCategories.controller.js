const {getTotalAmountForCategories} = require("../services/getTotalAmountForCategories.service");

async function getTotalAmountForCategoriesHandler(req,res) {
    
    try {
        const userId = req.userId;
        if (!userId) {
      return res.status(400).json({
        error: "user id is required!",
      });
    }
    const totalAmountData = await getTotalAmountForCategories(userId);
    res.status(200).json({
        success : true,
        result : totalAmountData
    });
    } catch (error) {
        console.log("error from category total sum is",error.message);
        res.status(500).json({
        error: error.message,
    });
    }
}

module.exports = {getTotalAmountForCategoriesHandler};