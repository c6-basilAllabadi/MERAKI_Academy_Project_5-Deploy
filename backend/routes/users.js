const express = require("express");

const { getAllUsers, usersSearch, userUpdate } = require("../controllers/users");
const usersRouter = express.Router();
const authentication = require("../middlewares/authentication")
usersRouter.get('/',getAllUsers )
usersRouter.get('/search',usersSearch)
usersRouter.put('/:userId',authentication,userUpdate)


module.exports = usersRouter;