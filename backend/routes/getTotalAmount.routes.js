const express = require("express");
const router = express.Router();
const {handleGetTotalCreditAmount,handleGetTotalDebitAmount} = require("../controllers/getTotalAmount.controller");
const authMiddleware = require("../middlewares/auth.middleware");
router.get("/debit",authMiddleware , handleGetTotalDebitAmount);
router.get("/credit",authMiddleware , handleGetTotalCreditAmount);

module.exports = router;