const {getTransactionsByCategoryHandler} = require("../controllers/getTransactionsByCategory.controller");

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/",authMiddleware,getTransactionsByCategoryHandler);
module.exports = router;