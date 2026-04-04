const {createAccount,getAccounts,getAccountById} = require("../services/account.service");
const { createCategory } = require("../services/category.service");
async function createCategories(userId) {
  if (!userId) {
    throw new Error("Failed to get userId to create categories");
  }

  const categories = await createCategory(userId);

  return categories;
}

async function createBankAccount(userId , name,bankName,accountNumber){
 
    if (!userId || !name || !bankName || !accountNumber) {
      throw new Error("Failed to create Insufficient bank details");
    }

    const bankaccount = await createAccount({
      userId,
      name,
      bankName,
      accountNumber
    });

    return bankaccount; 

  
}


async function createAccountHandler(req,res) {
    // try {
    //     const userId = req.userId;
    //   //  console.log("user is is ",userId);
    //     const{name,bankName,accountNumber} = req.body;

    //       const account = await createAccount({
    //   userId,
    //   name,
    //   bankName,
    //   accountNumber
    // });
    // try {
    //   await createCategory(userId);
    // } catch (error) {
    //   console.log("error while creating categorise ",error.message);
    // }

    // res.json({ success: true, account });

    // } 
  try{
    const userId = req.userId;
    const{name,bankName,accountNumber} = req.body;

    Promise.allSettled([createBankAccount(userId , name , bankName , accountNumber)
      , createCategories(userId)
    ]).then((result)=>{
      result.forEach((res)=>{
        if(res.status =="rejected")
        {
          console.log("failed promise is ",res.reason);
          throw new Error("Bank Account creation failed please try again");
          
        }
      })
    })
    return res.json({ success: true, message : "account and categoris created successfully" });
  }
    catch (error) {
        console.log("account controller error is ",error);
        res.status(400).json({ error: error.message });
    }
}


async function getAccountsHandler(req, res) {
  try {
    const userId = req.userId;
    const accounts = await getAccounts(userId);

    res.json({ success: true, accounts });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAccountByIdHandler(req, res) {
  try {
    const userId = req.userId;
    const accountId = Number(req.params.id);

    const account = await getAccountById(userId, accountId);

    res.json({ success: true, account });

  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {createAccountHandler,getAccountByIdHandler,getAccountsHandler};