const authMiddleware = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();
const {handleCategory} = require("../controllers/category.controller");
router.post("/",authMiddleware,handleCategory);

module.exports = router;