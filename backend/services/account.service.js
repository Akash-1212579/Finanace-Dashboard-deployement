const prisma = require("../config/db.config");

async function createAccount({ userId, name, bankName, accountNumber}) {
    if (!name) throw new Error("Account name is required");

    return prisma.account.create({
        data:{
            userId,
            name,
            bankName,
            accountNumber,
            balance :1000
        }
    });
}

async function getAccounts(userId) {
  return prisma.account.findMany({
    where: { userId }
  });
}

async function getAccountById(userId, accountId) {
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId
    }
  });

  if (!account) throw new Error("Account not found");

  return account;
}
module.exports = {createAccount,getAccounts,getAccountById};