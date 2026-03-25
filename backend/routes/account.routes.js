const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {createAccountHandler,getAccountByIdHandler,getAccountsHandler} = require("../controllers/account.controller");
const router = Router();

router.post("/",authMiddleware,createAccountHandler);
router.get("/getaccount", authMiddleware, getAccountsHandler);            
router.get("/getaccount/:id", authMiddleware, getAccountByIdHandler); 
module.exports = router;