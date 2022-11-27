const express = require("express");

const { loginUsers } = require("../controllers/loginUsers");
const {googleRegister} =require("../controllers/googleLogin")
const loginUserRouter = express.Router();

loginUserRouter.post("/", loginUsers);
loginUserRouter.post("/googlelogin",googleRegister)

module.exports = loginUserRouter;