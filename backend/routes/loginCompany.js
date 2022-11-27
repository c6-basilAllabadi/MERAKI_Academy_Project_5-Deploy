const express = require("express");

const { loginCompanies } = require("../controllers/loginCompanies");

const loginCompanyRouter = express.Router();

loginCompanyRouter.post("/", loginCompanies);

module.exports = loginCompanyRouter;