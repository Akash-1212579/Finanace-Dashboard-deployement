const prisma = require("../config/db.config");

async function getProfileInfo(userId) {
    
    const userData = await userInfo(userId);
    const usersBankData = await usersBankInfo(userId);
    if(!userData || !usersBankData)
    {
        throw new Error("Unable to fetch users details ");
    }
    return {
        userData : userData,
        bankData : usersBankData
    }

}
async function userInfo(userId) {
    const usersData = await prisma.user.findFirst({
        where :{
            id : userId 
        }
    });
    return usersData;
}

async function usersBankInfo(userId) {
    const usersBankData = await prisma.account.findFirst({
        where :{
            userId : userId
        }
    })
    return usersBankData;
}
module.exports = {getProfileInfo};
