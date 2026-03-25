const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {upload} = require("../middlewares/upload.middleware");
const {uploadCsvHandler} = require("../controllers/transaction.controller");
const router = express.Router();

router.post("/upload",authMiddleware,upload.single("file"),uploadCsvHandler);
module.exports = router;