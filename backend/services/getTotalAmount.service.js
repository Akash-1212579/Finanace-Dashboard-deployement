const prisma = require("../config/db.config");
async function getTotalAmount(userId , type) {
    
    // first checking that userId exists or not
    const existingUser = await prisma.user.findFirst({
        where :{
            id: Number(userId)
        }}
    )

    if(!existingUser)
    {
        throw new Error(`${userId} doesn't exists!`);      
    }

    const totalAmount = await prisma.transaction.aggregate(
        {
           where :{
            userId : userId,
            type : type
           },
           _sum:{
            amount:true
           }
        }
    )
    return totalAmount._sum.amount;
}
module.exports = {getTotalAmount};