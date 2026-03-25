const express = require("express");
const router = express.Router();
const {getMonthlyAmountForGivenHandler} = require("../controllers/getMonthlyAmountForGivenYear.controller");
const authMiddleware = require("../middlewares/auth.middleware");
router.get("/",authMiddleware,getMonthlyAmountForGivenHandler);
module.exports = router;