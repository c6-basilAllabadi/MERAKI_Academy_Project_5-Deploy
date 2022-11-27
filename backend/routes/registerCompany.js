const express = require("express");

const { registerCompany, registerCompanyComplete } = require("../controllers/registerCompany");
const authentication = require("../middlewares/authentication")

const registerCompanyRouter = express.Router();

registerCompanyRouter.post("/", registerCompany);
registerCompanyRouter.put("/:companyId",authentication,registerCompanyComplete)

module.exports = registerCompanyRouter;


