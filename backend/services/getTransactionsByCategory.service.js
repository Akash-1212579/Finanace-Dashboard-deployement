const prisma = require("../config/db.config");

async function getTransactionsByCategory({userId,category}) {
    let requiredCategory ;
    
    switch (category) {
    case "food":
        requiredCategory = "Food";
        break; 
    case "transport":
        requiredCategory = "Transport";
        break;
    case "utilities":
        requiredCategory = "Utilities";
        break;
    case "entertainment":
          requiredCategory = "Entertainment";
          break;
    case "shopping":
        requiredCategory = "Shopping";
        break;
    case "healthcare" :
        requiredCategory = "Healthcare";
        break;            
    default:
        requiredCategory = "Other"; 
    }  
    const categoryId = await prisma.category.findFirst({
        where:{
            userId : userId,
            name : requiredCategory
        },
        select:{
            id :  true
        }
    });
    console.log("category id is ",categoryId.id);
    //now i got the category id now i just have to find all transactions
    //where the categoriId is categoryId

    const whereClause = {
            userId:userId,
            categoryId:Number(categoryId.id)
        }

    const result = await prisma.transaction.findMany({
        where:whereClause
       
    });
    //console.log("result is \n",result)
    return result;

}

module.exports = {getTransactionsByCategory};