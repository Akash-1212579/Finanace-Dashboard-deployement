const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {getTotalAmountForCategoriesHandler} = require("../controllers/getTotalAmountForCategories.controller");


router.get("/",authMiddleware,getTotalAmountForCategoriesHandler);

module .exports = router;