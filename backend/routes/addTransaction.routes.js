const {addTransactionHandler} = require("../controllers/addTransaction.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();
router.post("/",authMiddleware,addTransactionHandler);
module.exports = router;