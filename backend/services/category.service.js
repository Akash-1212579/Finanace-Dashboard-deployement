const prisma = require("../config/db.config");

async function createCategory(userId) {
  //if user exists then do not add more categories causses duplication
  const existingUser = await prisma.category.findFirst({
    where: {
      userId: Number(userId),
    },
  });
  if (existingUser) {
    console.log(existingUser ,"user exists");
    const result = { created: false };
    return result;
  }

  await prisma.category.createMany({
    data: [
      { name: "Food", userId },
      { name: "Transport", userId },
      { name: "Utilities", userId },
      { name: "Entertainment", userId },
      { name: "Shopping", userId },
      { name: "Healthcare", userId },
      {name:"P2P",userId},
      { name: "Other", userId },
    ],
    skipDuplicates: true,
  });
  const result = { created: true };
  return result;
}
module.exports = { createCategory };
