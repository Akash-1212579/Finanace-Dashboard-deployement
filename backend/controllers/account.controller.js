const {createAccount,getAccounts,getAccountById} = require("../services/account.service");

async function createAccountHandler(req,res) {
    try {
        const userId = req.userId;
      //  console.log("user is is ",userId);
        const{name,bankName,accountNumber} = req.body;

          const account = await createAccount({
      userId,
      name,
      bankName,
      accountNumber
    });

    res.json({ success: true, account });

    } catch (error) {
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