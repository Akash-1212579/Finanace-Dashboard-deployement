const express = require("express");
const route = express.Router();

const {getProfileInfoHandler} = require("../controllers/getProfile.controller");
const authMiddleware = require("../middlewares/auth.middleware");

route.get("/",authMiddleware,getProfileInfoHandler);

module.exports = route;