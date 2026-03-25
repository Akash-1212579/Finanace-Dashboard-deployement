const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {getAmountByModeHandler} = require("../controllers/getAmountByModeHandler.controller");


router.get("/",authMiddleware,getAmountByModeHandler);

module.exports = router;