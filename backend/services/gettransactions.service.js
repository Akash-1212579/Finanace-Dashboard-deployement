const prisma = require("../config/db.config");

async function getTransactions({userId}) {
    
    //first verifying that given userId and accountId exists or not

    const existingUser = await prisma.user.findFirst({
        where:{
            id:Number(userId)
        }
    })
    if(!existingUser)
    {
        throw new Error(`${userId} doesn't exists!`);
    }
   const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        date: "desc"
      },
      include : {
        category : {
            select : {
                name : true,
            }
        }
      }
    });
    return transactions;
}

module.exports = {getTransactions};