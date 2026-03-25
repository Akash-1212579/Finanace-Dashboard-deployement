const {getFilteredTransactionsHandler} = require("../controllers/getFilteredTransactionsHandler.controller");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/",authMiddleware,getFilteredTransactionsHandler);

module.exports = router;