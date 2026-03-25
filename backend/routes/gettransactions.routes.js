const express = require("express");
const router = express.Router();
const {getTransactionsHandler} = require("../controllers/gettransactions.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/",authMiddleware,getTransactionsHandler);

module.exports = router;