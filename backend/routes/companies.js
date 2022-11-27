const express = require("express");

const { getAllCompanies, companiesSearch,addFavoriteUser,deleteFavoriteUser,getCompanyFavoriteUsers, companyUpdate } = require("../controllers/companies");
const companiesRouter = express.Router();
const authentication =require("../middlewares/authentication")
companiesRouter.get('/',getAllCompanies)
companiesRouter.get('/search',companiesSearch)
companiesRouter.post('/favusers/:companyId',authentication,addFavoriteUser)
companiesRouter.delete('/favusers/:id',authentication,deleteFavoriteUser)
companiesRouter.get('/favusers/:companyId',getCompanyFavoriteUsers)
companiesRouter.put('/:companyId',authentication,companyUpdate)

module.exports = companiesRouter;
