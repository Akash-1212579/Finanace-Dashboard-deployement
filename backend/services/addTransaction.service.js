const prisma = require("../config/db.config");
async function addTransaction({
  userId,
  amount,
  type,
  rawData,
  paymentMode,
  category,
  date,
  description,
}) {
  const existingUser = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });
  if (!existingUser) {
    throw new Error(`${userId} doesn't exists!`);
  }

  if (
    typeof amount !== "number" ||
    amount <= 0 ||
    !type ||
    !paymentMode ||
    !category ||
    !date
  ) {
    throw new Error("Invalid transaction payload");
  }
  const categoryId = await prisma.category.findFirst({
        where:{
            userId : userId,
            name : category
        },
        select:{
            id :  true
        }
    });
    let requiredCategoryId = Number(categoryId.id);
    const requiredAccountId =await prisma.account.findFirst({
        where :{
            userId : userId
        },
        select :{
            id : true
        }
    })
    //console.log("required account id",requiredAccountId)
    const accountId = Number(requiredAccountId.id); 
  const transaction = await prisma.transaction.create({
    data: {
      userId :userId,
      amount : amount,
      type : type,
      accountId : accountId,                //later change this using dynamic logic
      paymentMode : paymentMode,
      categoryId : requiredCategoryId,
      date: new Date(date),
      description :  description,
      balanceAfterTxn :  1212,
      rawData : rawData,
    },
  });

  return transaction;
}
module.exports = {addTransaction};