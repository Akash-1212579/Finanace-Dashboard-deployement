const prisma = require("../config/db.config");

async function getTransactionsByMode({userId,mode}) {
    
   const transactionsByMode = await prisma.transaction.findMany({
    where:{
        userId,
        paymentMode:mode
    }
   });
   return transactionsByMode;
}

module.exports ={getTransactionsByMode};