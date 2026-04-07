const prisma = require("../config/db.config");

async function getFilteredTransactions({userId,type,category,mode}) {
    console.log("filter data at service is ",userId ,type , category ,mode);
       const existingUser = await prisma.user.findFirst({
        where :{
            id: Number(userId)
        }}
    )
    //console.log("filtered transaction user is ",existingUser);
    if(!existingUser)
    {
        throw new Error(`${userId} doesn't exists!`);      
    }
    //console.log("category is ",category);
    //console.log("type is ",type);
    //console.log("mode is ",mode);
    let categoryId;
    let requiredCategoryId = null;
    if (category) {
       categoryId = await prisma.category.findFirst({
        where:{
            userId : userId,
            name : category?category:""
        },
        select:{
            id :  true
        }
    });
    requiredCategoryId = categoryId?.id;
    }
    
    console.log("categoryId at filter is ",categoryId);
  //    let requiredCategoryId = Number(categoryId.id);
 console.log("required category id is",requiredCategoryId);
// console.log("from",from,"to",to);

// const isValidDate = (v) =>
//   v && !Number.isNaN(new Date(v).getTime());

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

// if (isValidDate(from) || isValidDate(to)) {
//   whereClause.date = {};

//   if (isValidDate(from)) {
//     whereClause.date.gte = new Date(from);
//   }

//   if (isValidDate(to)) {
//     whereClause.date.lt = new Date(to);
//   }
// }


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