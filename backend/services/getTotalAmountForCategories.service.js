const prisma  = require("../config/db.config");

async function getTotalAmountForCategories(userId) {
    

    const getCategory = await prisma.category.findMany({
      where:{
        userId : userId
       },
       select :{
        id : true,
        userId : true,
        name : true
       }
    })
    console.log("total data is",getCategory);

    const result = await prisma.transaction.groupBy({
        by : ["categoryId"],
        where : {
            userId : userId
        },
        _sum : {
            amount : true
        }
    })
    console.log("result is ",result);

    //function to merge the amount with name and categoryId (getted from category table)

    
function findNameOFCategory(result, getCategory) {
  // Create lookup map: categoryId → amount
  const amountMap = Object.fromEntries(
    result.map(r => [r.categoryId, r._sum.amount])
  );

  // Updating category table data with amount column
  return getCategory.map(ele => ({
    ...ele,
    amount: amountMap[ele.id] || 0
  }));
}


    return findNameOFCategory(result,getCategory);
}

module.exports = {getTotalAmountForCategories};