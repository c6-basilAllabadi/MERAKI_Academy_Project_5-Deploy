const express = require("express");

const { registerUser ,registerUserComplete} = require("../controllers/registerUser");
const authentication = require('../middlewares/authentication')

const registerUserRouter = express.Router();

registerUserRouter.post("/", registerUser);
registerUserRouter.put("/:userId",authentication,registerUserComplete)

module.exports = registerUserRouter;