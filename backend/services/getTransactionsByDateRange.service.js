const prisma = require("../config/db.config");

async function getTransactionsByDateRange({userId,from,to}) {
    //console.log(new Date(from),new Date(to));
    const whereClasue = {
        userId,
        date:{
            gte:new Date(from),
            lte : new Date(to)
        }
    }
    const dateRangeTransactions = await prisma.transaction.findMany({
        where:whereClasue,
        orderBy:{
            date:"desc"
        }
    });
    //console.log("db response is",dateRangeTransactions);
    //dateRangeTransactions.map(t=>console.log(t.amount,t.type));

    return dateRangeTransactions;
}

module.exports = {getTransactionsByDateRange};