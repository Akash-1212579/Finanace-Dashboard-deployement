const prisma = require("../config/db.config");

async function getAmountByMode(userId) {
    const existingUser = await prisma.user.findFirst({
        where:{
            id:Number(userId)
        }
    })
    if(!existingUser)
    {
        throw new Error(`${userId} doesn't exists!`);
    }

   const amountByMode = await prisma.transaction.groupBy({
  by: ["paymentMode"],
  where: {
    userId: userId,
  },
  _sum: {
    amount: true,
  },
});

   console.log(amountByMode);
   return amountByMode;
}

module.exports ={getAmountByMode};