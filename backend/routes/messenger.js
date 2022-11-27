const express = require("express");



const messengerRouter = express.Router();



const {addConversation,getConversation,getCompanyConversations,getUserConversations}= require("../controllers/messenger")

messengerRouter .post('/newconversation/:companyId/:userId',addConversation)

messengerRouter .get('/:userId/:companyId',getConversation)

messengerRouter .get('/:userId',getCompanyConversations)
messengerRouter .get('/',getUserConversations)






module.exports = messengerRouter ;
