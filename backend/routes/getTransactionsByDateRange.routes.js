const {getTransactionsByDateRangeHandler} = require("../controllers/getTransactionsByDateRange.controller");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/",authMiddleware,getTransactionsByDateRangeHandler);

module.exports = router;