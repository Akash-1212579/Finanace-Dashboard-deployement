const prisma = require("../config/db.config");

async function getFilteredTransactions({userId,from,to,type,category,mode}) {
    
       const existingUser = await prisma.user.findFirst({
        where :{
            id: Number(userId)
        }}
    )
    if(!existingUser)
    {
        throw new Error(`${userId} doesn't exists!`);      
    }
    //console.log("category is ",category);
    //console.log("type is ",type);
    //console.log("mode is ",mode);
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
// console.log("required category id is",requiredCategoryId);
console.log("from",from,"to",to);

const isValidDate = (v) =>
  v && !Number.isNaN(new Date(v).getTime());

const whereClause = {
  userId,

  ...(requiredCategoryId != null && {
    categoryId: requiredCategoryId,
  }),

  ...(type && { type }),

  ...(mode && {
    paymentMode: mode,
  }),
};

if (isValidDate(from) || isValidDate(to)) {
  whereClause.date = {};

  if (isValidDate(from)) {
    whereClause.date.gte = new Date(from);
  }

  if (isValidDate(to)) {
    whereClause.date.lt = new Date(to);
  }
}


    const filteredTransactions = await prisma.transaction.findMany({
  where : whereClause,
  include : {
    category : {
      select : {
        name : true
      }
    }
  }
,
  orderBy: {
    date: "desc",
  },
});


return filteredTransactions;
}

module.exports = {getFilteredTransactions};