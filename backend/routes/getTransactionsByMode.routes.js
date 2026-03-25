const {getTransactionsByModeHandle} = require("../controllers/getTransactionsByMode.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();

router.get("/",authMiddleware,getTransactionsByModeHandle);

module.exports = router;